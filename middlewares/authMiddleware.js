const { default: mongoose } = require("mongoose");
const validator = require("validator");
const User = require("../models/userMode");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "Not logged in!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Authentication failed!",
      error: err.message,
    });
  }
};

exports.validateRegister = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid email format",
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords do not match.",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      status: "fail",
      message: "User already exists with that email.",
    });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  next();
};

exports.validateIfAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      status: "fail",
      message: "Data is for admin only",
    });
  }

  next();
};

exports.validateIfloggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(400).json({
      status: "fail",
      message: "User is not authenticated",
    });
  }

  next();
};

exports.validateBodyId = async (req, res, next) => {
  const { user } = req.body;

  if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({
      status: "fail",
      message: "User ID format is invalid",
    });
  }

  const userExist = await User.findById(user);
  if (!userExist) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  next();
};