import { Request, Response } from "express";
import prisma from "../utils/db.ts";

export async function webCheckIn(req: Request, res: Response) {
  try {
    const { bookingId } = req.params;
    const { guests, userId } = req.body;

    if (
      !bookingId ||
      !guests ||
      !Array.isArray(guests) ||
      guests.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. Booking ID and guest details are required.",
      });
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        hotel: true,
        user: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    const existingCheckIn = await prisma.checkIn.findUnique({
      where: { bookingId },
    });

    if (existingCheckIn) {
      return res.status(400).json({
        success: false,
        message: "Check-in already exists for this booking.",
      });
    }

    for (const guest of guests) {
      if (!guest.name || !guest.aadhaarNumber) {
        return res.status(400).json({
          success: false,
          message: "Name and Aadhaar number are required for all guests.",
        });
      }
    }

    const checkIn = await prisma.checkIn.create({
      data: {
        guestDetails: {
          create: guests.map((guest) => ({
            name: guest.name,
            aadhaarNumber: guest.aadhaarNumber,
          })),
        },
        bookingId,
        userId,
      },
      include: {
        guestDetails: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Check-in created successfully.",
      checkIn,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}
