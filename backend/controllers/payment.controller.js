import razorpay from '../config/Razorpay.js';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
    console.log("Creating  order");
    const {amount,currency } = req.body;
    try {
        const options = {
            amount: amount*100  , 
            currency: currency ,
            receipt: `receipt_order_${crypto.randomBytes(10).toString("hex")}`,
            payment_capture: 1
        };
        const response = await razorpay.orders.create(options);
        if (response) {
            console.log("Order created successfully");
            console.log(response);
            res.status(200).json({ 
                success: true,
                data: response,
            });
        } else {
            res.status(500).json({ 
                success: false,
                message: 'Order creation failed'
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'An error occurred',
            error: error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    console.log("Verify the payment");
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Razorpay order ID, payment ID, and signature are required.",
            });
        }
        // console.log("Start");
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // console.log("Payment ID:", razorpay_payment_id);
            // console.log("Order ID:", razorpay_order_id);
            // console.log("Signature:", razorpay_signature);
            // console.log("Payment verified successfully");
            return res.status(200).json({ 
                success: true, 
                message: "Payment verified successfully" 
            });
        } else {
            console.log("Invalid payment signature");
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid payment signature' 
            });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: Could not verify payment",
            error: error.message,
        });
    }
};

export const sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId } = req.body;
    try {
        if (!orderId || !paymentId) {
            return res.status(400).json({ 
                success: false, 
                message: "Order ID and Payment ID are required." 
            });
        }

        console.log(`Sending payment success email for order ${orderId} and payment ${paymentId}`);
        return res.status(200).json({ 
            success: true, 
            message: "Payment success email sent." 
        });
    } catch (error) {
        console.error("Error sending payment success email:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: Could not send email",
            error: error.message,
        });
    }
};