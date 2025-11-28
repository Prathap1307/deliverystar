"use client";

import { useState } from "react";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminTable from "./AdminTable";
import type { AdminItem, SchedulerSelection } from "@/lib/admin/catalog";

interface Props {
  initialItems: AdminItem[];
  initialSelection: SchedulerSelection;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["08:00–12:00", "16:00–22:00"];

export default function ItemSchedulerClient({ initialItems, initialSelection }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialSelection.ids);

  const persistSelection = async () => {
    await fetch("/api/admin/settings/item-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedItems }),
    });
  };

  const columns = [
    { key: "name", label: "Item" },
    { key: "category", label: "Category" },
    { key: "active", label: "Status" },
    { key: "actions", label: "Select" },
  ];

  return (
    <AdminShell>
      <AdminPageTitle
        title="Item Scheduler"
        description="Select items to control their availability windows."
        action={
          <button
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md"
            onClick={persistSelection}
          >
            Save schedule
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Choose items" description="Multi-select items for scheduling">
          <AdminTable
            columns={columns}
            data={initialItems}
            renderCell={(item, key) => {
              if (key === "active") return item.active ? <AdminBadge label="Active" tone="success" /> : <AdminBadge label="Inactive" tone="warning" />;
              if (key === "actions")
                return (
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedItems((prev) =>
                        checked ? [...prev, item.id] : prev.filter((id) => id !== item.id),
                      );
                    }}
                  />
                );
              const fallback = item[key as keyof typeof item];
              return (fallback as React.ReactNode) ?? "";
            }}
          />
        </AdminCard>

        <AdminCard title="Weekly schedule" description="Two time slots per day to control availability">
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{day}</p>
                    <p className="text-xs text-slate-500">Applies to selected items</p>
                  </div>
                  <AdminBadge label={`${slots.length} slots`} tone="info" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {slots.map((slot) => (
                    <label key={slot} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                      <span className="text-sm font-semibold text-slate-800">{slot}</span>
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200" defaultChecked />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
