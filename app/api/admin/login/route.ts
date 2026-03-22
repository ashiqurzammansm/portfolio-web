// app/api/admin/login/route.ts

import { NextResponse } from "next/server";
import { validateAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (validateAdmin(email, password)) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}