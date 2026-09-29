const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
placeOrder,
getMyOrders,
getAllOrders,
updateOrderStatus,
cancelOrder,

} = require(
"../controllers/orderController");

router.post("/", protect, placeOrder);

router.get("/", protect, getMyOrders);
router.get(
  "/all",
  protect,
  getAllOrders
);

router.put(
  "/status/:id",
  protect,
  updateOrderStatus
);

router.put(
  "/cancel/:id",
  protect,
  cancelOrder
);

module.exports = router;