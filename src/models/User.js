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
  dialogue: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Response",
        required: true,
      },
    ],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
