// Here all the User authorization functionalites will be shown

const jwtToken = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.signUp = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  if (!username || !password) {
    res.json({ success: false, message: "Please fill in all the details " });
  }

  try {
    const existingUser = await User.find({ username });
    if (existingUser) {
      res.json({ success: false, message: "User already exists" });
    }

    const newUser = { username, password, isAdmin };
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "New User has been successfully created",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while creating new User entery",
    });
  }
};

// login controller for the user

exports.logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.find({ username });
    if (!user) {
      res.json({ message: "User is not registered" });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      res.status(401).json({
        success: false,
        message: "Entered incorrect password",
      });
    }

    const token = jwtToken.sign(  // jwt -> payload, secreate key or signature and options if required
      { id: user._id, isAdmin: user.isAdmin }, // payload created to be send
      "secretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to Login the user",
    });
  }
};
