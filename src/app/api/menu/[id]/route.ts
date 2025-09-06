import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Menu from "@/models/menu";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await req.json();
    const updated = await Menu.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updated)
      return NextResponse.json({ msg: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deleted = await Menu.findByIdAndDelete(params.id);
    if (!deleted)
      return NextResponse.json({ msg: "Not found" }, { status: 404 });
    return NextResponse.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Delete failed" }, { status: 500 });
  }
}
