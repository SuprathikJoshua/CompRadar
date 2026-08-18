import crypto from "crypto";
import { runScrape } from "../lib/brightData";
import { prisma } from "../lib/prisma";

const FIRECRAWL_PRICE_COLLECTOR_ID =
	process.env.BD_FIRECRAWL_PRICE_COLLECTOR_ID!;
const FIRECRAWL_BASE_URL = "https://firecrawl.dev";
const FIRECRAWL_PRICING_URL = "https://firecrawl.dev/pricing";

type FirecrawlTier = {
	plan_name: string;
	price?: number;
	currency: string;
	billing_period: string;
};

type RawPriceResult = {
	pricing_tiers: FirecrawlTier[];
	input: { url: string };
};

async function getOrCreateRival() {
	const existing = await prisma.rival.findFirst({
		where: { name: "Firecrawl" },
	});
	if (existing) return existing;
	return prisma.rival.create({
		data: { name: "Firecrawl", baseUrl: FIRECRAWL_BASE_URL },
	});
}

async function getOrCreateTarget(rivalId: number) {
	const existing = await prisma.target.findFirst({
		where: { url: FIRECRAWL_PRICING_URL },
	});
	if (existing) return existing;
	return prisma.target.create({
		data: { url: FIRECRAWL_PRICING_URL, type: "price", rivalId },
	});
}

export async function scrapeFirecrawlPrice() {
	const rival = await getOrCreateRival();
	const target = await getOrCreateTarget(rival.id);

	const results = await runScrape<RawPriceResult>(
		FIRECRAWL_PRICE_COLLECTOR_ID,
		[{ url: FIRECRAWL_PRICING_URL }],
	);
	const raw = results[0];
	if (!raw) throw new Error("zero results — check collector config");

	// console.log("RAW RESULT:", JSON.stringify(raw, null, 2));

	const contentHash = crypto
		.createHash("sha256")
		.update(JSON.stringify(raw))
		.digest("hex");

	const trackableTiers = raw.pricing_tiers.filter((t) => t.price !== undefined);
	const skipped = raw.pricing_tiers.length - trackableTiers.length;
	if (skipped > 0) {
		console.warn(
			`skipped ${skipped} tier(s) with no numeric price (likely custom/contact-sales)`,
		);
	}

	const snapshot = await prisma.snapshot.create({
		data: {
			targetId: target.id,
			contentHash,
			scrapedAt: new Date(),
			priceDetails: {
				create: trackableTiers.map((tier) => ({
					planName: tier.plan_name,
					priceAmount: tier.price as number,
					currency: tier.currency,
					billingPeriod: tier.billing_period.replace(/^\//, ""),
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
	scrapeFirecrawlPrice()
		.then(() => process.exit(0))
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}
