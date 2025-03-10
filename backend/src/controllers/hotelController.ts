import { Request, Response } from "express";
import prisma from "../utils/db.ts";

export async function getHotels(req: Request, res: Response) {
  try {
    const hotels = await prisma.hotel.findMany();
    res.status(201).json(hotels);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getHotelById(req: Request, res: Response) {
  try {
    const hotelId = req.params.id;
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      res.status(404).json({ error: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
