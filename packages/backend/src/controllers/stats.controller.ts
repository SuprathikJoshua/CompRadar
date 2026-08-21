import type { Request, Response } from "express";
import { getStats } from "../services/statsQuery.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const getStatsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await getStats();
  res.json(stats);
});
