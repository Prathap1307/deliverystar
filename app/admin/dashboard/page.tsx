import type { Metadata } from "next";

import DashboardClient from "@/components/admin/DashboardClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Dashboard",
  description: "Monitor today’s Delivery Star orders with status, surcharges, and pickup flags.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
