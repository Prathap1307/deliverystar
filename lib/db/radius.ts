import { DeleteCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, tables } from "@/lib/aws/client";
import { RadiusRule } from "@/types/radius";

export async function getAllRadiusZones() {
  const result = await docClient.send(new ScanCommand({ TableName: tables.radius }));
  return (result.Items as RadiusRule[]) || [];
}

export async function createRadiusZone(rule: RadiusRule) {
  await docClient.send(new PutCommand({ TableName: tables.radius, Item: rule }));
}

export async function updateRadiusZone(rule: RadiusRule) {
  await docClient.send(
    new UpdateCommand({
      TableName: tables.radius,
      Key: { radiusId: rule.radiusId },
      UpdateExpression:
        "set centerLatitude = :centerLatitude, centerLongitude = :centerLongitude, radiusMiles = :radiusMiles, #name = :name, active = :active",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {
        ":centerLatitude": rule.centerLatitude,
        ":centerLongitude": rule.centerLongitude,
        ":radiusMiles": rule.radiusMiles,
        ":name": rule.name,
        ":active": rule.active,
      },
    })
  );
}

export async function deleteRadiusZone(radiusId: string) {
  await docClient.send(new DeleteCommand({ TableName: tables.radius, Key: { radiusId } }));
}
