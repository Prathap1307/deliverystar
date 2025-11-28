import {
  DynamoDBClient,
  type DynamoDBClientConfig,
} from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import type { AdminOrder, AdminOrderItem, AdminOrderStatus } from "../admin/orders";

function getClient() {
  const config: DynamoDBClientConfig = {
    region: process.env.AWS_REGION,
  };

  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }

  return new DynamoDBClient(config);
}

const TABLE_NAME = process.env.AWS_DDB_ORDERS_TABLE || "";

function fromDynamoOrder(item: Record<string, any>): AdminOrder {
  return {
    id: item.orderId,
    customerName: item.customerName,
    customerEmail: item.customerEmail,
    customerPhone: item.customerPhone,
    restaurantName: item.restaurantName,
    instorePickup: Boolean(item.instorePickup),
    pickupLocation: item.pickupLocation,
    deliveryLocation: item.deliveryLocation,
    items: (item.items || []).map((entry: AdminOrderItem) => ({
      id: entry.id,
      name: entry.name,
      qty: Number(entry.qty),
      price: Number(entry.price),
    })),
    deliveryCharge: Number(item.deliveryCharge || 0),
    tax: Number(item.tax || 0),
    surcharge: Number(item.surcharge || 0),
    status: item.status as AdminOrderStatus,
    createdAt: item.createdAt,
  };
}

export async function getOrderById(orderId: string): Promise<AdminOrder | null> {
  if (!TABLE_NAME) return null;
  const client = getClient();
  const response = await client.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { orderId },
    }),
  );

  return response.Item ? fromDynamoOrder(response.Item) : null;
}

export async function listAllOrders(): Promise<AdminOrder[]> {
  if (!TABLE_NAME) return [];
  const client = getClient();
  const response = await client.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    }),
  );

  return (response.Items || []).map(fromDynamoOrder);
}

export async function listTodayOrders(): Promise<AdminOrder[]> {
  if (!TABLE_NAME) return [];
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const client = getClient();
  const response = await client.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: "createdAt BETWEEN :start AND :end",
      ExpressionAttributeValues: {
        ":start": start.toISOString(),
        ":end": end.toISOString(),
      },
    }),
  );

  return (response.Items || []).map(fromDynamoOrder);
}

export async function updateOrderStatus(orderId: string, status: AdminOrderStatus) {
  if (!TABLE_NAME) return null;
  const client = getClient();
  const response = await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { orderId },
      UpdateExpression: "SET #status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": status,
      },
      ReturnValues: "ALL_NEW",
    }),
  );

  return response.Attributes ? fromDynamoOrder(response.Attributes) : null;
}

export async function updateOrderItems(
  orderId: string,
  items: AdminOrderItem[],
  customerPhone?: string,
  deliveryLocation?: string,
) {
  if (!TABLE_NAME) return null;
  const client = getClient();
  const response = await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { orderId },
      UpdateExpression:
        "SET #items = :items, customerPhone = :phone, deliveryLocation = :deliveryLocation",
      ExpressionAttributeNames: {
        "#items": "items",
      },
      ExpressionAttributeValues: {
        ":items": items,
        ":phone": customerPhone,
        ":deliveryLocation": deliveryLocation,
      },
      ReturnValues: "ALL_NEW",
    }),
  );

  return response.Attributes ? fromDynamoOrder(response.Attributes) : null;
}

export async function updateOrderCharges(
  orderId: string,
  deliveryCharge: number,
  tax: number,
  surcharge: number,
) {
  if (!TABLE_NAME) return null;
  const client = getClient();
  const response = await client.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { orderId },
      UpdateExpression: "SET deliveryCharge = :deliveryCharge, tax = :tax, surcharge = :surcharge",
      ExpressionAttributeValues: {
        ":deliveryCharge": deliveryCharge,
        ":tax": tax,
        ":surcharge": surcharge,
      },
      ReturnValues: "ALL_NEW",
    }),
  );

  return response.Attributes ? fromDynamoOrder(response.Attributes) : null;
}
