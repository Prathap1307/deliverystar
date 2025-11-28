import { NextResponse } from "next/server";
import { deleteSchedule, updateSchedule } from "@/lib/db/schedules";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateSchedule({ ...body, scheduleId: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteSchedule(params.id);
  return NextResponse.json({ ok: true });
}
