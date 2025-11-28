import { NextResponse } from "next/server";
import { deleteSurcharge, updateSurcharge } from "@/lib/db/surcharge";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateSurcharge({ ...body, surchargeId: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteSurcharge(params.id);
  return NextResponse.json({ ok: true });
}
