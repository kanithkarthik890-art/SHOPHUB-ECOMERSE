const Order = require("../models/Order");
const User = require("../models/User");

const updateOrderStatus = async (
  req,
  res
) => {

  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {

      return res.status(404).json({
        message: "Order Not Found",
      });

    }

    order.status = req.body.status;

    await order.save();

    res.json({
      success: true,
      message:
        "Order Status Updated",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


const placeOrder = async (req, res) => {
  try {
    const {
      products,
      totalPrice,
      paymentMethod,

    } = req.body;
    const user = await User.findById(
      req.user.id
    );
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
      paymentMethod,
      status: "Pending",
    });
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    if (
      order.status === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Delivered orders cannot be cancelled",
      });
    }

    order.status = "Cancelled";
    order.cancelledAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Order Cancelled Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};