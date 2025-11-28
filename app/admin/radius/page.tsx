import type { Metadata } from "next";

import RadiusClient from "@/components/admin/RadiusClient";
import { getRadiusZones } from "@/lib/admin/catalog";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Radius Management",
  description: "Create delivery zones with center points and radius in miles.",
};

export default async function RadiusPage() {
  const zones = await getRadiusZones();
  return <RadiusClient initialZones={zones} />;
}
