const { default: mongoose } = require("mongoose");
const Answers = require("../models/answerModel");

exports.validateParamId = async (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return res.status(400).json({
      status: "fail",
      message: "Question ID format is invalid",
    });
  }

  const answer = await Answers.findById(val);
  if (!answer) {
    return ser.status(404).json({
      status: "fail",
      message: "Question ID is invalid",
    });
  }
  next();
};

exports.validate = async (req, res, next) => {
  const { answer } = req.body;

  if (!answer ) {
    return res.status(400).json({
      status: "fail",
      message: "answer are required",
    });
  }

  next();
};