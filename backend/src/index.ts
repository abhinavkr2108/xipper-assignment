import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.ts";
import hotelRoutes from "./routes/hotelRoutes.ts";
import bookingRoute from "./routes/bookingRoute.ts";
import webCheckInRoute from "./routes/webCheckInRoute.ts";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/web-check-in", webCheckInRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
