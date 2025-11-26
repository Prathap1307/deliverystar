import type { Metadata } from "next";

import AdminOrdersClient from "@/components/admin/AdminOrdersClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – All Orders",
  description: "Review, edit, and manage every Delivery Star order with pricing controls.",
};

export default function AdminOrdersPage() {
  return <AdminOrdersClient />;
}
