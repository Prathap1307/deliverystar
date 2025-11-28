import type { Metadata } from "next";

import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";
import { listAdminCategories } from "@/lib/admin/catalog";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Categories",
  description: "Activate, deactivate, and schedule reactivation for product categories.",
};

export default async function AdminCategoriesPage() {
  const categories = await listAdminCategories();
  return <AdminCategoriesClient initialCategories={categories} />;
}
