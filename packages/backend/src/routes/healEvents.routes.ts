import { Router } from "express";
import { getAllHealEventsHandler } from "../controllers/healEvents.controller";

const router = Router();

router.get("/", getAllHealEventsHandler);

export default router;