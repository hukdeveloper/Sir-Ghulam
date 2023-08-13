// Database schema for the answers collection
const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    response: {
      type: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.models.Answer || mongoose.model("Answer", answerSchema);

module.exports = Answer;
