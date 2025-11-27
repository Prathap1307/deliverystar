"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminFormField from "./AdminFormField";
import AdminModal from "./AdminModal";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminTable from "./AdminTable";
import { adminCategories } from "@/data/adminCategories";

const columns = [
  { key: "name", label: "Category" },
  { key: "active", label: "Status" },
  { key: "reactivateOn", label: "Reactivation" },
  { key: "actions", label: "Actions" },
];

export default function AdminCategoriesClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", active: true, reason: "", reactivateOn: "" });

  return (
    <AdminShell>
      <AdminPageTitle
        title="Categories"
        description="Activate / deactivate categories and capture reasons and schedules."
        action={
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
            onClick={() => {
              setFormState({ name: "", active: true, reason: "", reactivateOn: "" });
              setModalOpen(true);
            }}
          >
            <FiPlus /> Add Category
          </button>
        }
      />

      <AdminCard title="Category controls" description="Use badges to flag deactivated categories with reasons and dates">
        <AdminTable
          columns={columns}
          data={adminCategories}
          renderCell={(category, key) => {
            if (key === "active")
              return category.active ? <AdminBadge label="Active" tone="success" /> : <AdminBadge label="Inactive" tone="warning" />;
            if (key === "reactivateOn") return category.reactivateOn ?? "—";
            if (key === "actions")
              return (
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <button className="rounded-lg bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100">Activate</button>
                  <button className="rounded-lg bg-rose-50 px-3 py-1 text-rose-700 hover:bg-rose-100">Deactivate</button>
                  <button className="rounded-lg bg-slate-900 px-3 py-1 text-white hover:bg-slate-800">Save</button>
                </div>
              );
            const fallback = category[key as keyof typeof category];
            return (fallback as React.ReactNode) ?? "";
          }}
        />
      </AdminCard>

      <AdminModal
        title="Add / Update Category"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save category</button>
          </>
        }
      >
        <div className="space-y-4">
          <AdminFormField
            label="Category name"
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Alcohol"
          />
          <AdminFormField
            label="Reason when deactivating"
            value={formState.reason}
            onChange={(e) => setFormState((prev) => ({ ...prev, reason: e.target.value }))}
            placeholder="Supplier delay"
          />
          <AdminFormField
            label="Reactivation schedule"
            type="date"
            value={formState.reactivateOn}
            onChange={(e) => setFormState((prev) => ({ ...prev, reactivateOn: e.target.value }))}
            hint="Optional date to bring the category back online"
          />
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Deactivate flow</p>
            <ol className="list-decimal pl-5">
              <li>Reason + date picker</li>
              <li>Reactivation schedule UI</li>
              <li>Activate / Deactivate category toggles</li>
            </ol>
          </div>
        </div>
      </AdminModal>
    </AdminShell>
  );
}
