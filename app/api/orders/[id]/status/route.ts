import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { OrderStatus } from "@/types";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { status } = (await request.json()) as { status: OrderStatus };
    const updatedAt = new Date().toISOString();

    await dynamo.send(
      new UpdateCommand({
        TableName: TABLES.ORDERS,
        Key: { orderId: params.id },
        UpdateExpression: "SET #status = :status, #updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#status": "status",
          "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
          ":status": status,
          ":updatedAt": updatedAt,
        },
      })
    );

    return NextResponse.json({ orderId: params.id, status, updatedAt });
  } catch (error) {
    console.error("Failed to update order status", error);
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
