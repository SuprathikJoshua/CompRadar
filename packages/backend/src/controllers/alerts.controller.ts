import type { Request, Response } from "express";
import { getAllAlerts } from "../services/alertsQuery.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const getAllAlertsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const alerts = await getAllAlerts();
  res.json(alerts);
});
