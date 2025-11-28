import { NextResponse } from "next/server";

import { updateOrderCharges } from "@/lib/aws/dynamo";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = (await request.json()) as {
    deliveryCharge?: number;
    tax?: number;
    surcharge?: number;
  };

  if (body.deliveryCharge === undefined || body.tax === undefined || body.surcharge === undefined) {
    return NextResponse.json({ message: "Missing charges" }, { status: 400 });
  }

  const updated = await updateOrderCharges(params.id, Number(body.deliveryCharge), Number(body.tax), Number(body.surcharge));
  if (!updated) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
