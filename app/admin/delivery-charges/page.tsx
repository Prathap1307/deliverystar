import type { Metadata } from "next";

import DeliveryChargesClient from "@/components/admin/DeliveryChargesClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Delivery Charges",
  description: "Configure delivery charge rules by miles and time windows.",
};

export default function DeliveryChargesPage() {
  return <DeliveryChargesClient />;
}
