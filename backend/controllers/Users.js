const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../utils/secretToken");

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await Users.findOne({ email }).lean();
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      isAdmin: user.isAdmin,
      userId: user.email,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await Users.create({
      email,
      password,
      username,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      isAdmin: user.isAdmin,
      userId: user.email,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
