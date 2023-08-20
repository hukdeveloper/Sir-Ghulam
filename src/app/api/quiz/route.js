import { NextResponse } from "next/server";
import connect from "../../../db/connect";
import Quiz from "../../../models/Quiz";

export async function POST(request) {
  const { question } = await request.json();

  try {
    await connect();
    const quiz = new Quiz({ question });

    await quiz.save();

    return new NextResponse(quiz, {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error, { status: 404 });
  }
}

export async function GET() {
  try {
    await connect();
    const quizs = await Quiz.find();
    return new NextResponse(quizs, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, { status: 404 });
  }
}
