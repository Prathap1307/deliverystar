import { NextResponse } from "next/server";
import { deleteCategory, toggleCategoryActive, updateCategory } from "@/lib/db/categories";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await updateCategory({ ...body, categoryId: params.id });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  await toggleCategoryActive(params.id, body.active);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteCategory(params.id);
  return NextResponse.json({ ok: true });
}
