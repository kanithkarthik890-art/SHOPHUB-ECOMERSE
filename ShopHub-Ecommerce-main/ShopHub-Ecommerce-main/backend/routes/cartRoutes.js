const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCartItems,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getCartItems);
router.delete("/:id", protect, removeFromCart);


module.exports = router;