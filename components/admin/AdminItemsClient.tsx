"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiToggleLeft, FiToggleRight } from "react-icons/fi";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminFormField from "./AdminFormField";
import AdminModal from "./AdminModal";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminTable from "./AdminTable";
import type { AdminItem } from "@/lib/admin/catalog";

interface Props {
  initialItems: AdminItem[];
}

const columns = [
  { key: "name", label: "Title" },
  { key: "price", label: "Price" },
  { key: "category", label: "Category" },
  { key: "diet", label: "Diet" },
  { key: "ageRestricted", label: "Age Restricted" },
  { key: "active", label: "Status" },
  { key: "actions", label: "Actions" },
];

export default function AdminItemsClient({ initialItems }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [items, setItems] = useState<AdminItem[]>(initialItems);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    category: "Alcohol",
    diet: "Veg",
    ageRestricted: false,
    active: true,
    schedule: "",
  });

  const loadItems = async () => {
    try {
      const res = await fetch("/api/admin/items");
      const json = await res.json();
      setItems(json.data ?? json ?? []);
    } catch (err) {
      console.error("Failed to load items", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSave = async () => {
    const id = editingItemId ?? crypto.randomUUID();
    const nextItem: AdminItem = {
      id,
      name: formState.name,
      price: Number(formState.price || 0),
      category: formState.category,
      diet: formState.diet as AdminItem["diet"],
      ageRestricted: formState.ageRestricted,
      active: formState.active,
    };

    await fetch("/api/admin/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextItem),
    });

    await loadItems();
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await loadItems();
  };

  return (
    <AdminShell>
      <AdminPageTitle
        title="Items"
        description="Add new catalogue entries, toggle availability, and schedule reactivations."
        action={
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
            onClick={() => {
              setEditingItemId(null);
              setFormState({ name: "", price: "", category: "Alcohol", diet: "Veg", ageRestricted: false, active: true, schedule: "" });
              setModalOpen(true);
            }}
          >
            <FiPlus /> Add Item
          </button>
        }
      />

      <AdminCard title="Catalogue" description="Manage veg/non-veg/vegan flags, age restriction, and active toggles">
        <AdminTable
          columns={columns}
          data={items}
          renderCell={(item, key) => {
            if (key === "price") return `£${item.price.toFixed(2)}`;
            if (key === "ageRestricted") return item.ageRestricted ? <AdminBadge label="18+" tone="danger" /> : "—";
            if (key === "active") return item.active ? <AdminBadge label="Active" tone="success" /> : <AdminBadge label="Inactive" tone="warning" />;
            if (key === "actions")
              return (
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <button
                    className="rounded-lg bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
              setEditingItemId(item.id);
                      setFormState({
                        name: item.name,
                        price: item.price?.toString?.() || "",
                        category: item.category,
                        diet: item.diet ?? "Veg",
                        ageRestricted: item.ageRestricted,
                        active: item.active,
                        schedule: "",
                      });
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-lg bg-rose-50 px-3 py-1 text-rose-700 hover:bg-rose-100"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="rounded-lg bg-slate-900 px-3 py-1 text-white hover:bg-slate-800"
                    onClick={() => {
                      setEditingItemId(item.id);
                      setFormState({
                        name: item.name,
                        price: item.price?.toString?.() || "",
                        category: item.category,
                        diet: item.diet ?? "Veg",
                        ageRestricted: item.ageRestricted,
                        active: item.active,
                        schedule: "",
                      });
                      setModalOpen(true);
                    }}
                  >
                    Save
                  </button>
                </div>
              );
            const fallback = item[key as keyof typeof item];
            return (fallback as React.ReactNode) ?? "";
          }}
        />
      </AdminCard>

      <AdminModal
        title={editingItemId ? "Edit item" : "Add new item"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={handleSave}
            >
              Save item
            </button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminFormField
            label="Title"
            value={formState.name}
            onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Whiskey"
          />
          <AdminFormField
            label="Price"
            type="number"
            value={formState.price}
            onChange={(e) => setFormState((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="29.99"
          />
          <AdminFormField
            label="Category"
            value={formState.category}
            onChange={(e) => setFormState((prev) => ({ ...prev, category: e.target.value }))}
            placeholder="Alcohol"
          />
          <AdminFormField
            label="Diet"
            value={formState.diet}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, diet: e.target.value as "Veg" | "Vegan" | "Non-Veg" }))
            }
            placeholder="Vegan"
          />
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Age restricted</p>
              <p className="text-xs text-slate-500">Flag as 18+ item.</p>
            </div>
            <button
              onClick={() => setFormState((prev) => ({ ...prev, ageRestricted: !prev.ageRestricted }))}
              className="text-blue-600"
            >
              {formState.ageRestricted ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
            </button>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Active</p>
              <p className="text-xs text-slate-500">Toggle availability instantly.</p>
            </div>
            <button
              onClick={() => setFormState((prev) => ({ ...prev, active: !prev.active }))}
              className="text-blue-600"
            >
              {formState.active ? <FiToggleRight className="h-6 w-6" /> : <FiToggleLeft className="h-6 w-6" />}
            </button>
          </div>
          <AdminFormField
            label="Schedule reactivation"
            type="date"
            value={formState.schedule}
            onChange={(e) => setFormState((prev) => ({ ...prev, schedule: e.target.value }))}
            hint="Optional date to auto-reactivate"
          />
          <AdminFormField label="Upload image" type="file" hint="UI only – no upload API" />
        </div>
      </AdminModal>
    </AdminShell>
  );
}
