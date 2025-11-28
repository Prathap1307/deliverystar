import { DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { buildUpdateExpression } from "@/lib/db/updateExpression";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const updatedAt = new Date().toISOString();
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } =
      buildUpdateExpression({ ...body, updatedAt });

    await dynamo.send(
      new UpdateCommand({
        TableName: TABLES.ORDERS,
        Key: { orderId: params.id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
      })
    );

    return NextResponse.json({ orderId: params.id, updatedAt });
  } catch (error) {
    console.error("Failed to update order", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: TABLES.ORDERS,
        Key: { orderId: params.id },
      })
    );

    return NextResponse.json({ orderId: params.id });
  } catch (error) {
    console.error("Failed to delete order", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
