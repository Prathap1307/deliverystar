import { NextResponse } from "next/server";

import {
  listAllOrders,
  listTodayOrders,
  updateOrderCharges,
  updateOrderItems,
  updateOrderStatus,
} from "@/lib/aws/dynamo";
import type { AdminOrder } from "@/lib/admin/orders";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope");

  const orders = scope === "today" ? await listTodayOrders() : await listAllOrders();

  return NextResponse.json({ data: orders });
}

export async function PUT(request: Request) {
  const payload = await request.json();
  const {
    id,
    status,
    items,
    customerPhone,
    deliveryLocation,
    deliveryCharge,
    tax,
    surcharge,
  } = payload as Partial<AdminOrder> & { id: string };

  if (!id) {
    return NextResponse.json({ error: "Missing order id" }, { status: 400 });
  }

  let updated: AdminOrder | null = null;

  if (status) {
    updated = (await updateOrderStatus(id, status)) ?? updated;
  }

  if (items || customerPhone !== undefined || deliveryLocation !== undefined) {
    updated =
      (await updateOrderItems(id, items ?? [], customerPhone, deliveryLocation)) ?? updated;
  }

  if (
    deliveryCharge !== undefined ||
    tax !== undefined ||
    surcharge !== undefined
  ) {
    updated =
      (await updateOrderCharges(id, Number(deliveryCharge ?? 0), Number(tax ?? 0), Number(surcharge ?? 0))) ??
      updated;
  }

  return NextResponse.json({ data: updated });
}
