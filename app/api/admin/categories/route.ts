import { NextResponse } from "next/server";
import { createCategory, getCategories } from "@/lib/db/categories";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const category = await request.json();
  await createCategory(category);
  return NextResponse.json({ ok: true });
}
