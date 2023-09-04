"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../app/globals.css";

// import required modules
import { Pagination } from "swiper/modules";

import axios from "axios";
import { dialoguesData } from "../../data/Dialog";
import { useRouter } from "next/navigation";

let dialogues = [];

// Define the survey form component
export default function SurveyForm() {
  const router = useRouter();

  const [data, setData] = useState([]);

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [english, setEnglish] = useState("");
  const [education, setEducation] = useState("");
  const [message, setMessage] = useState("");

  let d = 0;
  const [selectedValues, setSelectedValues] = useState({});

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

  const handleGender = (event) => {
    const value = event.target.value;
    setGender(event.target.value);
  };
  const handleAge = (event) => {
    const value = event.target.value;
    setAge(() => value);
    console.log(age);
  };
  const handleEnglish = (event) => {
    const value = event.target.value;
    setEnglish(value);
    console.log(english);
  };
  const handleEducation = (event) => {
    const value = event.target.value;
    setEducation(value);
    console.log(education);
  };

  const handleRadioGroup = (event) => {
    // Get the quiz _id and the value from the event object
    const quizId = event.target.name;
    const value = event.target.value;

    const parts = value.split("-");

    const quiz = parts[0];
    const dialogue = parts[1].split("_")[0];
    const myvalue = parts[1].split("_")[1];

    addDialogue(dialogue, quiz, myvalue);

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
      gender,
      age,
      english,
      education,
      dialogues,
      message,
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
    // event.target.reset();
  };

  // Define the useEffect hook to fetch the data from the API
  useEffect(() => {
    // Use fetch or axios to make an HTTP request to the API endpoint
    fetch("/api/response")
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
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  // console.log(dialoguesData);

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" textAlign={"center"}>
        Active Listening and Reassurance Evaluation
      </Typography>
      <Typography variant="body1" mt={2} textAlign={"justify"}>
        Thank you for your participation in this study, which aims to evaluate
        dialogue qualities such as active listening and reassurance behaviour in
        therapist-client conversations, Your responses will help us to
        understand the effectiveness of their communicative behaviours and the
        level of support provided. There are a total of 9 dialogues in this study.
        Please carefully read each dialogue and select the response that best
        reflects your perception of the therapists active listening and
        reassurance behaviour. Your honest and thoughtful responses will
        contribute to our research findings. For each question, select the
        option from the list below that best represents how much you agree with
        the statement.
      </Typography>
      <Typography variant="body1" mt={2} textAlign={"justify"}>
        There are total 9 of dialogues in this study. Please carefully read each
        dialogue and select the response that best reflects your perception of
        the therapists active listening and reassurance behaviour. Your honest
        and thoughtful responses will contribute to our research findings. For
        each question, select the option from the list below that best
        represents how much you agree with the statement. At the end of all 9
        dialogues you will be asked to give some basic feedback and
        demographic information.
      </Typography>
      <Typography variant="body1" mt={2} textAlign={"justify"}>
        <b>Note:</b> Your responses will remain anonymous and confidential. Your
        feedback is highly valued and will be used solely for evaluation and
        research purposes. Thank you for your time and participation in this
        evaluation.
      </Typography>
      {/* <Typography variant="body1" mt={2} textAlign={"justify"}>
        At the end of all 9 dialogues you will be asked to give some basic
        feedback and demographic information
      </Typography> */}
      {/* <ul
        style={{
          marginLeft: "50px",
          padding: "10px 0",
          lineHeight: "1.5",
        }}
      >
        <li>Not at all</li>
        <li>Somewhat</li>
        <li>Moderately</li>
        <li>Very well</li>
        <li>Extremely well</li>
      </ul> */}
      {data.length !== 0 ? (
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="mySwiper"
          navigation={true}
        >
          {data.map((dialogue, index) => (
            <SwiperSlide key={dialogue._id}>
              <div>
                {/* Display the dialogue name */}
                <br />
                <Divider />
                <br />
                <Typography variant="h5" gutterBottom>
                  Dialog {index + 1}
                </Typography>
                <Typography
                  variant="body1"
                  visibility={"hidden"}
                  display={"none"}
                >
                  {
                    (d = dialoguesData.findIndex(
                      (item) => item.name === dialogue.name
                    ))
                  }
                </Typography>
                {/* <b>{dialoguesData[d].name}</b> */}

                <b>
                  {d !== null ? (
                    dialoguesData[d].data.map((item, index) => (
                      <Box key={index}>
                        <Typography
                          variant="body2"
                          display={!item.Therapist && "none"}
                          padding={"2px 0"}
                        >
                          <b>Therapist: </b>
                          {item.Therapist}
                        </Typography>
                        <Typography
                          variant="body2"
                          display={!item.Client && "none"}
                          padding={"2px 0"}
                        >
                          <b>Client: </b>
                          {item.Client}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <b>{dialogue.name}</b>
                  )}
                </b>
                <br />
                <Divider />
                <br />
                {/* Loop through the answers array and render each question */}
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  padding={"5px 0"}
                  color={"red"}
                >
                  Read the following questions, for each question, select the
                  option from the list below that best represents how much you
                  agree with the statement.
                </Typography>
                {dialogue.answers.map((answer) => (
                  <div key={answer._id}>
                    {/* Display the question */}
                    <Typography variant="h6" gutterBottom>
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
                      sx={{
                        // color: "#D81B60",
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "20px",
                        "@media(max-width:500px)": {
                          flexDirection: "column",
                        },
                        paddingBottom: "8px",
                      }}
                    >
                      {/* Use the map method to create an array of FormControlLabel components */}
                      {options.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={`${answer.quiz._id}-${dialogue._id}_${option}`}
                          control={
                            <Radio
                              size="small"
                              // sx={{
                              //   color: "#D81B60",
                              //   "&.Mui-checked": {
                              //     color: "#D81B60",
                              //   },
                              // }}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
              <Typography variant="h4" mt={10} textAlign={"center"}>
                Demographic Information
              </Typography>
              <Typography variant="h6" gutterBottom mt={20}>
                What gender do you identify as?
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={handleGender}
                  sx={{
                    // color: "#D81B60",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20px",
                    "@media(max-width:500px)": {
                      flexDirection: "column",
                    },
                    paddingBottom: "8px",
                  }}
                  aria-label="gender"
                  name="gender"
                  value={gender}
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Male"
                    value="male"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Female"
                    value="female"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Others"
                    value="others"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Prefer not to say"
                    value="prefer not to say"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" gutterBottom>
                What is your age?
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={handleAge}
                  sx={{
                    // color: "#D81B60",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20px",
                    "@media(max-width:500px)": {
                      flexDirection: "column",
                    },
                    paddingBottom: "8px",
                  }}
                  aria-label="gender"
                  name="age"
                  value={age}
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="18-25"
                    value="18-25"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="26-35"
                    value="26-35"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="36-45"
                    value="36-45"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="46-55"
                    value="46-55"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="56-65"
                    value="56-65"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="65+"
                    value="65+"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" gutterBottom>
                Is English a native language for you?
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={handleEnglish}
                  sx={{
                    // color: "#D81B60",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20px",
                    "@media(max-width:500px)": {
                      flexDirection: "column",
                    },
                    paddingBottom: "8px",
                  }}
                  aria-label="english"
                  name="english"
                  value={english}
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Yes"
                    value="yes"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="No"
                    value="no"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="h6" gutterBottom>
                What is the highest degree or level of education you have
                completed?
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={handleEducation}
                  sx={{
                    // color: "#D81B60",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20px",
                    "@media(max-width:500px)": {
                      flexDirection: "column",
                    },
                    paddingBottom: "8px",
                  }}
                  aria-label="education"
                  name="education"
                  value={education}
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Undergraduate"
                    value="undergraduate"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Graduate"
                    value="graduate"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="Masters"
                    value="masters"
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label="PhD"
                    value="phd"
                  />
                </RadioGroup>
              </FormControl>
              {/* <Typography variant="h6">
                ({gender})-({age})-({english})-({education})
              </Typography> */}
            </Box>
            <Typography variant="body1" mt={2} textAlign={"justify"}>
              If you have any comments or suggestions please write
              down in the box
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="standard-multiline-static"
                label="Message"
                multiline
                rows={8}
                variant="filled"
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                // marginBottom: 2,
                mt: 4,
              }}
            >
              Submit
            </Button>
          </SwiperSlide>
        </Swiper>
      ) : (
        <Box height={"100px"}>
          <Typography variant="h6">
            Please wait, Dialogues are loading...
          </Typography>
          <Skeleton animation="wave" sx={{ height: 50 }} variant="rectangle" />
        </Box>
      )}

      {/* Render a submit button */}
      <br />

      <br />
      {/* <Stack spacing={2} padding={"10px 0"}>
        <Pagination count={9} color="secondary" onChange={handleChange} />
      </Stack> */}
    </form>
  );
}
