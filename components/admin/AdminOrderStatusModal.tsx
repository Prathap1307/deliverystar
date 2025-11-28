"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { FiCheckCircle } from "react-icons/fi";

import AdminModal from "./AdminModal";
import AdminStatusBadge from "./AdminStatusBadge";
import { STATUS_OPTIONS, getStatusLabel, type AdminOrder, type AdminOrderStatus } from "@/lib/admin/orders";

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
  onStatusUpdated?: (order: AdminOrder) => void;
};

export default function AdminOrderStatusModal({ order, open, onClose, onStatusUpdated }: Props) {
  const [selected, setSelected] = useState<AdminOrderStatus>("pending");
  const [isSaving, startTransition] = useTransition();

  useEffect(() => {
    if (order) {
      setSelected(order.status);
    }
  }, [order]);

  const progress = useMemo(() => {
    const index = STATUS_OPTIONS.findIndex((status) => status.value === selected);
    if (index === -1) return 0;
    return Math.round(((index + 1) / STATUS_OPTIONS.length) * 100);
  }, [selected]);

  if (!order) return null;

  const handleSave = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/orders`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: order.id, status: selected }),
        });

        if (response.ok) {
          const { data } = (await response.json()) as { data: AdminOrder };
          if (data) {
            onStatusUpdated?.(data);
            onClose();
          }
        }
      } catch (error) {
        console.error("Failed to update order status", error);
      }
    });
  };

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
          <button
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSave}
            disabled={isSaving}
          >
            Save status
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600">
            <span>Current</span>
            <span className="text-slate-900">{getStatusLabel(selected)}</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white shadow-inner">
            <div className="h-2 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="grid gap-2">
          {STATUS_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                selected === option.value ? "border-blue-500 bg-blue-50 text-blue-800" : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  value={option.value}
                  checked={selected === option.value}
                  onChange={() => setSelected(option.value)}
                  className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-200"
                />
                <span>{option.label}</span>
              </div>
              {selected === option.value ? <FiCheckCircle className="h-5 w-5 text-blue-600" /> : <AdminStatusBadge status={option.label as AdminOrderStatus} />}
            </label>
          ))}
        </div>
      </div>
    </AdminModal>
  );
}
