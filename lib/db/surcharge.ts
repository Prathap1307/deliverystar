import { DeleteCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, tables } from "@/lib/aws/client";
import { Surcharge } from "@/types/surcharge";

export async function getSurcharges() {
  const result = await docClient.send(new ScanCommand({ TableName: tables.surcharge }));
  return (result.Items as Surcharge[]) || [];
}

export async function createSurcharge(surcharge: Surcharge) {
  await docClient.send(new PutCommand({ TableName: tables.surcharge, Item: surcharge }));
}

export async function updateSurcharge(surcharge: Surcharge) {
  await docClient.send(
    new UpdateCommand({
      TableName: tables.surcharge,
      Key: { surchargeId: surcharge.surchargeId },
      UpdateExpression: "set reason = :reason, price = :price, active = :active",
      ExpressionAttributeValues: {
        ":reason": surcharge.reason,
        ":price": surcharge.price,
        ":active": surcharge.active,
      },
    })
  );
}

export async function deleteSurcharge(surchargeId: string) {
  await docClient.send(new DeleteCommand({ TableName: tables.surcharge, Key: { surchargeId } }));
}
