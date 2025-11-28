import { ScanCommand, UpdateCommand, DeleteCommand, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { getItemImageUrl } from "../aws/s3";

export type DietType = "Veg" | "Vegan" | "Non-Veg";

export interface AdminItem {
  id: string;
  name: string;
  price: number;
  category: string;
  active: boolean;
  ageRestricted: boolean;
  diet?: DietType;
  imageKey?: string;
  imageUrl?: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  active: boolean;
  reason?: string;
  reactivateOn?: string;
}

export interface DeliveryChargeRule {
  id: string;
  miles: string;
  price: string;
  timeWindow?: string;
}

export interface RadiusZone {
  id: string;
  name: string;
  lat: string;
  lng: string;
  radius: string;
}

export interface SurchargeRule {
  id: string;
  reason: string;
  price: string;
}

export interface SchedulerSelection {
  ids: string[];
}

type AdminSettingKey =
  | "delivery-charges"
  | "radius-zones"
  | "surcharge-rules"
  | "item-schedule"
  | "category-schedule";

function getClient() {
  const config: DynamoDBClientConfig = { region: process.env.AWS_REGION };
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }
  return new DynamoDBClient(config);
}

const ITEMS_TABLE = process.env.AWS_DDB_ADMIN_ITEMS_TABLE || "";
const CATEGORIES_TABLE = process.env.AWS_DDB_ADMIN_CATEGORIES_TABLE || "";
const SETTINGS_TABLE = process.env.AWS_DDB_ADMIN_SETTINGS_TABLE || "";

export async function listAdminItems(): Promise<AdminItem[]> {
  if (!ITEMS_TABLE) return [];
  const client = getClient();
  const response = await client.send(
    new ScanCommand({
      TableName: ITEMS_TABLE,
    }),
  );

  const items = (response.Items || []).map((item) => ({
    id: item.id as string,
    name: item.name as string,
    price: Number(item.price ?? 0),
    category: (item.category as string) || "",
    active: Boolean(item.active),
    ageRestricted: Boolean(item.ageRestricted),
    diet: item.diet as DietType | undefined,
    imageKey: item.imageKey as string | undefined,
  }));

  const withImages = await Promise.all(
    items.map(async (item) => {
      if (!item.imageKey) return item;
      const imageUrl = await getItemImageUrl(item.imageKey);
      return { ...item, imageUrl };
    }),
  );

  return withImages;
}

export async function saveAdminItem(item: AdminItem) {
  if (!ITEMS_TABLE) return item;
  const client = getClient();
  await client.send(
    new PutCommand({
      TableName: ITEMS_TABLE,
      Item: {
        ...item,
      },
    }),
  );
  return item;
}

export async function deleteAdminItem(id: string) {
  if (!ITEMS_TABLE) return;
  const client = getClient();
  await client.send(
    new DeleteCommand({
      TableName: ITEMS_TABLE,
      Key: { id },
    }),
  );
}

export async function listAdminCategories(): Promise<AdminCategory[]> {
  if (!CATEGORIES_TABLE) return [];
  const client = getClient();
  const response = await client.send(
    new ScanCommand({
      TableName: CATEGORIES_TABLE,
    }),
  );

  return (response.Items || []).map((item) => ({
    id: item.id as string,
    name: item.name as string,
    active: Boolean(item.active),
    reason: item.reason as string | undefined,
    reactivateOn: item.reactivateOn as string | undefined,
  }));
}

export async function saveAdminCategory(category: AdminCategory) {
  if (!CATEGORIES_TABLE) return category;
  const client = getClient();
  await client.send(
    new PutCommand({
      TableName: CATEGORIES_TABLE,
      Item: {
        ...category,
      },
    }),
  );
  return category;
}

export async function deleteAdminCategory(id: string) {
  if (!CATEGORIES_TABLE) return;
  const client = getClient();
  await client.send(
    new DeleteCommand({
      TableName: CATEGORIES_TABLE,
      Key: { id },
    }),
  );
}

async function getSetting<T>(key: AdminSettingKey, fallback: T): Promise<T> {
  if (!SETTINGS_TABLE) return fallback;
  const client = getClient();
  const response = await client.send(
    new GetCommand({
      TableName: SETTINGS_TABLE,
      Key: { configKey: key },
    }),
  );

  if (!response.Item) return fallback;
  return (response.Item.payload as T) ?? fallback;
}

async function saveSetting<T>(key: AdminSettingKey, payload: T): Promise<T> {
  if (!SETTINGS_TABLE) return payload;
  const client = getClient();
  await client.send(
    new UpdateCommand({
      TableName: SETTINGS_TABLE,
      Key: { configKey: key },
      UpdateExpression: "SET payload = :payload",
      ExpressionAttributeValues: {
        ":payload": payload,
      },
    }),
  );
  return payload;
}

export async function getDeliveryChargeRules(): Promise<DeliveryChargeRule[]> {
  return getSetting<DeliveryChargeRule[]>("delivery-charges", []);
}

export async function saveDeliveryChargeRules(rules: DeliveryChargeRule[]) {
  return saveSetting("delivery-charges", rules);
}

export async function getRadiusZones(): Promise<RadiusZone[]> {
  return getSetting<RadiusZone[]>("radius-zones", []);
}

export async function saveRadiusZones(zones: RadiusZone[]) {
  return saveSetting("radius-zones", zones);
}

export async function getSurchargeRules(): Promise<SurchargeRule[]> {
  return getSetting<SurchargeRule[]>("surcharge-rules", []);
}

export async function saveSurchargeRules(rules: SurchargeRule[]) {
  return saveSetting("surcharge-rules", rules);
}

export async function getItemSchedulerSelection(): Promise<SchedulerSelection> {
  return getSetting<SchedulerSelection>("item-schedule", { ids: [] });
}

export async function saveItemSchedulerSelection(selection: SchedulerSelection) {
  return saveSetting("item-schedule", selection);
}

export async function getCategorySchedulerSelection(): Promise<SchedulerSelection> {
  return getSetting<SchedulerSelection>("category-schedule", { ids: [] });
}

export async function saveCategorySchedulerSelection(selection: SchedulerSelection) {
  return saveSetting("category-schedule", selection);
}
