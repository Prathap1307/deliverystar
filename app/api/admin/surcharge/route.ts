import { NextResponse } from "next/server";
import { createSurcharge, getSurcharges } from "@/lib/db/surcharge";

export async function GET() {
  const surcharges = await getSurcharges();
  return NextResponse.json(surcharges);
}

export async function POST(request: Request) {
  const body = await request.json();
  await createSurcharge(body);
  return NextResponse.json({ ok: true });
}
