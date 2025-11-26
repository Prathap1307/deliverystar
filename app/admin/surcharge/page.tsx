import type { Metadata } from "next";

import SurchargeClient from "@/components/admin/SurchargeClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Surcharge Settings",
  description: "Add surcharge conditions like rain, snow, or storm with additional price.",
};

export default function SurchargePage() {
  return <SurchargeClient />;
}
