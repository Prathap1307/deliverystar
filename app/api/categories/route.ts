import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { Category } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { Items } = await dynamo.send(
      new ScanCommand({ TableName: TABLES.CATEGORIES })
    );
    return NextResponse.json(Items ?? []);
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category: Category = {
      categoryId: body.categoryId ?? randomUUID(),
      name: body.name,
      active: Boolean(body.active ?? true),
      schedule: body.schedule,
    };

    await dynamo.send(
      new PutCommand({
        TableName: TABLES.CATEGORIES,
        Item: category,
      })
    );

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create category", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
