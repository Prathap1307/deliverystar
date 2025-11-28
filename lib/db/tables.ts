function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not configured`);
  }
  return value;
}

export const TABLES = {
  ORDERS: getEnv("DYNAMO_ORDERS_TABLE"),
  ITEMS: getEnv("DYNAMO_ITEMS_TABLE"),
  CATEGORIES: getEnv("DYNAMO_CATEGORIES_TABLE"),
  DELIVERY_CHARGES: getEnv("DYNAMO_DELIVERY_CHARGES_TABLE"),
  RADIUS: getEnv("DYNAMO_RADIUS_TABLE"),
  SURCHARGE: getEnv("DYNAMO_SURCHARGE_TABLE"),
};
