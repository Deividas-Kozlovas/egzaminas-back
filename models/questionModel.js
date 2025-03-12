const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
    },
    status: {
      type: String,
    },
    ansqers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers",
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

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;