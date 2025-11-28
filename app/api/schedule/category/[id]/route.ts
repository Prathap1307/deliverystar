import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { dynamo } from "@/lib/db/client";
import { TABLES } from "@/lib/db/tables";
import { Schedule } from "@/types";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const schedule = (await request.json()) as Schedule;

    await dynamo.send(
      new UpdateCommand({
        TableName: TABLES.CATEGORIES,
        Key: { categoryId: params.id },
        UpdateExpression: "SET #schedule = :schedule",
        ExpressionAttributeNames: {
          "#schedule": "schedule",
        },
        ExpressionAttributeValues: {
          ":schedule": schedule,
        },
      })
    );

    return NextResponse.json({ categoryId: params.id, schedule });
  } catch (error) {
    console.error("Failed to update category schedule", error);
    return NextResponse.json(
      { error: "Failed to update category schedule" },
      { status: 500 }
    );
  }
}
