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
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } =
      buildUpdateExpression(body);

    await dynamo.send(
      new UpdateCommand({
        TableName: TABLES.CATEGORIES,
        Key: { categoryId: params.id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
      })
    );

    return NextResponse.json({ categoryId: params.id });
  } catch (error) {
    console.error("Failed to update category", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: TABLES.CATEGORIES,
        Key: { categoryId: params.id },
      })
    );

    return NextResponse.json({ categoryId: params.id });
  } catch (error) {
    console.error("Failed to delete category", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
