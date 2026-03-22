// app/api/admin/certifications/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";

export async function GET() {
  await connectDB();
  const data = await Certification.find().sort({ createdAt: -1 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const created = await Certification.create(body);
  return NextResponse.json(created);
}