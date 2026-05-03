import { connectMongoose } from "@/utils/mongoose-client"
import Group from "@/models/group-model"
import GroupStudent from "@/models/group-student-model"
import { Types } from "mongoose"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params
  const selectedGroup = decodeURIComponent(groupId)

  await connectMongoose()

  const group = await Group.findOne(
    Types.ObjectId.isValid(selectedGroup)
      ? { _id: selectedGroup }
      : { name: selectedGroup },
  ).lean()

  const filterGroupId = group?._id.toString() ?? selectedGroup
  const students = await GroupStudent.find({
    $or: [{ groupId: filterGroupId }, { groupId: group?.name ?? selectedGroup }],
  }).lean()

  const data = students.map((student) => ({
    _id: student._id.toString(),
    firstName: student.firstName,
    lastName: student.lastName,
    groupId: student.groupId,
  }))

  return Response.json(data)
}
