const { default: mongoose } = require("mongoose");
const Question = require("../models/questionModel");

exports.validateParamId = async (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return res.status(400).json({
      status: "fail",
      message: "Question ID format is invalid",
    });
  }

  const question = await Question.findById(val);
  if (!question) {
    return ser.status(404).json({
      status: "fail",
      message: "Question ID is invalid",
    });
  }
  next();
};

exports.validate = async (req, res, next) => {
  const { question } = req.body;

  if (!question ) {
    return res.status(400).json({
      status: "fail",
      message: "question are required",
    });
  }

  next();
};