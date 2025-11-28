"use client";

import { useMemo } from "react";
import { FiClock } from "react-icons/fi";

import AdminModal from "./AdminModal";
import type { AdminOrder } from "@/lib/admin/orders";

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
};

export default function AdminOrderViewModal({ order, open, onClose }: Props) {
  const timestamp = useMemo(
    () => (order?.createdAt ? new Date(order.createdAt).toLocaleString() : new Date().toLocaleString()),
    [order?.createdAt],
  );

  if (!order) return null;

  const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = itemsTotal + order.deliveryCharge + order.tax + order.surcharge;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      maxWidthClass="max-w-lg"
      title={`View order – ${order.id}`}
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={onClose}>
            Close
          </button>
          <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Print</button>
        </div>
      }
    >
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-inner">
        <div className="mb-4 space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Receipt</p>
          <h3 className="text-xl font-bold text-slate-900">{order.restaurantName}</h3>
          {order.instorePickup ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              In-store pickup
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Delivery
            </div>
          )}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <FiClock />
            {timestamp}
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-800">
          <div className="flex items-start justify-between">
            <span className="font-semibold">Customer</span>
            <span className="text-right text-slate-900">{order.customerName}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="font-semibold">Phone</span>
            <span className="text-right text-slate-900">{order.customerPhone}</span>
          </div>
          <div className="flex items-start justify-between">
            <span className="font-semibold">Address</span>
            <span className="max-w-[220px] text-right text-slate-900">{order.deliveryLocation}</span>
          </div>
          {order.instorePickup && (
            <div className="flex items-start justify-between">
              <span className="font-semibold">Pickup place</span>
              <span className="text-right text-slate-900">{order.pickupLocation}</span>
            </div>
          )}
        </div>

        <div className="my-4 border-t border-dashed border-slate-300" />

        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-slate-900">
              <span>
                {item.name}
                <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">x{item.qty}</span>
              </span>
              <span className="tabular-nums">£{(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="my-4 border-t border-dashed border-slate-300" />

        <div className="space-y-2 text-slate-900">
          <div className="flex justify-between text-sm">
            <span>Delivery Charge</span>
            <span className="tabular-nums">£{order.deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span className="tabular-nums">£{order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Surcharge</span>
            <span className="tabular-nums">{order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—"}</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-slate-300 pt-3 text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}
