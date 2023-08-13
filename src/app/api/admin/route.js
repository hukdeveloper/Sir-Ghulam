import { NextResponse } from "next/server";

import Question from "../../../models/Questions";
import connect from "../../../db/connect";

export async function GET() {
  try {
    await connect();
    const questions = await Question.find();

    return new NextResponse(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
