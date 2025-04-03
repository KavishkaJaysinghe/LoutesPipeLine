import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createTripPlan,
  getTripPlans,
  updateTripPlan,
  deleteTripPlan,
} from "../controllers/plan.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createTripPlan);
router.get("/get", verifyToken, getTripPlans);
router.put("/update/:tripPlanId", verifyToken, updateTripPlan);
router.delete("/delete/:tripPlanId", verifyToken, deleteTripPlan);

export default router;