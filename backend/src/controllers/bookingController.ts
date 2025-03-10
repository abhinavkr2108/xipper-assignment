import { Request, Response } from "express";
import prisma from "../utils/db.ts";

export async function createBooking(req: Request, res: Response) {
  try {
    const { userId, hotelId, checkInDate, checkOutDate, totalPrice } = req.body;
    const booking = await prisma.booking.create({
      data: {
        userId,
        hotelId,
        checkInDate,
        checkOutDate,
        totalPrice,
        status: "CONFIRMED",
      },
    });
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
