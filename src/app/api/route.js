import { NextResponse } from "next/server";
import connect from "../../db/connect";
import Response from "../../models/Response";

export async function GET() {
  try {
    await connect();
    const dialogues = await Response.find();

    return new NextResponse(dialogues, { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
