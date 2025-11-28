import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { Order, OrderStatus } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { Items } = await dynamo.send(
      new ScanCommand({ TableName: TABLES.ORDERS })
    );
    return NextResponse.json(Items ?? []);
  } catch (error) {
    console.error("Failed to fetch orders", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();
    const order: Order = {
      orderId: body.orderId ?? randomUUID(),
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerEmail: body.customerEmail,
      restaurantName: body.restaurantName,
      instorePickup: Boolean(body.instorePickup),
      pickupLocation: body.pickupLocation,
      dropLocation: body.dropLocation,
      items: body.items ?? [],
      orderTotal: Number(body.orderTotal ?? 0),
      deliveryCharge: Number(body.deliveryCharge ?? 0),
      surcharge: Number(body.surcharge ?? 0),
      tax: Number(body.tax ?? 0),
      status: (body.status as OrderStatus) ?? "pending",
      createdAt: now,
      updatedAt: now,
    };

    await dynamo.send(
      new PutCommand({
        TableName: TABLES.ORDERS,
        Item: order,
      })
    );

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Failed to create order", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
