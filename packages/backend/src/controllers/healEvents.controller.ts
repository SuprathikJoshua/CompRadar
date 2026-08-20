import type { Request, Response } from "express";
import { getAllHealEvents } from "../services/healEventsQuery.service";

export const getAllHealEventsHandler = async (_req: Request, res: Response) => {
  try {
    const healEvents = await getAllHealEvents();
    res.json(healEvents);
  } catch (error) {
    console.error('Error fetching heal events:', error);
    res.status(500).json({ error: "Failed to fetch heal events" });
  }
};