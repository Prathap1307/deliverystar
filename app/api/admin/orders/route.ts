import { NextResponse } from "next/server";
import { getAllOrders, getTodayOrders, saveOrder } from "@/lib/db/orders";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const today = url.searchParams.get("today");
  const orders = today ? await getTodayOrders() : await getAllOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const order = await request.json();
  await saveOrder(order);
  return NextResponse.json({ ok: true });
}
