import { NextResponse } from "next/server";

import {
  deleteAdminCategory,
  listAdminCategories,
  saveAdminCategory,
} from "@/lib/admin/catalog";

export async function GET() {
  const categories = await listAdminCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const payload = await request.json();
  const saved = await saveAdminCategory(payload);
  return NextResponse.json(saved);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (id) {
    await deleteAdminCategory(id);
  }
  return NextResponse.json({ ok: true });
}
