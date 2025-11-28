import { NextResponse } from "next/server";

import {
  getCategorySchedulerSelection,
  getDeliveryChargeRules,
  getItemSchedulerSelection,
  getRadiusZones,
  getSurchargeRules,
  saveCategorySchedulerSelection,
  saveDeliveryChargeRules,
  saveItemSchedulerSelection,
  saveRadiusZones,
  saveSurchargeRules,
} from "@/lib/admin/catalog";

type SettingKey =
  | "delivery-charges"
  | "radius-zones"
  | "surcharge-rules"
  | "item-schedule"
  | "category-schedule";

async function getByKey(key: SettingKey) {
  switch (key) {
    case "delivery-charges":
      return getDeliveryChargeRules();
    case "radius-zones":
      return getRadiusZones();
    case "surcharge-rules":
      return getSurchargeRules();
    case "item-schedule":
      return getItemSchedulerSelection();
    case "category-schedule":
      return getCategorySchedulerSelection();
    default:
      return null;
  }
}

async function saveByKey(key: SettingKey, payload: any) {
  switch (key) {
    case "delivery-charges":
      return saveDeliveryChargeRules(payload);
    case "radius-zones":
      return saveRadiusZones(payload);
    case "surcharge-rules":
      return saveSurchargeRules(payload);
    case "item-schedule":
      return saveItemSchedulerSelection(payload);
    case "category-schedule":
      return saveCategorySchedulerSelection(payload);
    default:
      return null;
  }
}

export async function GET(_: Request, { params }: { params: { key: SettingKey } }) {
  const data = await getByKey(params.key);
  return NextResponse.json(data ?? {});
}

export async function POST(request: Request, { params }: { params: { key: SettingKey } }) {
  const payload = await request.json();
  const saved = await saveByKey(params.key, payload);
  return NextResponse.json(saved ?? {});
}
