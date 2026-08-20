import express from "express";
import cors from "cors";
import { scrapeManual } from "./routes/scrapeManual";
import changesRoute from "./routes/changes";
import alertsRoute from "./routes/alerts";
import healEventsRoute from "./routes/healEvents";
import statsRoute from "./routes/stats";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.post("/api/scrape/manual", scrapeManual);
app.get("/api/changes", changesRoute);
app.get("/api/alerts", alertsRoute);
app.get("/api/heal-events", healEventsRoute);
app.get("/api/stats", statsRoute);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
