import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Feedback from "@/models/feedback";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { studentId, message, rating } = await req.json();

    const feedback = new Feedback({ studentId, message, rating });
    await feedback.save();

    return NextResponse.json(
      { msg: "Feedback submitted successfully", feedback },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { msg: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
