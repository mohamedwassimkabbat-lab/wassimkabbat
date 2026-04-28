"use client"
import { useFormStatus } from "react-dom"
import { ui } from "@/components/certificates/ui"

export function SubmitButton(props: { name?: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      style={ui.submitButton}
    >
      {pending ? "Saving..." : props.name || "Add"}
    </button>
  )
}
