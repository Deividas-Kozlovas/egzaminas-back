const mongoose = require("mongoose");

const answesrsSchema = new mongoose.Schema(
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

const Answers = mongoose.model("Answers", answesrsSchema);

module.exports = Answers;