import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    // General Information
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    numberOfAdults: {
      type: Number,
      required: true,
    },
    numberOfChildren: {
      type: Number,
      required: true,
    },
    dateComments: {
      type: String,
      default: "",
    },
    // Location Information
    selectedDestinations: [{
      type: String,
      required: true,
    }],
    additionalLocations: {
      type: String,
      default: "",
    },
    // Accommodation
    accommodationType: {
      type: String,
      enum: ["1_star", "2_star", "3_star", "4_star", "5_star"],
      required: true,
    },
    numberOfBedrooms: {
      type: Number,
      required: true,
    },
    accommodationPreference: {
      type: String,
      default: "",
    },
    // Transport
    vehicleType: {
      type: String,
      enum: ["Sedan", "Sedan-VIP", "SUV", "SUV-VIP", "High-Roof-Van", "Bus"],
      required: true,
    },
    numberOfVehicles: {
      type: Number,
      required: true,
    },
    transportPreference: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const TripPlan = mongoose.model("TripPlan", tripPlanSchema);

export default TripPlan;