const User = require("../models/userMode");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    return res.status(201).json({
      status: "success",
      message: "User successfully registered",
      data: { user: newUser, token },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Error: ${err.message}`,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email }).select("+password");

    if (
      !loginUser ||
      !(await loginUser.correctPassword(password, loginUser.password))
    ) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    const token = signToken(loginUser.id);

    res.status(200).json({
      status: "success",
      user: {
        id: loginUser.id,
        email: loginUser.email,
        name: loginUser.name,
        isAdmin: loginUser.isAdmin,
      },
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Error: ${err.message}`,
    });
  }
};