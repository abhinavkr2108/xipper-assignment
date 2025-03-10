import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function seedHotels() {
  try {
    const hotelsFilePath = path.join(__dirname, "hotels.json");
    const hotelsData = JSON.parse(fs.readFileSync(hotelsFilePath, "utf-8"));

    // Insert hotels into the database
    await prisma.hotel.createMany({
      data: hotelsData.map((hotel) => ({
        name: hotel.name,
        description: hotel.description,
        address: hotel.address,
        city: hotel.city,
        country: hotel.country,
        stars: hotel.stars,
        pricePerNight: hotel.pricePerNight,
        image: hotel.image,
      })),
    });

    console.log("Hotels added successfully!");
  } catch (error) {
    console.error("Error seeding hotels:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedHotels();
