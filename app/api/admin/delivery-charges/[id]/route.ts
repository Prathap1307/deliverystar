import { NextResponse } from "next/server";
import { deleteRule, updateRule } from "@/lib/db/deliveryCharges";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateRule({ ...body, ruleId: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteRule(params.id);
  return NextResponse.json({ ok: true });
}
