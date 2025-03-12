const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
    question: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;