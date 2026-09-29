const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const User = require("../models/User");
const Cart = require("../models/Cart");

const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      order,
    });
  } catch (error) {
    console.log("Razorpay Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create Razorpay order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
      totalPrice,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification data is missing",
      });
    }

    // Generate signature using Razorpay secret
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify Razorpay signature
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Get logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create ShopHub order
    const order = await Order.create({
      user: req.user.id,

      shippingAddress: {
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        phone: user.phone,
      },

      products,

      totalPrice,

      paymentMethod: "Razorpay",

      paymentStatus: "Paid",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      status: "Processing",
    });

    // Clear user's cart after successful payment
    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      order,
    });
  } catch (error) {
    console.log("Payment Verification Error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
