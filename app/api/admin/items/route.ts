import { NextResponse } from "next/server";
import { createItem, getAllItems } from "@/lib/db/items";

export async function GET() {
  const items = await getAllItems();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const item = await request.json();
  await createItem(item);
  return NextResponse.json({ ok: true });
}
