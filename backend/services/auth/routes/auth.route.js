import express from "express";
import {
  login,
  logout,
  deductCredits,
  updatePlan,
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.patch("/internal/update-plan", updatePlan);
router.patch(
  "/internal/deduct-credits",

  deductCredits,
);
export default router;
