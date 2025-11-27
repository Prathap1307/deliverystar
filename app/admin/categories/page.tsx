import type { Metadata } from "next";

import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Categories",
  description: "Activate, deactivate, and schedule reactivation for product categories.",
};

export default function AdminCategoriesPage() {
  return <AdminCategoriesClient />;
}
