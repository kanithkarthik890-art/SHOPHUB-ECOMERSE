const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "shophub",
      }
    );

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload Failed",
    });
  }
};

module.exports = {
  uploadImage,
};