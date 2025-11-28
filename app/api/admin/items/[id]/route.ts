import { NextResponse } from "next/server";
import { deleteItem, updateItem } from "@/lib/db/items";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateItem({ ...body, itemId: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteItem(params.id);
  return NextResponse.json({ ok: true });
}
