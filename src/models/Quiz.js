const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
module.exports = Quiz;

// {
//   {
//     name:"Dialog 01",
//     answers:{
//       {
//         quiz:"The Question from the Quiz collections",
//         feedback:"Good"
//       }
//     }
//   },
//   {
//     name:"Dialog 03",
//     answers:{
//       {
//         quiz:"The Question from the Quiz collections",
//         feedback:"Bad"
//       }
//     }
//   },
//   {
//     name:"Dialog 04",
//     answers:{
//       {
//         quiz:"The Question from the Quiz collections",
//         feedback:"Neutral"
//       }
//     }
//   },

// }
