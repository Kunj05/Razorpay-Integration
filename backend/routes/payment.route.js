import express from "express";
const router = express.Router();

import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

router.post("/create-order", createOrder);
router.post("/verifyPayment", verifyPayment);

export default router;