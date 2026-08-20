import type { Request, Response } from "express";
import { getAllChanges, getChangeById } from "../services/changesQuery.service";

export const getAllChangesHandler = async (_req: Request, res: Response) => {
  try {
    const changes = await getAllChanges();
    res.json(changes);
  } catch (error) {
    console.error('Error fetching changes:', error);
    res.status(500).json({ error: "Failed to fetch changes" });
  }
};

export const getChangeByIdHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const change = await getChangeById(id);
    if (!change) {
      return res.status(404).json({ error: "Change not found" });
    }

    res.json(change);
  } catch (error) {
    console.error('Error fetching change by ID:', error);
    res.status(500).json({ error: "Failed to fetch change" });
  }
};