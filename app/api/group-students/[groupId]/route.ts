import { connectMongoose } from "@/utils/mongoose-client"
import GroupStudent from "@/models/group-student-model"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params
  const groupName = decodeURIComponent(groupId)

  await connectMongoose()

  const students = await GroupStudent.find({ groupId: groupName }).lean()

  const data = students.map((student) => ({
    _id: student._id.toString(),
    firstName: student.firstName,
    lastName: student.lastName,
    groupId: student.groupId,
  }))

  return Response.json(data)
}
