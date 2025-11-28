"use client";

import { useState } from "react";

import AdminModal from "./AdminModal";
import AdminStatusBadge from "./AdminStatusBadge";
import type { AdminOrder, AdminOrderStatus } from "@/lib/admin/orders";

const statuses: AdminOrderStatus[] = [
  "Pending",
  "Accepted by Restaurant",
  "Delivery Boy Reached",
  "Restaurant Prepared",
  "Delivery Boy Picked Up",
  "On The Way",
  "Delivered",
];

interface Props {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
}

export default function AdminStatusModal({ order, open, onClose }: Props) {
  const [selected, setSelected] = useState<AdminOrderStatus>(order?.status ?? "Pending");

  if (!order) return null;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={`Update status – ${order.id}`}
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={onClose}>
            Close
          </button>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save status</button>
        </div>
      }
    >
      <div className="space-y-3">
        {statuses.map((status) => (
          <label
            key={status}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              selected === status ? "border-blue-500 bg-blue-50 text-blue-800" : "border-slate-200 bg-white text-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="status"
                value={status}
                checked={selected === status}
                onChange={() => setSelected(status)}
                className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-200"
              />
              <span>{status}</span>
            </div>
            <AdminStatusBadge status={status} />
          </label>
        ))}
      </div>
    </AdminModal>
  );
}
