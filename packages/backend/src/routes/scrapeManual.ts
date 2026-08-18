import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { scrapeOxylabsPrice } from "../services/scrapeOxylabsPrice";
import { scrapeApifyPrice } from "../services/scrapeApifyPrice";
import { scrapeFirecrawlPrice } from "../services/scrapeFirecrawlPrice";

export async function scrapeManual(req: Request, res: Response) {
	const { targetId } = req.body;
	if (typeof targetId !== "number") {
		return res.status(400).json({ error: "Invalid targetId" });
	}

	const target = await prisma.target.findUnique({
		where: { id: targetId },
		include: { rival: true },
	});

	if (!target) {
		return res.status(404).json({ error: "Target not found" });
	}

	const now = new Date();
	const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	// Cooldown check (24h)
	const recentTrigger = await prisma.manualTrigger.findFirst({
		where: {
			targetId,
			triggeredAt: { gte: twentyFourHoursAgo },
		},
		orderBy: { triggeredAt: "desc" },
	});

	if (recentTrigger) {
		const retryAt = new Date(
			recentTrigger.triggeredAt.getTime() + 24 * 60 * 60 * 1000,
		);
		return res.status(429).json({ error: "cooldown", retryAt });
	}

	// Weekly cap check (3 per week)
	const triggersInLastWeek = await prisma.manualTrigger.count({
		where: {
			targetId,
			triggeredAt: { gte: oneWeekAgo },
		},
	});

	if (triggersInLastWeek >= 3) {
		const nextAvailableAt = new Date(
			oneWeekAgo.getTime() + 7 * 24 * 60 * 60 * 1000,
		);
		return res
			.status(429)
			.json({ error: "weekly_cap_reached", nextAvailableAt });
	}

	try {
		// Route to scraper
		let snapshot;
		if (target.type === "price") {
			if (target.rival.name === "Oxylabs")
				snapshot = await scrapeOxylabsPrice();
			else if (target.rival.name === "Apify")
				snapshot = await scrapeApifyPrice();
			else if (target.rival.name === "Firecrawl")
				snapshot = await scrapeFirecrawlPrice();
			else throw new Error("No scraper for this rival");
		} else {
			throw new Error("Target type not supported for manual trigger");
		}

		await prisma.manualTrigger.create({
			data: { targetId },
		});

		return res.status(200).json({ success: true, snapshotId: snapshot.id });
	} catch (error) {
		console.error("Manual scrape failed:", error);
		return res.status(500).json({ error: "Manual scrape failed" });
	}
}
