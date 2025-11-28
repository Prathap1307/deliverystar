import { NextResponse } from "next/server";

import { deleteAdminItem, listAdminItems, saveAdminItem } from "@/lib/admin/catalog";

export async function GET() {
  const items = await listAdminItems();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const saved = await saveAdminItem(payload);
  return NextResponse.json(saved);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (id) {
    await deleteAdminItem(id);
  }
  return NextResponse.json({ ok: true });
}
