import { Router } from "express";
import { webCheckIn } from "../controllers/webCheckInController.ts";

const router = Router();

router.post("/:bookingId", webCheckIn as any);

export default router;
