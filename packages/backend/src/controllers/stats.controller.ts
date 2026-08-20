import type { Request, Response } from "express";
import { getStats } from "../services/statsQuery.service";

export const getStatsHandler = async (_req: Request, res: Response) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};