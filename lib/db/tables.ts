import { tables } from "@/lib/aws/client";

function requireTable(key: keyof typeof tables, value: string) {
  if (!value) {
    throw new Error(`AWS table name for ${key} is not configured`);
  }
  return value;
}

export const TABLES = {
  ORDERS: requireTable("orders", tables.orders),
  ITEMS: requireTable("items", tables.items),
  CATEGORIES: requireTable("categories", tables.categories),
  DELIVERY_CHARGES: requireTable("deliveryCharges", tables.deliveryCharges),
  RADIUS: requireTable("radius", tables.radius),
  SURCHARGE: requireTable("surcharge", tables.surcharge),
};
