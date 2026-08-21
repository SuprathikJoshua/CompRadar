import type { Request, Response } from "express";
import { getAllChanges, getChangeById } from "../services/changesQuery.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const getAllChangesHandler = asyncHandler(async (_req: Request, res: Response) => {
  const changes = await getAllChanges();
  res.json(changes);
});

export const getChangeByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const change = await getChangeById(id);
  if (!change) {
    return res.status(404).json({ error: "Change not found" });
  }

  res.json(change);
});
