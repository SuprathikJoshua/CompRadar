import { scrapeApifyPrice } from "../services/scrapeApifyPrice";
import { scrapeFirecrawlPrice } from "../services/scrapeFirecrawlPrice";
import cron from "node-cron";

// Structure containing scrape results
interface DailyScrapeCycleInfo {
	timestamp: string;
	apify: {
		status: "completed" | "failed";
		error?: unknown;
	};
	firecrawl: {
		status: "completed" | "failed";
		error?: unknown;
	};
}

const logStart = (name: string) => {
	const timestamp = new Date().toISOString();
	console.log(`[${name}] Daily scrape cycle starting — ${timestamp}`);
};

export async function runScrapeCycle(): Promise<DailyScrapeCycleInfo> {
	const apifyResult: DailyScrapeCycleInfo["apify"] = {
		status: "failed",
		error: undefined,
	};
	const firecrawlResult: DailyScrapeCycleInfo["firecrawl"] = {
		status: "failed",
		error: undefined,
	};

	try {
		// Apify Scrape Section
		logStart("apify");
		try {
			await scrapeApifyPrice();
			apifyResult.status = "completed";
			console.log("[apify] Daily scrape cycle complete");
		} catch (error) {
			console.error(`[apify] Daily scrape cycle failed:`, error);
			apifyResult.error = error;
			console.log("[apify] Cycle failed, firecrawl still attempting...");
		}

		// Firecrawl Scrape Section
		logStart("firecrawl");
		try {
			await scrapeFirecrawlPrice();
			firecrawlResult.status = "completed";
			console.log("[firecrawl] Daily scrape cycle complete");
		} catch (error) {
			console.error(`[firecrawl] Daily scrape cycle failed:`, error);
			firecrawlResult.error = error;
			console.log("[firecrawl] Cycle failed after apify errors");
		}
	} finally {
		console.log("[scheduler] Daily scrape cycle complete");
	}

	return {
		timestamp: new Date().toISOString(),
		apify: apifyResult,
		firecrawl: firecrawlResult,
	};
}

// Core scheduler function
export function startScheduler() {
	console.log("Scheduler active — daily scrape cycle registered");
	const scheduleInterval = cron.schedule("0 0 * * *", () => {
		runScrapeCycle().catch((globalError) => {
			console.error("Unexpected scheduler critical error:", globalError);
		});
	});
	console.log(`Scheduler job registered with interval: ${scheduleInterval}`);
	return { schedule: scheduleInterval };
}
