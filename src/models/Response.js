const mongoose = require("mongoose");
const Quiz = require("./Quiz"); // Import the Question model

const dialogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  answers: {
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
});
const Response =
  mongoose.models.Response || mongoose.model("Response", dialogSchema);
module.exports = Response;
