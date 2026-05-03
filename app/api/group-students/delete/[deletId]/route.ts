import { NextRequest, NextResponse } from "next/server"
import { connectMongoose } from "@/utils/mongoose-client"
import GroupStudent from "@/models/group-student-model"

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ deletId: string }> },
) {
  try {
    await connectMongoose()
    const { deletId } = await params

    const deletedStudent = await GroupStudent.findByIdAndDelete(deletId)

    if (!deletedStudent) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Student deleted successfully" })
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 })
  }
}
