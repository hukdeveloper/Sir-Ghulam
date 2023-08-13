"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Admin() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const getAnswers = async () => {
      const response = await axios.get("/api/admin/answers");
      const ans = response.data;
      // console.log(ans);
      setAnswers(ans);
    };
    getAnswers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "question", headerName: "Question", width: 280 },
    {
      field: "Good",
      headerName: "Good",
      type: "number",
      width: 120,
    },
    {
      field: "Bad",
      headerName: "Bad",
      type: "number",
      width: 100,
    },
    {
      field: "Neutral",
      headerName: "Neutral",
      type: "number",
      width: 120,
    },
    {
      field: "Excellent",
      headerName: "Excellent",
      type: "number",
      width: 140,
    },
    {
      field: "Perfect",
      headerName: "Perfect",
      type: "number",
      width: 140,
    },
  ];

  return (
    <div>
      <DataGrid
        rows={answers}
        getRowHeight={() => "auto"}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        sx={{
          ".MuiDataGrid-columnHeaderTitleContainer": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          ".MuiDataGrid-menuIcon": {
            visibility: "visible",
          },
          ".MuiDataGrid-cell--textRight": {
            justifyContent: "center !important",
          },
          ".MuiDataGrid-virtualScroller": {
            overflowY: "hidden",
          },
        }}
      />
    </div>
  );
}
