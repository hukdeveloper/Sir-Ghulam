"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Skeleton from "@mui/material/Skeleton";

import { dialoguesData } from "../../data/Dialog";

// let dialoguesMatchingData = [];

export default function Admin() {
  const [answers, setAnswers] = useState([]);
  let [quizResult, setQuizResult] = useState([]);

  let d = 0;

  useEffect(() => {
    const getAnswers = async () => {
      const response = await axios.get("/api/admin/response");
      const ans = response.data.dialogues;
      setAnswers(ans);
    };
    getAnswers();
  }, []);

  const columns = [
    { field: "quiz", headerName: "Question", width: 250 },
    { field: "Not at all", headerName: "Not at all", width: 130 },
    { field: "Somewhat", headerName: "Somewhat", width: 130 },
    { field: "Moderately", headerName: "Moderately", width: 130 },
    { field: "Very well", headerName: "Very well", width: 130 },
    { field: "Extremely well", headerName: "Extremely well", width: 150 },
  ];
  const DialogDataGrid = ({ name, quizFeedbacks }) => {
    const rows = quizFeedbacks.map((feedback, index) => ({
      id: `${name}-${index}`,
      quiz: feedback.quiz,
      ...feedback.result,
    }));

    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          getRowHeight={() => "auto"}
        />
      </div>
    );
  };

  // const options = [
  //   "Not at all",
  //   "Somewhat",
  //   "Moderately",
  //   "Very well",
  //   "Extremely well",
  // ];

  return (
    <Box>
      <Typography variant="h4" textAlign={"center"}>
        Active Listening and Reassurance Evaluation
      </Typography>

      {answers.length === 0 ? (
        <Box>
          <Skeleton animation="wave" sx={{ height: 100 }} variant="rectangle" />
          <Typography variant="h6">Please wait, Data is Loading....</Typography>
        </Box>
      ) : (
        answers.map((dialogue, index) => (
          <Box key={index}>
            <Typography variant="h5" padding={"4px 0"} mt={3}>
              {dialogue.name}
            </Typography>
            <Typography variant="body1" visibility={"hidden"} display={"none"}>
              {
                (d = dialoguesData.findIndex(
                  (item) => item.name === dialogue.name
                ))
              }
            </Typography>
            <b style={{ paddingBottom: "10px" }}>
              {dialoguesData[d].data.map((item, index) => (
                <Box key={index}>
                  <Typography
                    padding={"2px 0"}
                    variant="body2"
                    display={!item.Therapist && "none"}
                  >
                    <b>Therapist: </b>
                    {item.Therapist}
                  </Typography>
                  <Typography
                    variant="body2"
                    display={!item.Client && "none"}
                    padding={"2px 0"}
                  >
                    <b>Cleint: </b>
                    {item.Client}
                  </Typography>
                </Box>
              ))}
            </b>
            <Box mt={4}>
              <DialogDataGrid
                name={dialogue.name}
                quizFeedbacks={dialogue.quizFeedbacks}
              />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
}
