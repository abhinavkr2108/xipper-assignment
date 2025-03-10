import { Router } from "express";
import router from "./authRoute.ts";
import { getHotelById, getHotels } from "../controllers/hotelController.ts";

router.get("/", getHotels);
router.get("/:id", getHotelById);

export default router;
