"use client";

import AdminBadge from "./AdminBadge";
import { AdminOrder } from "@/data/adminOrders";

type Props = {
  orders: AdminOrder[];
  onView: (order: AdminOrder) => void;
  onEdit: (order: AdminOrder) => void;
  onStatus: (order: AdminOrder) => void;
};

export default function OrderTable({ orders, onView, onEdit, onStatus }: Props) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
      <table className="min-w-full text-sm text-slate-800">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {["Order ID", "Customer Name", "Customer Email", "Customer Phone", "Restaurant", "In-Store Pickup", "Pickup Location", "Items", "Delivery Charge", "Tax", "Surcharge", "Actions"].map((heading) => (
              <th key={heading} className="px-4 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
              <td className="px-4 py-3">{order.customerName}</td>
              <td className="px-4 py-3">{order.customerEmail}</td>
              <td className="px-4 py-3">{order.customerPhone}</td>
              <td className="px-4 py-3">{order.restaurantName}</td>
              <td className="px-4 py-3">
                {order.instorePickup ? (
                  <AdminBadge label="YES" tone="danger" />
                ) : (
                  <AdminBadge label="NO" tone="success" />
                )}
              </td>
              <td className="px-4 py-3 text-slate-700">{order.instorePickup ? order.pickupLocation : "—"}</td>
              <td className="px-4 py-3 text-slate-700">{order.items.map((item) => `${item.name} x${item.qty}`).join(", ")}</td>
              <td className="px-4 py-3 font-semibold text-slate-900">£{order.deliveryCharge.toFixed(2)}</td>
              <td className="px-4 py-3">£{order.tax.toFixed(2)}</td>
              <td className="px-4 py-3">{order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <button onClick={() => onView(order)} className="rounded-lg bg-blue-50 px-3 py-1 text-blue-700 transition hover:bg-blue-100">View</button>
                  <button onClick={() => onEdit(order)} className="rounded-lg bg-amber-50 px-3 py-1 text-amber-700 transition hover:bg-amber-100">Edit</button>
                  <button onClick={() => onStatus(order)} className="rounded-lg bg-slate-900 px-3 py-1 text-white transition hover:bg-slate-800">Status</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
