import type { Request, Response } from "express";
import { getAllHealEvents } from "../services/healEventsQuery.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const getAllHealEventsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const healEvents = await getAllHealEvents();
  res.json(healEvents);
});
