import express from "express";
import cors from "cors";
import { scrapeManual } from "./routes/scrapeManual";
import changesRoutes from "./routes/changes.routes";
import alertsRoutes from "./routes/alerts.routes";
import healEventsRoutes from "./routes/healEvents.routes";
import statsRoutes from "./routes/stats.routes";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.post("/api/scrape/manual", scrapeManual);
app.use("/api/changes", changesRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/heal-events", healEventsRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
