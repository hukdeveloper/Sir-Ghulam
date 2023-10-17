import { NextResponse } from "next/server";
import connect from "../../../../../db/connect";
import Response from "../../../../../models/Response";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connect();
    const dialog = await Response.findById(id);
    if (!dialog) {
      return new NextResponse("Dialog not found!", { status: 404 });
    } else {
      // Ensure dialog.answers is an array
      if (!Array.isArray(dialog.answers)) {
        return new NextResponse("Invalid data format", { status: 500 });
      }

      const transformedData = dialog.answers.map((feedback, index) => {
        const feedbackCounts = {
          "Not at all": 0,
          "Not at allColor": "hsl(35, 70%, 50%)",
          Moderately: 0,
          ModeratelyColor: "hsl(304, 70%, 50%)",
          Somewhat: 0,
          SomewhatColor: "hsl(255, 70%, 50%)",
          "Very well": 0,
          "Very wellColor": "hsl(174, 70%, 50%)",
          "Extremely well": 0,
          "Extremely wellColor": "hsl(144, 70%, 50%)",
        };

        // Count the feedback responses for each question
        feedback.feedback.forEach((response) => {
          feedbackCounts[response]++;
        });

        return {
          quiz: `Question ${index + 1}`,
          ...feedbackCounts,
        };
      });

      return new NextResponse(JSON.stringify(transformedData), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
