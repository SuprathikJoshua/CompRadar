import { Router } from "express";

const router = Router();

router.get("/changes");
router.get("/changes/:id");

export default router;
