"use client"
import { useState } from "react"

export default function StudentList({ groups }: { groups: any[] }) {
  const [students, setStudents] = useState<any[]>([])

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this student?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/group-students/delete/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setStudents(students.filter((student) => student._id !== id))
      } else {
        alert("Failed to delete student.")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Dropdown Logic Here... */}

      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-orange-600 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4">First Name</th>
              <th className="px-6 py-4">Last Name</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{student.firstName}</td>
                <td className="px-6 py-4">{student.lastName}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-600 hover:text-white transition-all text-xs font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
