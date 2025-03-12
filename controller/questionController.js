const Question = require("../models/questionModel");

exports.cerateQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    return res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong creating question",
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        question,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong updating question",
    });
  }
};


exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();

    if (!questions || questions.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No questions found",
        data: [],
      });
    }

    return res.status(200).json({
      status: "success",
      data: { questions },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong fetching questions",
    });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { question },
    });
  } catch (err) {
    return res.status(200).json({
      status: "fail",
      message: "Something went wrong fetching question",
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "question deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Something went wrong deleting question",
    });
  }
};