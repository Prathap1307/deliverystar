import type { Metadata } from "next";

import SurchargeClient from "@/components/admin/SurchargeClient";
import { getSurchargeRules } from "@/lib/admin/catalog";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Surcharge Settings",
  description: "Add surcharge conditions like rain, snow, or storm with additional price.",
};

export default async function SurchargePage() {
  const rules = await getSurchargeRules();
  return <SurchargeClient initialRules={rules} />;
}
