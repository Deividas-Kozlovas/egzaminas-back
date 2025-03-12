const { default: mongoose } = require("mongoose");
const Question = require("../models/questionModel");

exports.validateParamId = async (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return res.status(400).json({
      status: "fail",
      message: "Question ID format is invalid",
    });
  }

  const ad = await Question.findById(val);
  if (!ad) {
    return ser.status(404).json({
      status: "fail",
      message: "Question ID is invalid",
    });
  }
  next();
};

// exports.validateBodyId = async (req, res, next) => {
//   const { question } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(ad)) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Ad ID format is invalid in body",
//     });
//   }

//   const adExists = await Ad.findById(ad);
//   if (!adExists) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Ad not found",
//     });
//   }

//   next();
// };

exports.validate = async (req, res, next) => {
  const { question } = req.body;

  if (!question ) {
    return res.status(400).json({
      status: "fail",
      message: "Question are required",
    });
  }

  next();
};