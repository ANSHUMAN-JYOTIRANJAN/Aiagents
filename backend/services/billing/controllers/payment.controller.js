import axios from "axios";
import crypto from "crypto";
import { PLANS } from "../config/plan.js";
import payment from "../models/payment.js";
export const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.headers["x-user-id"];
    const selectPlan = PLANS[plan];

    if (!selectPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan",
      });
    }
    // const order = await 
  } catch (error) {}
};
