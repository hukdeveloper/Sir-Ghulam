import { NextResponse } from "next/server";
import connect from "../../../db/connect";
import Answer from "../../../models/Answer";

export async function POST(request) {
  const { response } = await request.json();
  const userName = "ABC";
  const userEmail = "abc@gmail.com";
  try {
    await connect();

    if (!response) {
      return new NextResponse("Response is Empty!", { status: 400 });
    }
    const answer = new Answer({
      userName,
      userEmail,
      response: response.map((item) => ({
        questionId: item.questionId,
        answer: item.answer,
      })),
    });
    await answer.save();
    return new NextResponse("Response Submitted Successfully...", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
