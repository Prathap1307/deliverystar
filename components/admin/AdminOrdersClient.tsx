"use client";

import { useMemo, useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminFormField from "./AdminFormField";
import AdminModal from "./AdminModal";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminTable from "./AdminTable";
import { allOrders } from "@/data/adminOrders";

const columns = [
  { key: "customerName", label: "Customer Name" },
  { key: "customerPhone", label: "Phone" },
  { key: "customerEmail", label: "Email" },
  { key: "items", label: "Ordered Items", className: "min-w-[220px]" },
  { key: "deliveryCharge", label: "Delivery" },
  { key: "tax", label: "Tax" },
  { key: "surcharge", label: "Surcharge" },
  { key: "customerLocation", label: "Delivery Location", className: "min-w-[200px]" },
  { key: "instorePickup", label: "In-store Pickup" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

export default function AdminOrdersClient() {
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [formState, setFormState] = useState({ items: "", deliveryCharge: "", tax: "", surcharge: "" });

  const selectedOrder = useMemo(() => allOrders.find((o) => o.id === editingOrderId), [editingOrderId]);

  return (
    <AdminShell>
      <AdminPageTitle
        title="All Orders"
        description="Bulk edit prices, delivery fees, surcharges, and items."
        action={<button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">Export CSV</button>}
      />

      <AdminCard title="Orders backlog" description="UI-only actions for pricing updates and corrections">
        <AdminTable
          columns={columns}
          data={allOrders}
          renderCell={(order, key) => {
            if (key === "items") return order.items.map((item) => `${item.name} x${item.qty}`).join(", ");
            if (key === "deliveryCharge") return `£${order.deliveryCharge.toFixed(2)}`;
            if (key === "tax") return `£${order.tax.toFixed(2)}`;
            if (key === "surcharge") return order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—";
            if (key === "instorePickup")
              return order.instorePickup ? (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">In-Store Pickup</span>
              ) : (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Delivery</span>
              );
            if (key === "status") return <AdminBadge label={order.status} tone={order.status === "Delivered" ? "success" : "info"} />;
            if (key === "actions")
              return (
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <button
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      setEditingOrderId(order.id);
                      setFormState({
                        items: order.items.map((item) => `${item.name} x${item.qty}`).join(", "),
                        deliveryCharge: order.deliveryCharge.toString(),
                        tax: order.tax.toString(),
                        surcharge: order.surcharge.toString(),
                      });
                    }}
                  >
                    <FiEdit3 /> Edit
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1 text-rose-700 hover:bg-rose-100">
                    <FiTrash2 /> Delete
                  </button>
                  <button className="rounded-lg bg-slate-900 px-3 py-1 text-white hover:bg-slate-800">Save</button>
                </div>
              );
            const fallback = order[key as keyof typeof order];
            return (fallback as React.ReactNode) ?? "";
          }}
        />
      </AdminCard>

      <AdminModal
        title={`Edit ${selectedOrder?.id ?? "order"}`}
        open={Boolean(editingOrderId)}
        onClose={() => setEditingOrderId(null)}
        footer={
          <>
            <button
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
              onClick={() => setEditingOrderId(null)}
            >
              Cancel
            </button>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save changes</button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminFormField
            label="Items"
            value={formState.items}
            onChange={(e) => setFormState((prev) => ({ ...prev, items: e.target.value }))}
            placeholder="Biryani x2, Coke x1"
          />
          <AdminFormField
            label="Delivery Charge"
            type="number"
            value={formState.deliveryCharge}
            onChange={(e) => setFormState((prev) => ({ ...prev, deliveryCharge: e.target.value }))}
            placeholder="4.99"
          />
          <AdminFormField
            label="Tax"
            type="number"
            value={formState.tax}
            onChange={(e) => setFormState((prev) => ({ ...prev, tax: e.target.value }))}
            placeholder="1.20"
          />
          <AdminFormField
            label="Surcharge"
            type="number"
            value={formState.surcharge}
            onChange={(e) => setFormState((prev) => ({ ...prev, surcharge: e.target.value }))}
            placeholder="1.50"
          />
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Admin actions</p>
          <ul className="list-disc pl-5">
            <li>Update delivery charge</li>
            <li>Update surcharge</li>
            <li>Edit items</li>
            <li>Change price</li>
            <li>Delete item</li>
          </ul>
        </div>
      </AdminModal>
    </AdminShell>
  );
}
