const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {

  res.send("Users Route Working");

});

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");


router.get(
  "/profile",
  protect,
  getProfile
);


router.put(
  "/profile",
  protect,
  updateProfile
);


module.exports = router;