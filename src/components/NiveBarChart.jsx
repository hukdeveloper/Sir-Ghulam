"use client";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

const NiveBarChart = ({ chartData }) => {
  const [data, setData] = useState();
  useEffect(() => {
    const getAnswers = async () => {
      await fetch(`/api/admin/answers/${chartData}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    };

    getAnswers();
  });
  return (
    <div style={{ height: 500 }}>
      {data ? (
        // <ResponsiveBar
        //   data={data}
        //   keys={[
        //     "Not at All",
        //     "Moderately",
        //     "Somewhat",
        //     "Very well",
        //     "Extremely well",
        //   ]}
        //   indexBy="quiz"
        //   margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        //   padding={0.2}
        //   colors={{ scheme: "nivo" }}
        //   defs={[
        //     {
        //       id: "dots",
        //       type: "patternDots",
        //       background: "inherit",
        //       color: "#38bcb2",
        //       size: 4,
        //       padding: 1,
        //       stagger: true,
        //     },
        //     {
        //       id: "lines",
        //       type: "patternLines",
        //       background: "inherit",
        //       color: "#eed312",
        //       rotation: -45,
        //       lineWidth: 6,
        //       spacing: 10,
        //     },
        //   ]}
        //   valueScale={{ type: "linear" }}
        //   indexScale={{ type: "band", round: true }}
        //   fill={[
        //     {
        //       match: {
        //         id: "Moderately",
        //       },
        //       id: "dots",
        //     },
        //     {
        //       match: {
        //         id: "Somewhat",
        //       },
        //       id: "lines",
        //     },
        //   ]}
        //   borderColor={{
        //     from: "color",
        //     modifiers: [["darker", 1.6]],
        //   }}
        //   axisTop={null}
        //   axisRight={null}
        //   axisBottom={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //   }}
        //   axisLeft={{
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //   }}
        //   labelSkipWidth={12}
        //   labelSkipHeight={12}
        //   labelTextColor={{
        //     from: "color",
        //     modifiers: [["darker", 1.6]],
        //   }}
        //   legends={[
        //     {
        //       dataFrom: "keys",
        //       anchor: "bottom-right",
        //       direction: "column",
        //       justify: false,
        //       translateX: 120,
        //       translateY: 0,
        //       itemsSpacing: 2,
        //       itemWidth: 100,
        //       itemHeight: 20,
        //       itemDirection: "left-to-right",
        //       itemOpacity: 0.85,
        //       symbolSize: 20,
        //       effects: [
        //         {
        //           on: "hover",
        //           style: {
        //             itemOpacity: 1,
        //           },
        //         },
        //       ],
        //     },
        //   ]}
        //   role="application"
        //   ariaLabel="Nivo bar chart demo"
        //   barAriaLabel={(e) =>
        //     e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        //   }
        // />
        <ResponsiveBar
          data={data}
          keys={[
            "Not at All",
            "Moderately",
            "Somewhat",
            "Very well",
            "Extremely well",
          ]}
          indexBy="quiz"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Quiz",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Responses",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            `${e.id}: ${e.formattedValue} in quiz: ${e.indexValue}`
          }
        />
      ) : (
        <>Data is loading</>
      )}
    </div>
    // <>
    //   <ResponsiveBar
    //     data={data}
    //     keys={[
    //       "Not at All",
    //       "Moderately",
    //       "Somewhat",
    //       "Very well",
    //       "Extremely well",
    //     ]}
    //     indexBy="country"
    //     margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    //     padding={0.3}
    //     valueScale={{ type: "linear" }}
    //     indexScale={{ type: "band", round: true }}
    //     colors={{ scheme: "nivo" }}
    //     defs={[
    //       {
    //         id: "dots",
    //         type: "patternDots",
    //         background: "inherit",
    //         color: "#38bcb2",
    //         size: 4,
    //         padding: 1,
    //         stagger: true,
    //       },
    //       {
    //         id: "lines",
    //         type: "patternLines",
    //         background: "inherit",
    //         color: "#eed312",
    //         rotation: -45,
    //         lineWidth: 6,
    //         spacing: 10,
    //       },
    //     ]}
    //     // fill={[
    //     //   {
    //     //     match: {
    //     //       id: "fries",
    //     //     },
    //     //     id: "dots",
    //     //   },
    //     //   {
    //     //     match: {
    //     //       id: "sandwich",
    //     //     },
    //     //     id: "lines",
    //     //   },
    //     // ]}
    //     borderColor={{
    //       from: "color",
    //       modifiers: [["darker", 1.6]],
    //     }}
    //     axisTop={null}
    //     axisRight={null}
    //     axisBottom={{
    //       tickSize: 5,
    //       tickPadding: 5,
    //       tickRotation: 0,
    //       legend: "quiz",
    //       legendPosition: "middle",
    //       legendOffset: 32,
    //     }}
    //     axisLeft={{
    //       tickSize: 5,
    //       tickPadding: 5,
    //       tickRotation: 0,
    //       legend: "food",
    //       legendPosition: "middle",
    //       legendOffset: -40,
    //     }}
    //     labelSkipWidth={12}
    //     labelSkipHeight={12}
    //     labelTextColor={{
    //       from: "color",
    //       modifiers: [["darker", 1.6]],
    //     }}
    //     legends={[
    //       {
    //         dataFrom: "keys",
    //         anchor: "bottom-right",
    //         direction: "column",
    //         justify: false,
    //         translateX: 120,
    //         translateY: 0,
    //         itemsSpacing: 2,
    //         itemWidth: 100,
    //         itemHeight: 20,
    //         itemDirection: "left-to-right",
    //         itemOpacity: 0.85,
    //         symbolSize: 20,
    //         effects: [
    //           {
    //             on: "hover",
    //             style: {
    //               itemOpacity: 1,
    //             },
    //           },
    //         ],
    //       },
    //     ]}
    //     role="application"
    //     ariaLabel="Nivo bar chart demo"
    //     barAriaLabel={(e) =>
    //       e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    //     }
    //   />
    // </>
  );
};

export default NiveBarChart;
