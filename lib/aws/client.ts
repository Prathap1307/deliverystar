import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION;
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

export const dynamoClient = new DynamoDBClient({
  region,
  credentials,
});

export const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const s3Client = new S3Client({
  region,
  credentials,
});

export const tables = {
  orders: process.env.AWS_DYNAMODB_TABLE_ORDERS || "",
  items: process.env.AWS_DYNAMODB_TABLE_ITEMS || "",
  categories: process.env.AWS_DYNAMODB_TABLE_CATEGORIES || "",
  schedules: process.env.AWS_DYNAMODB_TABLE_SCHEDULES || "",
  deliveryCharges: process.env.AWS_DYNAMODB_TABLE_DELIVERY_CHARGES || "",
  radius: process.env.AWS_DYNAMODB_TABLE_RADIUS || "",
  surcharge: process.env.AWS_DYNAMODB_TABLE_SURCHARGE || "",
};
