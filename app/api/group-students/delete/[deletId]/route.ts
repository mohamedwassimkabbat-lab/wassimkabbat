import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import GroupStudent from "@/models/group-student-model";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedStudent = await GroupStudent.findByIdAndDelete(id);

    if (!deletedStudent) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}