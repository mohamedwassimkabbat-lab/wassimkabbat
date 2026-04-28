import { connectMongoose } from "@/utils/mongoose-client"
import Group from "@/models/group-model"
import StudentList from "@/components/students/student-list"

export default async function GroupStudentsPage() {
  await connectMongoose()

  const groupsRaw = await Group.find({}).lean()

  const groups = groupsRaw.map((g: any) => ({
    _id: g._id.toString(),
    name: g.name,
  }))

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-orange-800 mb-2">
        Student Directory
      </h1>
      <p className="text-gray-600 mb-10">
        Official group reporting and registration list.
      </p>

      <StudentList groups={groups} />
    </div>
  )
}
