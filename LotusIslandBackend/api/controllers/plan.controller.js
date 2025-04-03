import TripPlan from "../models/plan.model.js";
import nodemailer from "nodemailer";
import { errorHandler } from "../utils/error.js";
import { getUserEmail } from "./user.controller.js";
import dotenv from "dotenv";
dotenv.config();

// Set up nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "renukatoursandtravels1@gmail.com",
    pass: process.env.G_PWD,
  },
});

// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("SMTP connection error:", error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

// Function to send the trip plan data as an email
const sendTripPlanEmail = async (tripPlanData) => {
  try {
    const userEmail = await getUserEmail(tripPlanData.userId); // Fetch the user's email

    const mailOptions = {
      from: "renukatoursandtravels1@gmail.com", // Sender's email
      to: "renukatours94@gmail.com", // The recipient's email (can be dynamic)
      subject: `New Trip Plan Created by User ${tripPlanData.userId}`,
      text: `A new trip plan has been created with the following details:\n\n
        User: ${tripPlanData.userId}\n
        User Email: ${userEmail}\n
        Arrival Date: ${tripPlanData.arrivalDate}\n
        Departure Date: ${tripPlanData.departureDate}\n
        Number of People: ${tripPlanData.numberOfPeople}\n
        Number of Adults: ${tripPlanData.numberOfAdults}\n
        Number of Children: ${tripPlanData.numberOfChildren}\n
        Selected Destinations: ${tripPlanData.selectedDestinations.join(", ")}\n
        Accommodation Type: ${tripPlanData.accommodationType}\n
        Vehicle Type: ${tripPlanData.vehicleType}\n
        Status: ${tripPlanData.status}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">New Trip Plan Created</h1>
          <p style="font-size: 16px; color: #555;">A new trip plan has been created with the following details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>User:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.userId
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>User Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${userEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Arrival Date:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.arrivalDate
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Departure Date:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.departureDate
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Number of People:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.numberOfPeople
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Number of Adults:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.numberOfAdults
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Number of Children:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.numberOfChildren
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Selected Destinations:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${tripPlanData.selectedDestinations.join(
                ", "
              )}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Accommodation Type:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.accommodationType
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Vehicle Type:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.vehicleType
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;"><strong>Status:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                tripPlanData.status
              }</td>
            </tr>
          </table>
          <p style="font-size: 16px; color: #555; margin-top: 20px;">Thank you for using Renuka Tours and Travels!</p>
              <div style="text-align: center; margin-top: 20px;">
            <img src="https://firebasestorage.googleapis.com/v0/b/renuka-travels.appspot.com/o/logo.png?alt=media&token=e001d6db-fd7c-4f41-a230-eab2e5f00cd9" alt="Logo" style="max-width: 100px; height: auto;">
          </div>
          </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to create a trip plan and send email
export const createTripPlan = async (req, res, next) => {
  try {
    const tripPlanData = {
      ...req.body,
      userId: req.user.id,
    };

    const newTripPlan = new TripPlan(tripPlanData);
    const savedTripPlan = await newTripPlan.save();

    // Send email after saving the trip plan
    await sendTripPlanEmail(savedTripPlan);

    res.status(201).json(savedTripPlan);
  } catch (error) {
    next(error);
  }
};

export const getTripPlans = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const tripPlans = await TripPlan.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.status && { status: req.query.status }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalTripPlans = await TripPlan.countDocuments();

    res.status(200).json({
      tripPlans,
      totalTripPlans,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTripPlan = async (req, res, next) => {
  try {
    const tripPlan = await TripPlan.findById(req.params.tripPlanId);
    if (!tripPlan) {
      return next(errorHandler(404, "Trip plan not found"));
    }

    if (tripPlan.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You can only update your own trip plans"));
    }

    const updatedTripPlan = await TripPlan.findByIdAndUpdate(
      req.params.tripPlanId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedTripPlan);
  } catch (error) {
    next(error);
  }
};

export const deleteTripPlan = async (req, res, next) => {
  try {
    const tripPlan = await TripPlan.findById(req.params.tripPlanId);
    if (!tripPlan) {
      return next(errorHandler(404, "Trip plan not found"));
    }

    if (tripPlan.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, "You can only delete your own trip plans"));
    }

    await TripPlan.findByIdAndDelete(req.params.tripPlanId);
    res.status(200).json("Trip plan has been deleted");
  } catch (error) {
    next(error);
  }
};
