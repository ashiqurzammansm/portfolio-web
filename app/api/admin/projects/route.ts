// app/api/admin/projects/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const project = await Project.create(data);
  return NextResponse.json(project);
}