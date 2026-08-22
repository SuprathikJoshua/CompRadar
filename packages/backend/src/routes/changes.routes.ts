import { Router } from "express";
import { getAllChangesHandler, getChangeByIdHandler } from "../controllers/changes.controller";

const router = Router();

router.get("/", getAllChangesHandler);
router.get("/:id", getChangeByIdHandler);

export default router;