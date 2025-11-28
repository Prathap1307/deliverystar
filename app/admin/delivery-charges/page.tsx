import type { Metadata } from "next";

import DeliveryChargesClient from "@/components/admin/DeliveryChargesClient";
import { getDeliveryChargeRules } from "@/lib/admin/catalog";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Delivery Charges",
  description: "Configure delivery charge rules by miles and time windows.",
};

export default async function DeliveryChargesPage() {
  const rules = await getDeliveryChargeRules();
  return <DeliveryChargesClient initialRules={rules} />;
}
