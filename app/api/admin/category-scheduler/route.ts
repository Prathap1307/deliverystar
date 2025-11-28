import { NextResponse } from "next/server";
import { createSchedule, getCategorySchedules } from "@/lib/db/schedules";

export async function GET() {
  const schedules = await getCategorySchedules();
  return NextResponse.json(schedules);
}

export async function POST(request: Request) {
  const body = await request.json();
  await createSchedule(body);
  return NextResponse.json({ ok: true });
}
