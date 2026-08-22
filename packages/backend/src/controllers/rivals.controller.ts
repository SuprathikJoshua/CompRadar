import type { Request, Response } from "express";
import { getAllRivalsWithTargets, getRivalById } from "../services/rivalsQuery.service";
import { asyncHandler } from "../middleware/asyncHandler";

export const getAllRivalsHandler = asyncHandler(async (_req: Request, res: Response) => {
  const rivals = await getAllRivalsWithTargets();
  res.json(rivals);
});

export const getRivalByIdHandler = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const rival = await getRivalById(id);
  if (!rival) {
    return res.status(404).json({ error: "Rival not found" });
  }

  res.json(rival);
});
