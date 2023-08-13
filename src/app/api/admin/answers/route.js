import { NextResponse } from "next/server";

import Answer from "../../../../models/Answer";

import connect from "../../../../db/connect";
import Question from "../../../../models/Questions";

export async function GET() {
  try {
    // Get all the questions from the Question table
    await connect();
    const questions = await Question.find({});

    // Define an empty array to store the output
    const output = [];

    // Loop through each question
    for (let question of questions) {
      // Get the question text and id
      const questionText = question.text;
      const questionId = question._id;

      // Define an object to store the question and answer count
      const questionAndAnswer = {
        id: questionId,
        question: questionText,
        Good: 0,
        Bad: 0,
        Neutral: 0,
        Excellent: 0,
        Perfect: 0,
      };

      // Find all the answers that match the question id in the response field
      const answers = await Answer.find({
        "response.questionId": questionId,
      });

      // Loop through each answer
      for (let answer of answers) {
        // Find the subdocument in the response field that matches the question id
        const response = answer.response.find((r) =>
          r.questionId.equals(questionId)
        );

        // Get the answer value
        const answerValue = response.answer;

        // Increment the count of the answer value in the questionAndAnswer object
        questionAndAnswer[answerValue]++;
      }

      // Push the questionAndAnswer object to the output array
      output.push(questionAndAnswer);
    }
    // console.log(output);
    // Return the output array as a JSON response
    return new NextResponse(JSON.stringify(output), { status: 200 });
  } catch (error) {
    // Handle any errors
    return new NextResponse("Database Error", { status: 500 });
  }
}
