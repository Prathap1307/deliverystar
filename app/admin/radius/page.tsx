import type { Metadata } from "next";

import RadiusClient from "@/components/admin/RadiusClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Radius Management",
  description: "Create delivery zones with center points and radius in miles.",
};

export default function RadiusPage() {
  return <RadiusClient />;
}
