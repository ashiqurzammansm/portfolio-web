// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const newMessage = await Message.create({ name, email, message });

  return NextResponse.json({ success: true, data: newMessage });
}