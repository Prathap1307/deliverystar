"use client";

import { useEffect, useState } from "react";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminTable from "./AdminTable";
import type { AdminCategory, SchedulerSelection } from "@/lib/admin/catalog";

interface Props {
  initialCategories: AdminCategory[];
  initialSelection: SchedulerSelection;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const slots = ["08:00–12:00", "16:00–22:00"];

export default function CategorySchedulerClient({ initialCategories, initialSelection }: Props) {
  const [categories, setCategories] = useState<AdminCategory[]>(initialCategories);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelection.ids);

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const json = await res.json();
      setCategories(json.data ?? json ?? []);
    } catch (err) {
      console.error("Failed to load categories for schedule", err);
    }
  };

  const loadSelection = async () => {
    try {
      const res = await fetch("/api/admin/settings/category-schedule");
      const json = await res.json();
      setSelectedCategories(json.ids ?? json?.data?.ids ?? []);
    } catch (err) {
      console.error("Failed to load category selection", err);
    }
  };

  useEffect(() => {
    void loadCategories();
    void loadSelection();
  }, []);

  const persistSelection = async () => {
    await fetch("/api/admin/settings/category-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedCategories }),
    });
  };

  const columns = [
    { key: "name", label: "Category" },
    { key: "active", label: "Status" },
    { key: "actions", label: "Select" },
  ];

  return (
    <AdminShell>
        <AdminPageTitle
          title="Category Scheduler"
          description="Choose categories and apply weekly opening windows."
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
        <AdminCard title="Choose categories" description="Pick which categories to schedule">
          <AdminTable
            columns={columns}
            data={categories}
            renderCell={(category, key) => {
              if (key === "active") return category.active ? <AdminBadge label="Active" tone="success" /> : <AdminBadge label="Inactive" tone="warning" />;
              if (key === "actions")
                return (
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedCategories((prev) =>
                        checked ? [...prev, category.id] : prev.filter((id) => id !== category.id),
                      );
                    }}
                  />
                );
              const fallback = category[key as keyof typeof category];
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
                    <p className="text-xs text-slate-500">Applies to selected categories</p>
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
