"use client";

import AdminStatusBadge from "./AdminStatusBadge";
import { AdminOrder } from "@/data/admin/adminOrders";

interface Props {
  order: AdminOrder;
  onView: (order: AdminOrder) => void;
  onEdit: (order: AdminOrder) => void;
  onStatus: (order: AdminOrder) => void;
}

export default function MobileOrderCard({ order, onView, onEdit, onStatus }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{order.id}</p>
          <p className="text-lg font-semibold text-slate-900">{order.customerName}</p>
          <p className="text-sm text-slate-600">{order.restaurantName}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${order.instorePickup ? "bg-rose-600 text-white" : "bg-emerald-100 text-emerald-700"}`}>
          {order.instorePickup ? "In-Store" : "Delivery"}
        </span>
      </div>

      <div className="mt-3 space-y-2 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Items</p>
        <p className="leading-relaxed">{order.items.map((item) => `${item.name} x${item.qty}`).join(", ")}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span>Delivery £{order.deliveryCharge.toFixed(2)}</span>
          <span>· Tax £{order.tax.toFixed(2)}</span>
          <span>· Surcharge {order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—"}</span>
        </div>
        <AdminStatusBadge status={order.status} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-sm font-semibold sm:grid-cols-3">
        <button onClick={() => onEdit(order)} className="w-full rounded-lg bg-amber-50 px-3 py-2 text-amber-700 transition hover:bg-amber-100">
          Edit
        </button>
        <button onClick={() => onView(order)} className="w-full rounded-lg bg-blue-50 px-3 py-2 text-blue-700 transition hover:bg-blue-100">
          View
        </button>
        <button onClick={() => onStatus(order)} className="w-full rounded-lg bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800">
          Status
        </button>
      </div>
    </div>
  );
}
