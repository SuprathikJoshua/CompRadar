import type { Request, Response } from "express";
import { getAllAlerts } from "../services/alertsQuery.service";

export const getAllAlertsHandler = async (_req: Request, res: Response) => {
  try {
    const alerts = await getAllAlerts();
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};