import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/utils/auth"
import { Role } from "./constants/role"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin/* segment
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user.role !== Role.Administrator) {
    // throw error
    throw new Error("You do not have permission to access this page.")
    //const url = new URL("/signin", request.url)
  }

  return NextResponse.next()
}
