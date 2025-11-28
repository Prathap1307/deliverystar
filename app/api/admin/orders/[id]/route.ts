import { NextResponse } from "next/server";
import {
  deleteOrder,
  getOrderById,
  updateOrderAddress,
  updateOrderItems,
} from "@/lib/db/orders";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  if (body.items) {
    await updateOrderItems(params.id, body.items);
  }
  if (body.address) {
    await updateOrderAddress(params.id, body.address);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deleteOrder(params.id);
  return NextResponse.json({ ok: true });
}
