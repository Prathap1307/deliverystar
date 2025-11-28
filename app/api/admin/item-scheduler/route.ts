import { NextResponse } from "next/server";
import { createSchedule, getItemSchedules } from "@/lib/db/schedules";

export async function GET() {
  const schedules = await getItemSchedules();
  return NextResponse.json(schedules);
}

export async function POST(request: Request) {
  const body = await request.json();
  await createSchedule(body);
  return NextResponse.json({ ok: true });
}
