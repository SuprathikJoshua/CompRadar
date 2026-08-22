import { Router } from "express";
import { getAllRivalsHandler, getRivalByIdHandler } from "../controllers/rivals.controller";

const router = Router();

router.get("/", getAllRivalsHandler);
router.get("/:id", getRivalByIdHandler);

export default router;
