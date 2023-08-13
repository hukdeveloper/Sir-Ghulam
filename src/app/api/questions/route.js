import { NextResponse } from "next/server";

import Question from "../../../models/Questions";
import connect from "../../../db/connect";

export async function POST(request) {
  const data = await request.json();

  const newQuiz = new Question(data);

  try {
    await connect();
    await newQuiz.save();
    return new NextResponse("Question added successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
export async function GET() {
  try {
    await connect();
    const questions = await Question.find({});
    // Shuffle the questions array using the Fisher-Yates algorithm
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    // Slice the first 5 elements of the shuffled array
    const data = questions.slice(0, 5);
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
