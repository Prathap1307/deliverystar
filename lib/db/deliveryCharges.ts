import { DeleteCommand, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, tables } from "@/lib/aws/client";
import { DeliveryChargeRule } from "@/types/deliveryCharges";

export async function getDeliveryRules() {
  const result = await docClient.send(new ScanCommand({ TableName: tables.deliveryCharges }));
  return (result.Items as DeliveryChargeRule[]) || [];
}

export async function createRule(rule: DeliveryChargeRule) {
  await docClient.send(new PutCommand({ TableName: tables.deliveryCharges, Item: rule }));
}

export async function updateRule(rule: DeliveryChargeRule) {
  await docClient.send(
    new UpdateCommand({
      TableName: tables.deliveryCharges,
      Key: { ruleId: rule.ruleId },
      UpdateExpression:
        "set milesStart = :milesStart, milesEnd = :milesEnd, price = :price, timeStart = :timeStart, timeEnd = :timeEnd, active = :active",
      ExpressionAttributeValues: {
        ":milesStart": rule.milesStart,
        ":milesEnd": rule.milesEnd,
        ":price": rule.price,
        ":timeStart": rule.timeStart,
        ":timeEnd": rule.timeEnd,
        ":active": rule.active,
      },
    })
  );
}

export async function deleteRule(ruleId: string) {
  await docClient.send(new DeleteCommand({ TableName: tables.deliveryCharges, Key: { ruleId } }));
}
