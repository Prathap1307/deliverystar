import type { Metadata } from "next";

import CategorySchedulerClient from "@/components/admin/CategorySchedulerClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Category Scheduler",
  description: "Control weekly availability windows for categories with selectable time slots.",
};

export default function CategorySchedulerPage() {
  return <CategorySchedulerClient />;
}
