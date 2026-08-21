import { Router } from "express";
import { getAllAlertsHandler } from "../controllers/alerts.controller";

const router = Router();

router.get("/", getAllAlertsHandler);

export default router;