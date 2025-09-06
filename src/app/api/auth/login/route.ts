import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { id, password, type } = await req.json();

  // Admin
  if (type === "admin") {
    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASS) {
      const token = jwt.sign({ id, type: "admin" }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });
      return NextResponse.json({ token, type: "admin" });
    }
    return NextResponse.json(
      { msg: "Invalid admin credentials" },
      { status: 401 }
    );
  }

  // Student
  if (type === "student") {
    const match = id.match(/^ABC(\d{3})$/);
    if (!match)
      return NextResponse.json({ msg: "Invalid student ID" }, { status: 400 });
    const num = parseInt(match[1], 10);
    if (num < 1 || num > 100)
      return NextResponse.json({ msg: "Student not allowed" }, { status: 401 });
    const expectedPassword = match[1] + match[1];
    if (password !== expectedPassword)
      return NextResponse.json({ msg: "Invalid password" }, { status: 401 });

    const token = jwt.sign({ id, type: "student" }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    return NextResponse.json({ token, type: "student" });
  }

  return NextResponse.json({ msg: "Invalid login type" }, { status: 400 });
}
