import express from "express";
import { runScrapeCycle } from "../lib/scheduler";

const router = express.Router();

router.get("/run-now", (req, res) => {
	// Fire-and-forget execution with error logging only
	runScrapeCycle().catch((error) => {
		console.error("Scrape cycle trigger error:", error);
	});

	// Immediate response without waiting
	res.json({ message: "scrape cycle triggered" });
});

export default router;
