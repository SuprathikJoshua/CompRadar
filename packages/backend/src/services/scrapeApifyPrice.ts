import crypto from "crypto";
import { runScrape } from "../lib/brightData";
import { healCollector } from "../lib/brightDataHeal";
import { prisma } from "../lib/prisma";

const APIFY_PRICE_COLLECTOR_ID = process.env.BD_APIFY_PRICE_COLLECTOR_ID!;
const APIFY_BASE_URL = "https://apify.com";
const APIFY_PRICING_URL = "https://apify.com/pricing";

type RawPriceResult = {
	pricing_tiers: {
		plan_name: string;
		price: { value: number; currency: string; symbol: string };
		currency: string;
		billing_period: string;
	}[];
	input: { url: string };
};

class ScrapeBreakError extends Error {
	brokenSelector: string;
	constructor(message: string, brokenSelector: string) {
		super(message);
		this.name = "ScrapeBreakError";
		this.brokenSelector = brokenSelector;
	}
}

async function getOrCreateRival() {
	const existing = await prisma.rival.findFirst({ where: { name: "Apify" } });
	if (existing) return existing;
	return prisma.rival.create({
		data: { name: "Apify", baseUrl: APIFY_BASE_URL },
	});
}

async function getOrCreateTarget(rivalId: number) {
	const existing = await prisma.target.findFirst({
		where: { url: APIFY_PRICING_URL },
	});
	if (existing) return existing;
	return prisma.target.create({
		data: { url: APIFY_PRICING_URL, type: "price", rivalId },
	});
}

function validateRaw(raw: RawPriceResult) {
	if (!raw.pricing_tiers || raw.pricing_tiers.length === 0) {
		throw new ScrapeBreakError(
			"pricing_tiers array empty or missing",
			"apify pricing tiers container — no tiers found on pricing page",
		);
	}
	for (const tier of raw.pricing_tiers) {
		if (!tier.price || typeof tier.price.value !== "number") {
			throw new ScrapeBreakError(
				`price field missing on tier "${tier.plan_name ?? "unknown"}"`,
				`apify pricing tier price extraction returning undefined on tier "${tier.plan_name ?? "unknown"}" — selector likely changed`,
			);
		}
	}
}

async function fetchRaw(): Promise<RawPriceResult> {
	const results = await runScrape<RawPriceResult>(APIFY_PRICE_COLLECTOR_ID, [
		{ url: APIFY_PRICING_URL },
	]);
	if (results.length === 0)
		throw new Error("zero results — check collector config");
	const raw = results[0];
	if (!raw) throw new Error("zero results — check collector config");
	return raw;
}

async function fetchWithHealRetry(targetId: number): Promise<RawPriceResult> {
	try {
		const raw = await fetchRaw();
		validateRaw(raw);
		return raw;
	} catch (err) {
		if (!(err instanceof ScrapeBreakError)) throw err;

		const detectedAt = new Date();
		const healEvent = await prisma.healEvent.create({
			data: {
				targetId,
				brokenSelector: err.brokenSelector,
				detectedAt,
				status: "detected",
			},
		});
		console.log(`HealEvent ${healEvent.id} logged — break detected, healing…`);

		try {
			await healCollector(APIFY_PRICE_COLLECTOR_ID, err.brokenSelector);
		} catch (healErr) {
			await prisma.healEvent.update({
				where: { id: healEvent.id },
				data: { status: "failed" },
			});
			throw healErr;
		}

		const raw = await fetchRaw();
		validateRaw(raw); // still broken after heal → throws, healEvent stays "detected", flags for manual look

		const recoveredAt = new Date();
		const downtimeSeconds = Math.round(
			(recoveredAt.getTime() - detectedAt.getTime()) / 1000,
		);
		await prisma.healEvent.update({
			where: { id: healEvent.id },
			data: {
				recoveredAt,
				downtimeSeconds,
				recoveryMethod: "bright-data-cli-auto-heal",
				status: "recovered",
			},
		});
		console.log(`HealEvent ${healEvent.id} recovered in ${downtimeSeconds}s`);

		return raw;
	}
}

export async function scrapeApifyPrice() {
	const rival = await getOrCreateRival();
	const target = await getOrCreateTarget(rival.id);

	const raw = await fetchWithHealRetry(target.id);

	const contentHash = crypto
		.createHash("sha256")
		.update(JSON.stringify(raw))
		.digest("hex");

	const snapshot = await prisma.snapshot.create({
		data: {
			targetId: target.id,
			contentHash,
			scrapedAt: new Date(),
			priceDetails: {
				create: raw.pricing_tiers.map((tier) => ({
					planName: tier.plan_name,
					priceAmount: tier.price.value,
					currency: tier.currency,
					billingPeriod: tier.billing_period,
				})),
			},
		},
		include: { priceDetails: true },
	});

	console.log(
		`saved snapshot ${snapshot.id}, ${snapshot.priceDetails.length} tiers`,
	);
	return snapshot;
}

if (import.meta.main) {
	scrapeApifyPrice()
		.then(() => process.exit(0))
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}
