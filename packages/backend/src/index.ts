import express from "express";
import cors from "cors";

import { scrapeManual } from "./routes/scrapeManual";
import changesRoutes from "./routes/changes.routes";
import alertsRoutes from "./routes/alerts.routes";
import healEventsRoutes from "./routes/healEvents.routes";
import statsRoutes from "./routes/stats.routes";
import scraperRoutes from "./routes/scraper.route";
import { requestLogger } from "./middleware/requestLogger";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { errorHandler } from "./middleware/errorHandler";
import { startScheduler } from "./lib/scheduler";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Explicit route mounts
app.use("/api/changes", changesRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/heal-events", healEventsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/scheduler", scraperRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Server startup
const server = app.listen(PORT, async () => {
	try {
		await startScheduler();
		console.log(`Server running on port ${PORT}`);
	} catch (err) {
		console.error("Server startup failed:", err);
		process.exit(1);
	}
});

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("Initiating graceful shutdown");
	try {
		await server.close();
		console.log("Server closed gracefully");
	} catch (err) {
		console.error("Shutdown error:", err);
	}
});
