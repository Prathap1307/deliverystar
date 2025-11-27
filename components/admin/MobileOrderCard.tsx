"use client";

import AdminBadge from "./AdminBadge";
import { AdminOrder } from "@/data/adminOrders";

type Props = {
  order: AdminOrder;
  onView: (order: AdminOrder) => void;
  onEdit: (order: AdminOrder) => void;
  onStatus: (order: AdminOrder) => void;
};

export default function MobileOrderCard({ order, onView, onEdit, onStatus }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">{order.id}</p>
          <p className="text-lg font-semibold text-slate-900">{order.customerName}</p>
          <p className="text-sm text-slate-600">{order.restaurantName}</p>
        </div>
        <AdminBadge label={order.instorePickup ? "In-Store" : "Delivery"} tone={order.instorePickup ? "danger" : "info"} />
      </div>
      <div className="mt-3 space-y-2 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Items</p>
        <p>{order.items.map((item) => `${item.name} x${item.qty}`).join(", ")}</p>
        <p className="text-slate-600">Charge: £{order.deliveryCharge.toFixed(2)} · Tax: £{order.tax.toFixed(2)} · Surcharge: {order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—"}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <button onClick={() => onView(order)} className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-center text-blue-700 transition hover:bg-blue-100">
          View
        </button>
        <button onClick={() => onEdit(order)} className="flex-1 rounded-lg bg-amber-50 px-3 py-2 text-center text-amber-700 transition hover:bg-amber-100">
          Edit
        </button>
        <button onClick={() => onStatus(order)} className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-center text-white transition hover:bg-slate-800">
          Status
        </button>
      </div>
    </div>
  );
}
