"use server"

import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signOutAction() {
  try {
    // With nextCookies plugin, cookies are au
    await auth.api.signOut({
      headers: await headers()
    })
  } catch (error) {
    console.error("Sign out error:", error)
  }

  redirect("/")
}