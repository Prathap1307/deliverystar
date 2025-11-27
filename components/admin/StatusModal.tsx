"use client";

import { useState } from "react";

import AdminModal from "./AdminModal";
import { AdminOrder } from "@/data/adminOrders";

const statuses: AdminOrder["status"][] = [
  "Preparing",
  "Prepared",
  "Rider Reached",
  "Picked Up",
  "On The Way",
  "Delivered",
];

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
};

export default function StatusModal({ order, open, onClose }: Props) {
  const [selected, setSelected] = useState<AdminOrder["status"]>(order?.status ?? "Preparing");

  if (!order) return null;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={`Update status (${order.id})`}
      footer={
        <div className="flex justify-end gap-3">
          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save status</button>
        </div>
      }
    >
      <div className="space-y-3">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setSelected(status)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
              selected === status ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-800 hover:border-blue-200"
            }`}
          >
            <span>{status}</span>
            {selected === status && <span className="text-xs font-bold uppercase tracking-wide">Selected</span>}
          </button>
        ))}
      </div>
    </AdminModal>
  );
}
