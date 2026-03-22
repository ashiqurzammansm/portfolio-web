// app/api/admin/logout/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // expire immediately
    path: "/",
  });

  return response;
}