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

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../app/globals.css";

import axios from "axios";
import { dialoguesData } from "../data/Dialog";
import { useRouter } from "next/navigation";

// Define the survey form component

export default function SurveyForm() {
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/response", data)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box>
      {data ? (
        router.push("/Active-and-Listening-Evaluation")
      ) : (
        <Box>
          <Typography variant="h5">Please wait, Data is Loading....</Typography>

          <Skeleton
            animation="wave"
            sx={{ height: "80vh" }}
            variant="rectangle"
          />
        </Box>
      )}
    </Box>
  );
}
