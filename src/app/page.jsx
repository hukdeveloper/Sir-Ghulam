"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import axios from "axios";
// import { dialogues } from "../data/Dialog";
import { useRouter } from "next/navigation";

let dialogues = [];

// Define the survey form component
export default function SurveyForm() {
  const router = useRouter();
  // Define the state variable for the data
  const [data, setData] = useState([]);

  // let [mydata, setMydata] = useState([]);

  // Define the state variable for the selected values
  const [selectedValues, setSelectedValues] = useState({});

  // const [sendData, setSendData] = useState([dialogues]);

  let [dialoguesArray, setDiaguesArray] = useState(Array(54).fill(null));

  // Define a function that takes three parameters: _id, quiz and feedback
  function addDialogue(_id, quiz, feedback) {
    // console.log(_id, quiz, feedback);
    // Check if the dialogues array already contains an object with the same _id
    var index = dialogues.findIndex(function (dialogue) {
      return dialogue._id === _id;
    });

    // If the index is -1, it means there is no such object, so create a new one
    if (index === -1) {
      // Create a new object with the given _id and an empty quizFeedbacks array
      var newDialogue = {
        _id: _id,
        quizFeedbacks: [],
      };

      // Push the new object to the dialogues array
      dialogues.push(newDialogue); // Update the index to point to the newly added object
      index = dialogues.length - 1;
    }

    // Find the quizFeedbacks array of the object at the index
    var quizFeedbacks = dialogues[index].quizFeedbacks;

    // Check if the quizFeedbacks array already contains an object with the same quiz
    var quizIndex = quizFeedbacks.findIndex(function (quizFeedback) {
      return quizFeedback.quiz === quiz;
    });

    // If the quizIndex is -1, it means there is no such object, so create a new one
    if (quizIndex === -1) {
      // Create a new object with the given quiz and feedback
      var newQuizFeedback = {
        quiz: quiz,
        feedback: feedback,
      };

      // Push the new object to the quizFeedbacks array
      quizFeedbacks.push(newQuizFeedback);
    } else {
      // If the quizIndex is not -1, it means there is an existing object, so update its feedback
      quizFeedbacks[quizIndex].feedback = feedback;
    }
  }

  const handleRadioGroup = (event) => {
    // Get the quiz _id and the value from the event object
    const quizId = event.target.name;
    const value = event.target.value;
    // const dialogueId = event.target.dataset.dialogId;

    // const [dialogueId] = value.split("_");

    // const parts = value.split("_");
    // const newValue = parts[1];

    // console.log(value);

    const parts = value.split("-");

    const quiz = parts[0];
    const dialogue = parts[1].split("_")[0];
    const myvalue = parts[1].split("_")[1];

    addDialogue(dialogue, quiz, myvalue);

    console.log(dialogues);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [quizId]: myvalue,
    }));
  };

  // Define the handler function for the submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    var form = event.target;
    var radios = form.querySelectorAll("input[type=radio]");
    // Initialize an empty object to store the names and values of the radio groups
    var radioGroups = {};

    // Loop through the radio buttons
    for (var i = 0; i < radios.length; i++) {
      // Get the name and value of the current radio button
      var name = radios[i].name;
      var value = radios[i].value;

      // If the name is not in the radioGroups object, add it with a null value
      if (!radioGroups[name]) {
        radioGroups[name] = null;
      }

      // If the current radio button is checked, update the value in the radioGroups object
      if (radios[i].checked) {
        radioGroups[name] = value;
      }
    }
    // Loop through the radioGroups object
    for (var name in radioGroups) {
      // If any value is null, it means no radio button is selected for that group
      if (radioGroups[name] === null) {
        // Alert the user and return false to prevent form submission
        alert("Please attempt all the fields!!!");
        return false;
      }
    }
    const data = {
      dialogues,
    };
    axios
      .put("/api/response", data)
      .then(() => {
        router.push("/thanks");
      })
      .catch((error) => {
        console.log(error);
      });

    // Do something with the selected values, such as sending them to a server or displaying them on the screen
    // console.log(dialogues);
  };

  // Define the useEffect hook to fetch the data from the API
  useEffect(() => {
    // Use fetch or axios to make an HTTP request to the API endpoint
    const res = fetch("/api/response")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  // Define an array of options for the radio group
  const options = [
    "Not at all",
    "Somewhat",
    "Moderately",
    "Very well",
    "Extremely well",
  ];

  // Return the JSX code for rendering the survey form
  return (
    <form onSubmit={handleSubmit}>
      {/* Loop through the data array and render each dialogue */}
      {data.map((dialogue) => (
        <div key={dialogue._id}>
          {/* Display the dialogue name */}
          <Typography variant="h6" gutterBottom>
            {dialogue.name}
          </Typography>
          {/* Loop through the answers array and render each question */}
          {dialogue.answers.map((answer) => (
            <div key={answer._id}>
              {/* Display the question */}
              <Typography variant="body1" gutterBottom>
                {answer.quiz.question}
              </Typography>
              {/* Render a radio group with dynamic options */}
              <RadioGroup
                name={answer._id} // Use the quiz _id as the name attribute
                value={
                  `${answer.quiz._id}-${dialogue._id}_${
                    selectedValues[answer._id]
                  }` || ""
                } // Use the selected values object to get the value for the quiz _id
                onChange={handleRadioGroup} // Use a single handler function for all radio groups
                data-dialog-id={dialogue._id}
              >
                {/* Use the map method to create an array of FormControlLabel components */}
                {options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={`${answer.quiz._id}-${dialogue._id}_${option}`}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      ))}
      {/* Render a submit button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
