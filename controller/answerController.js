const Answer = require("../models/answerModel");

exports.createAnswer = async (req, res) => {
  try {
    const answer = await Answer.create(req.body);
    return res.status(200).json({
      status: "success",
      data: {
        answer,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong creating answer",
    });
  }
};


exports.updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!answer) {
      return res.status(404).json({
        status: "fail",
        message: "answer not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        answer,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong updating answer",
    });
  }
};


exports.getAllAnswers = async (req, res) => {
  try {
    const answer = await Answer.find();

    if (!answer || answer.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No answer found",
        data: [],
      });
    }

    return res.status(200).json({
      status: "success",
      data: { answer },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong fetching answer",
    });
  }
};

exports.getAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      return res.status(404).json({
        status: "fail",
        message: "answer not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { answer },
    });
  } catch (err) {
    return res.status(200).json({
      status: "fail",
      message: "Something went wrong fetching answer",
    });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);

    if (!answer) {
      return res.status(404).json({
        status: "fail",
        message: "answer not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "answer deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong deleting answer",
    });
  }
};