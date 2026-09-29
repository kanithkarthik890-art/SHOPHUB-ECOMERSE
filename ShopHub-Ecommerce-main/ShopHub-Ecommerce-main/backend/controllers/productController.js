const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

   const getProducts = async (req, res) => {
try {
const products = await Product.find();


res.status(200).json({
  success: true,
  count: products.length,
  products,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Server Error",
});


}
};

const getProductById = async (req, res) => {
try {
const product = await Product.findById(req.params.id);


if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found",
  });
}

res.status(200).json({
  success: true,
  product,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Server Error",
});


}
};

   const updateProduct = async (req, res) => {
try {
const product = await Product.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
runValidators: true,
}
);


if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found",
  });
}

res.status(200).json({
  success: true,
  message: "Product updated",
  product,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Server Error",
});

}
};

const deleteProduct = async (req, res) => {
try {
const product = await Product.findById(req.params.id);

if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product not found",
  });
}

await product.deleteOne();

res.status(200).json({
  success: true,
  message: "Product deleted successfully",
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
createProduct,
getProducts,
getProductById,
updateProduct,
deleteProduct
};
