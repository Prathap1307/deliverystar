import { DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { buildUpdateExpression } from "@/lib/db/updateExpression";
import { uploadImage } from "@/lib/storage/s3";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: { id: string };
}

async function maybeUploadImage(body: any): Promise<string | undefined> {
  if (!body.imageBase64) return body.imageUrl;
  if (!body.imageName || !body.imageMimeType) {
    throw new Error("Image name and mime type are required for uploads");
  }
  const buffer = Buffer.from(body.imageBase64, "base64");
  const key = `${Date.now()}-${body.imageName}`;
  return uploadImage(buffer, key, body.imageMimeType);
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const imageUrl = await maybeUploadImage(body);
    const updateData = { ...body, imageUrl };
    const { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues } =
      buildUpdateExpression(updateData);

    await dynamo.send(
      new UpdateCommand({
        TableName: TABLES.ITEMS,
        Key: { itemId: params.id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
      })
    );

    return NextResponse.json({ itemId: params.id, imageUrl });
  } catch (error) {
    console.error("Failed to update item", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: RouteParams) {
  try {
    await dynamo.send(
      new DeleteCommand({
        TableName: TABLES.ITEMS,
        Key: { itemId: params.id },
      })
    );

    return NextResponse.json({ itemId: params.id });
  } catch (error) {
    console.error("Failed to delete item", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
