import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Feedback from "@/models/feedback";

export async function GET() {
  try {
    // Connect to DB
    await connectDB();

    // Fetch all feedbacks
    const feedbacks = await Feedback.find();
    console.log("Fetched feedbacks:", feedbacks); // Debug: see what is returned

    // Map numeric ratings to labels for charts
    const ratingMap: { [key: number]: "Good" | "Average" | "Poor" } = {
      5: "Good",
      4: "Good",
      3: "Average",
      2: "Poor",
      1: "Poor",
    };

    // Count each category
    const counts = { Good: 0, Average: 0, Poor: 0 };
    feedbacks.forEach((f) => {
      const label = ratingMap[f.rating];
      if (label) counts[label]++;
    });

    const total = feedbacks.length || 1; // Avoid divide by zero

    // Prepare response data
    const feedbackData = [
      {
        name: "Good",
        value: Math.round((counts.Good / total) * 100),
        color: "#22c55e",
      },
      {
        name: "Average",
        value: Math.round((counts.Average / total) * 100),
        color: "#facc15",
      },
      {
        name: "Poor",
        value: Math.round((counts.Poor / total) * 100),
        color: "#ef4444",
      },
    ];

    const ratingStats = [
      {
        rating: "Good",
        count: counts.Good,
        percentage: Math.round((counts.Good / total) * 100),
      },
      {
        rating: "Average",
        count: counts.Average,
        percentage: Math.round((counts.Average / total) * 100),
      },
      {
        rating: "Poor",
        count: counts.Poor,
        percentage: Math.round((counts.Poor / total) * 100),
      },
    ];

    // Return JSON
    return NextResponse.json({ feedbackData, ratingStats });
  } catch (error) {
    console.error("Feedback Summary API Error:", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
