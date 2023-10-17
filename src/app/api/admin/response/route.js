import { NextResponse } from "next/server";
import connect from "../../../../db/connect";
import Response from "../../../../models/Response";

export async function GET() {
  try {
    await connect();
    const dialogues = await Response.find().populate("answers.quiz");

    const formattedDialogues = dialogues.map((dialogue) => {
      const formattedQuizFeedbacks = dialogue.answers.map((answer) => {
        const feedbackCounts = {
          "Not at all": 0,
          Somewhat: 0,
          Moderately: 0,
          "Very well": 0,
          "Extremely well": 0,
        };

        // Find the corresponding quiz for the answer
        const quiz = answer.quiz;

        // If the quiz has feedback, count the feedbacks
        if (quiz && answer.feedback && answer.feedback.length > 0) {
          answer.feedback.forEach((feedback) => {
            if (feedbackCounts.hasOwnProperty(feedback)) {
              feedbackCounts[feedback]++;
            }
          });
        }

        return {
          quiz: quiz.question,
          result: feedbackCounts,
        };
      });

      return {
        _id: dialogue._id,
        name: dialogue.name,
        quizFeedbacks: formattedQuizFeedbacks,
      };
    });

    const data = {
      dialogues: formattedDialogues,
    };

    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
