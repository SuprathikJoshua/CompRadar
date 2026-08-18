import crypto from "crypto";
import { runScrape } from "../lib/brightData";
import { prisma } from "../lib/prisma";

const OXYLABS_PRICE_COLLECTOR_ID = process.env.BD_OXYLABS_PRICE_COLLECTOR_ID!;
const OXYLABS_BASE_URL = "https://oxylabs.io";
const OXYLABS_PRICING_URL = "https://oxylabs.io/pricing";

type RawPriceResult = {
	url: string;
	plan_name?: string;
	price?: string;
	currency?: string;
	billing_period?: string;
};

async function getOrCreateRival() {
	const existing = await prisma.rival.findFirst({ where: { name: "Oxylabs" } });
	if (existing) return existing;
	return prisma.rival.create({
		data: { name: "Oxylabs", baseUrl: OXYLABS_BASE_URL },
	});
}

async function getOrCreateTarget(rivalId: number) {
	const existing = await prisma.target.findFirst({
		where: { url: OXYLABS_PRICING_URL },
	});

	if (existing) return existing;

	return prisma.target.create({
		data: { url: OXYLABS_PRICING_URL, type: "price", rivalId },
	});
}

export async function scrapeOxylabsPrice() {
	const rival = await getOrCreateRival();
	const target = await getOrCreateTarget(rival.id);

	const results = await runScrape<RawPriceResult>(OXYLABS_PRICE_COLLECTOR_ID, [
		{ url: OXYLABS_PRICING_URL },
	]);
	const raw = results[0];
	if (!raw)
		throw new Error("zero results — check collector config");

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
				create: [
					{
						planName: raw.plan_name ?? "unknown",
						priceAmount: parseFloat(raw.price ?? "0"),
						currency: raw.currency ?? "USD",
						billingPeriod: raw.billing_period ?? "monthly",
					},
				],
			},
		},
		include: { priceDetails: true },
	});

	console.log(`saved snapshot ${snapshot.id}`);
	return snapshot;
}

if (import.meta.main) {
	scrapeOxylabsPrice()
		.then(() => process.exit(0))
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}
