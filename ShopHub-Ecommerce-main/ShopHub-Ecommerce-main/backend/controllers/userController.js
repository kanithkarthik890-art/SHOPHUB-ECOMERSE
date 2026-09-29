const User = require("../models/User");



const getProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");


    res.json({

      success: true,

      user,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }

};



const updateProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user.id
    );


    if (!user) {

      return res.status(404).json({

        message: "User Not Found",

      });

    }


    user.address =
      req.body.address;

    user.city =
      req.body.city;

    user.state =
      req.body.state;

    user.pincode =
      req.body.pincode;

    user.phone =
      req.body.phone;


    await user.save();


    res.json({

      success: true,

      message:
        "Profile Updated Successfully",

      user,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Server Error",

    });

  }

};


module.exports = {

  getProfile,

  updateProfile,

};