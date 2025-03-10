import express, { Router } from "express";
import { createBooking } from "../controllers/bookingController.ts";

const router: Router = express.Router();

router.post("/:hotelId", createBooking);

export default router;
