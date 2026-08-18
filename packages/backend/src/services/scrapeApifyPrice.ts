import crypto from "crypto";
import { runScrape } from "../lib/brightData";
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

export async function scrapeApifyPrice() {
	const rival = await getOrCreateRival();
	const target = await getOrCreateTarget(rival.id);

	const results = await runScrape<RawPriceResult>(APIFY_PRICE_COLLECTOR_ID, [
		{ url: APIFY_PRICING_URL },
	]);
	if (results.length === 0)
		throw new Error("zero results — check collector config");

	const raw = results[0];
	// console.log("RAW RESULT:", JSON.stringify(raw, null, 2));
	if (!raw) throw new Error("zero results — check collector config");

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
