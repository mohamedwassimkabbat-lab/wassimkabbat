import { connectMongoose } from "@/utils/mongoose-client"
import Group from "@/models/group-model"
import GroupStudent from "@/models/group-student-model"
import StudentList from "@/components/students/student-list"

async function seedGroupStudents() {
  const groupNames = ["BIT-23", "PI-23", "WEB-23"]

  const groups = await Promise.all(
    groupNames.map((name) =>
      Group.findOneAndUpdate(
        { name },
        { $setOnInsert: { name } },
        { returnDocument: "after", upsert: true },
      ),
    ),
  )
  const studentCount = await GroupStudent.countDocuments()
  if (studentCount > 0) return

  const students = [
    {
      firstName: "Amina",
      lastName: "Haddad",
      groupId: groups[0]._id.toString(),
    },
    {
      firstName: "Karim",
      lastName: "Saad",
      groupId: groups[0]._id.toString(),
    },
    {
      firstName: "Lina",
      lastName: "Mansour",
      groupId: groups[0]._id.toString(),
    },
    {
      firstName: "Omar",
      lastName: "Khalil",
      groupId: groups[0]._id.toString(),
    },
    {
      firstName: "Maya",
      lastName: "Nassar",
      groupId: groups[1]._id.toString(),
    },
    {
      firstName: "Youssef",
      lastName: "Darwish",
      groupId: groups[1]._id.toString(),
    },
    {
      firstName: "Sara",
      lastName: "Saleh",
      groupId: groups[1]._id.toString(),
    },
    { firstName: "Nour", lastName: "Farah", groupId: groups[2]._id.toString() },
    { firstName: "Adam", lastName: "Tannous", groupId: groups[2]._id.toString() },
    { firstName: "Rita", lastName: "Khoury", groupId: groups[2]._id.toString() },
  ]

  await GroupStudent.insertMany(students)
}

export default async function GroupStudentsPage() {
  await connectMongoose()
  await seedGroupStudents()

  const groupsRaw = await Group.find({}).lean()

  const groups = groupsRaw.map((g: any) => ({
    _id: g._id.toString(),
    name: g.name,
  }))

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-orange-800 mb-2">
        Group Students
      </h1>
      <p className="text-gray-600 mb-10">
        Official group reporting and registration list.
      </p>

      <StudentList groups={groups} />
    </div>
  )
}
