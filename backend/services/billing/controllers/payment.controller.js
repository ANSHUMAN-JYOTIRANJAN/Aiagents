import axios from "axios";
import crypto from "crypto";
import { PLANS } from "../config/plan.js";
import Payment from "../models/payment.js";
import { razorpay } from "../config/razorpay.js";
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
    const order = await razorpay.orders.create({
      amount: selectPlan.amount * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,
    });

    await Payment.create({
      userId,

      orderId: order.id,

      amount: selectPlan.amount,

      credits: selectPlan.credits,

      plan: selectPlan.id,

      currency: order.currency,

      status: "created",
    });
    return res.json({ success: true, order, plan: selectPlan });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,

        message: "Payment verification failed",
      });
    }

    const payment = await Payment.findOne({
      orderId: razorpay_order_id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,

        message: "Payment not found",
      });
    }
    payment.status = "paid";

    payment.paymentId = razorpay_payment_id;

    await payment.save();

    await axios.patch(
      `${process.env.AUTH_SERVICE}/internal/update-plan`,

      {
        userId: payment.userId,

        plan: payment.plan,

        credits: payment.credits,
      },
    );
    return res.json({
      success: true,

      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
