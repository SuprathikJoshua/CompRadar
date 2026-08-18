import express from "express";
import cors from "cors";
import { scrapeManual } from "./routes/scrapeManual";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

app.post("/api/scrape/manual", scrapeManual);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
