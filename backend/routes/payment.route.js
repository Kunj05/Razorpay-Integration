import express from "express";
const router = express.Router();

// Importing Middlewares
// const { auth } = require("../middlewares/Auth");
import { createOrder, verifyPayment, sendPaymentSuccessEmail } from "../controllers/payment.controller.js";

// router.post("/create-order", auth, createOrder);
// router.post("/verifyPayment", auth, verifyPayment);
// router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail);

router.post("/create-order", createOrder);
router.post("/verifyPayment", verifyPayment);
router.post("/sendPaymentSuccessEmail", sendPaymentSuccessEmail);

export default router;