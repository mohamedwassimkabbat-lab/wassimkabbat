"use client"
import { useState } from "react"

interface IGroup {
  _id: string
  name: string
}

interface IStudent {
  _id: string
  firstName: string
  lastName: string
  groupId: string
}

export default function StudentList({ groups }: { groups: IGroup[] }) {
  const [selectedGroupId, setSelectedGroupId] = useState("")
  const [students, setStudents] = useState<IStudent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGroupClick = async (groupId: string) => {
    setSelectedGroupId(groupId)
    setError("")

    if (!groupId) {
      setStudents([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/group-students/${groupId}`)

      if (!response.ok) {
        throw new Error("Failed to load students")
      }

      const data: IStudent[] = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Error:", error)
      setStudents([])
      setError("Failed to load students for this group.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this student?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/group-students/delete/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setStudents((currentStudents) =>
          currentStudents.filter((student) => student._id !== id),
        )
      } else {
        alert("Failed to delete student.")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-sm">
        <label
          htmlFor="group-select"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Select group
        </label>
        <select
          id="group-select"
          value={selectedGroupId}
          onChange={(event) => handleGroupClick(event.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-200"
        >
          <option value="">Choose a group</option>
          {groups.map((group) => (
            <option key={group._id} value={group._id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

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
            {isLoading && (
              <tr>
                <td className="px-6 py-6 text-gray-500" colSpan={3}>
                  Loading students...
                </td>
              </tr>
            )}

            {!isLoading && selectedGroupId && students.length === 0 && (
              <tr>
                <td className="px-6 py-6 text-gray-500" colSpan={3}>
                  No students found for this group.
                </td>
              </tr>
            )}

            {!isLoading && !selectedGroupId && (
              <tr>
                <td className="px-6 py-6 text-gray-500" colSpan={3}>
                  Select a group to view students.
                </td>
              </tr>
            )}

            {!isLoading && students.map((student) => (
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
