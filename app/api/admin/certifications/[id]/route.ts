// app/api/admin/certifications/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();

  const updated = await Certification.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Certification.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}