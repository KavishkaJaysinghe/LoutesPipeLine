import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import hotelRoutes from "./routes/hotel.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import destRoutes from "./routes/destination.route.js";
import tourRoutes from "./routes/tour.route.js";
import galleryRoutes from "./routes/gallery.route.js";
import tripPlanRoutes from './routes/plan.route.js';
import reviewRoutes from "./routes/review.route.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
const __dirname = path.resolve();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "https://lh3.googleusercontent.com" }));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/destination", destRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/review", reviewRoutes);

app.use("/api/trip-plan", tripPlanRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
