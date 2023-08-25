const mongoose = require("mongoose");
const Response = require("./Response");

const userSchema = mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  dialogues: {
    type: [
      {
        _id: {
          type: String,
          required: true,
        },
        quizFeedbacks: {
          type: [
            {
              quiz: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz",
                required: true,
              },
              feedback: [
                {
                  type: String,
                },
              ],
            },
          ],
        },
      },
    ],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
