import express from "express";
const router = express.Router();

// Importing Middlewares
// const { auth } = require("../middlewares/Auth");
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

// router.post("/create-order", auth, createOrder);
// router.post("/verifyPayment", auth, verifyPayment);

router.post("/create-order", createOrder);
router.post("/verifyPayment", verifyPayment);

export default router;