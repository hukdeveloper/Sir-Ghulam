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
        feedback: {
          type: String,
        },
      },
    ],
  },
});
const Response =
  mongoose.models.Response || mongoose.model("Response", dialogSchema);
module.exports = Response;

// import Typography from "@mui/material/Typography";
// import RadioGroup from "@mui/material/RadioGroup";
// import Radio from "@mui/material/Radio";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Button from "@mui/material/Button";

// {/* Render a radio group with dynamic options */}
{
  /* <RadioGroup
name={answer._id} // Use the quiz _id as the name attribute
value={selectedValues[answer._id] || ""} // Use the selected values object to get the value for the quiz _id
onChange={handleRadioGroup} // Use a single handler function for all radio groups
> */
}
// {/* Use the map method to create an array of FormControlLabel components */}
// {options.map((option) => (
// <FormControlLabel
//   key={option}
//   value={option}
//   control={<Radio />}
//   label={option}
// />
// ))}
// </RadioGroup>
// {/* Display any validation errors for the question */}
// {errors[answer.quiz._id] && (
// <Typography variant="body2" color="error">
//   {errors[answer.quiz._id]}
// </Typography>
// )}
