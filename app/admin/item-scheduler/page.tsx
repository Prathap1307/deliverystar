import type { Metadata } from "next";

import ItemSchedulerClient from "@/components/admin/ItemSchedulerClient";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Item Scheduler",
  description: "Assign weekly schedules to specific items with easy slot toggles.",
};

export default function ItemSchedulerPage() {
  return <ItemSchedulerClient />;
}
