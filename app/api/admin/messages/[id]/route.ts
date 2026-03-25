// app/api/admin/messages/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const updated = await Message.findByIdAndUpdate(
    params.id,
    { isRead: true },
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Message.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}