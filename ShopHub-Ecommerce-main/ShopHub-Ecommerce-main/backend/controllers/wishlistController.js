const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { product } = req.body;

    const item = await Wishlist.create({
      user: req.user.id,
      product,
    });

    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const item = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
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
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};