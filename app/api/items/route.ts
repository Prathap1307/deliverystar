import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { uploadImage } from "@/lib/storage/s3";
import { Item } from "@/types";

export const dynamic = "force-dynamic";

async function handleImageUpload(body: any): Promise<string | undefined> {
  if (!body.imageBase64) return body.imageUrl;
  if (!body.imageName || !body.imageMimeType) {
    throw new Error("Image name and mime type are required for uploads");
  }

  const buffer = Buffer.from(body.imageBase64, "base64");
  const key = `${Date.now()}-${body.imageName}`;
  return uploadImage(buffer, key, body.imageMimeType);
}

export async function GET() {
  try {
    const { Items } = await dynamo.send(
      new ScanCommand({ TableName: TABLES.ITEMS })
    );
    return NextResponse.json(Items ?? []);
  } catch (error) {
    console.error("Failed to fetch items", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const imageUrl = await handleImageUpload(body);
    const item: Item = {
      itemId: body.itemId ?? randomUUID(),
      name: body.name,
      categoryId: body.categoryId,
      price: Number(body.price ?? 0),
      vegType: body.vegType,
      ageRestricted: Boolean(body.ageRestricted),
      active: Boolean(body.active ?? true),
      schedule: body.schedule,
      imageUrl,
    };

    await dynamo.send(
      new PutCommand({
        TableName: TABLES.ITEMS,
        Item: item,
      })
    );

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create item", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
