import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Feedback from "@/models/feedback";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { studentId, message, rating } = await req.json();

    if (!rating || !message) {
      return NextResponse.json(
        { error: "Rating and message are required" },
        { status: 400 }
      );
    }

    const feedback = new Feedback({ studentId, message, rating });
    await feedback.save();

    return NextResponse.json(
      { msg: "Feedback submitted successfully", feedback },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Feedback API Error:", error);
    return NextResponse.json(
      { msg: errorMessage || "Internal Server Error" },
      { status: 500 }
    );
  }
}
