// app/api/admin/projects/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await req.json();

  const updated = await Project.findByIdAndUpdate(params.id, data, {
    new: true,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Project.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}