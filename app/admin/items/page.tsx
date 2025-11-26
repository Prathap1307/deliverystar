import type { Metadata } from "next";

import AdminItemsClient from "@/components/admin/AdminItemsClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Items",
  description: "Manage catalogue items, pricing, dietary flags, and activation schedules.",
};

export default function AdminItemsPage() {
  return <AdminItemsClient />;
}
