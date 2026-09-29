const Review = require("../models/Review");
const Product = require("../models/Product");

const addReview = async (req, res) => {
  try {
    const { product, rating, comment } =
      req.body;

    const existingReview = await Review.findOne({
      user: req.user.id,
      product,
    });
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message:
          "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      product,
      rating,
      comment,
    });

    const reviews = await Review.find({
      product,
    });
    
    const avgRating =
      reviews.reduce(
        (sum, item) => sum + item.rating,
        0
      ) / reviews.length;
    
    await Product.findByIdAndUpdate(
      product,
      {
        rating: avgRating,
        numReviews: reviews.length,
      }
    );
    
    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    const averageRating =
      reviews.length > 0
        ? reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / reviews.length
        : 0;

    res.status(200).json({
      success: true,
      reviews,
      averageRating,
      totalReviews: reviews.length,
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
  addReview,
  getReviews,
};