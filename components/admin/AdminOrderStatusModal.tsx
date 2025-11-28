"use client";

import { useEffect, useMemo, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

import AdminModal from "./AdminModal";
import AdminStatusBadge from "./AdminStatusBadge";
import { AdminOrder, AdminOrderStatus } from "@/data/admin/adminOrders";

const statusSteps = [
  "Pending",
  "Accepted by Restaurant",
  "Delivery Boy Reached (Restaurant)",
  "Restaurant Prepared",
  "Delivery Boy Picked Up",
  "On The Way",
  "Delivery Boy Reached (Customer)",
  "Order Delivered",
] as const;

type StatusOption = (typeof statusSteps)[number] | AdminOrderStatus;

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
};

export default function AdminOrderStatusModal({ order, open, onClose }: Props) {
  const [selected, setSelected] = useState<StatusOption>("Pending");

  useEffect(() => {
    if (order) {
      setSelected(order.status);
    }
  }, [order]);

  const progress = useMemo(() => {
    const index = statusSteps.findIndex((status) => status === selected);
    if (index === -1) return 0;
    return Math.round(((index + 1) / statusSteps.length) * 100);
  }, [selected]);

  if (!order) return null;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={`Edit status – ${order.id}`}
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            Save status
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600">
            <span>Current</span>
            <span className="text-slate-900">{selected}</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white shadow-inner">
            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid gap-2">
          {statusSteps.map((status) => (
            <label
              key={status}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                selected === status ? "border-blue-500 bg-blue-50 text-blue-800" : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value={status}
                  checked={selected === status}
                  onChange={() => setSelected(status)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-200"
                />
                <span>{status}</span>
              </div>
              {selected === status ? <FiCheckCircle className="h-5 w-5 text-blue-600" /> : <AdminStatusBadge status={status as AdminOrderStatus} />}
            </label>
          ))}
        </div>
      </div>
    </AdminModal>
  );
}
