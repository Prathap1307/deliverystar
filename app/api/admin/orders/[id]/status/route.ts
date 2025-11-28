import { NextResponse } from "next/server";

import { updateOrderStatus } from "@/lib/aws/dynamo";
import type { AdminOrderStatus } from "@/lib/admin/orders";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = (await request.json()) as { status?: AdminOrderStatus };
  if (!body.status) {
    return NextResponse.json({ message: "Missing status" }, { status: 400 });
  }

  const updated = await updateOrderStatus(params.id, body.status);
  if (!updated) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
