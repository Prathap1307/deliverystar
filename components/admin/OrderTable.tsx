"use client";

import AdminOrderRow from "./AdminOrderRow";
import { AdminOrder } from "@/data/admin/adminOrders";

interface Props {
  orders: AdminOrder[];
  onView: (order: AdminOrder) => void;
  onEdit: (order: AdminOrder) => void;
  onStatus: (order: AdminOrder) => void;
}

const headers = [
  "Order ID",
  "Customer Name",
  "Customer Email",
  "Customer Phone",
  "Restaurant Name",
  "In-Store Pickup",
  "Pickup Place",
  "Items",
  "Delivery",
  "Tax",
  "Surcharge",
  "Actions",
];

export default function OrderTable({ orders, onView, onEdit, onStatus }: Props) {
  return (
    <div className="hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
      <table className="min-w-full border-collapse text-sm text-slate-800">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {headers.map((heading) => (
              <th key={heading} className="px-4 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="whitespace-normal">
          {orders.map((order) => (
            <AdminOrderRow key={order.id} order={order} onView={onView} onEdit={onEdit} onStatus={onStatus} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
