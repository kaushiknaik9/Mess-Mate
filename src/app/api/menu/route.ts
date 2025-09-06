import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Menu from "@/models/menu";

export async function GET() {
  await dbConnect();
  try {
    const menu = await Menu.find().sort({ mealType: 1, name: 1 });
    return NextResponse.json({ menu });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Failed to fetch menu" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const newItem = await Menu.create(body);
    return NextResponse.json(newItem);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Failed to add item" }, { status: 500 });
  }
}
