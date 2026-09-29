const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user.id,
      product,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getCartItems = async (req, res) => {
try {
const cartItems = await Cart.find({
user: req.user.id,
}).populate("product");

res.status(200).json({
  success: true,
  count: cartItems.length,
  cartItems,
});

} catch (error) {
console.log(error);

res.status(500).json({
  success: false,
  message: "Server Error",
});

}
};

const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
        _id: req.params.id,
        user: req.user.id,
      });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
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
  addToCart,
  getCartItems,
  removeFromCart,
};