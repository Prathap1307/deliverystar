import { NextResponse } from "next/server";
import { deleteRadiusZone, updateRadiusZone } from "@/lib/db/radius";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateRadiusZone({ ...body, radiusId: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteRadiusZone(params.id);
  return NextResponse.json({ ok: true });
}
