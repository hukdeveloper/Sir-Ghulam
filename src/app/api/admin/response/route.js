import { NextResponse } from "next/server";
import connect from "../../../../db/connect";
import Response from "../../../../models/Response";

export async function POST(request) {
  const { dialog } = await request.json();
  const result = JSON.stringify(dialog);

  try {
    await connect();
    const response = new Response({ dialog: result });
    await response.save();
    return new NextResponse(response, {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function PATCH(request) {
  const {dialog} = req.json()
  const result = JSON.stringify(dialog);
  await connect() ;

  try {
   
   const dialogExist = Response.findOne()

    return new NextResponse("Submitted", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
