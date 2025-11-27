"use client";

import AdminModal from "./AdminModal";
import { AdminOrder } from "@/data/adminOrders";

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
};

export default function ViewOrderModal({ order, open, onClose }: Props) {
  if (!order) return null;

  const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = itemsTotal + order.deliveryCharge + order.tax + order.surcharge;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={`View ${order.id}`}
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">Print Bill</button>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700" onClick={onClose}>
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 rounded-2xl bg-slate-50 p-4 font-mono text-sm text-slate-800">
        <div className="flex flex-wrap justify-between gap-2">
          <div>
            <p className="font-bold text-slate-900">Order {order.id}</p>
            <p>{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.customerPhone}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-slate-900">{order.restaurantName}</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">Restaurant Bill</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">Pickup Location</p>
          <p>{order.pickupLocation}</p>
          <p className="font-semibold text-slate-900">Delivery Location</p>
          <p>{order.customerLocation}</p>
        </div>
        <div className="rounded-xl border border-dashed border-slate-300 p-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 font-semibold text-slate-900">
            <span>Items</span>
            <span>Qty × Price</span>
          </div>
          <div className="divide-y divide-slate-200">
            {order.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2">
                <span>{item.name}</span>
                <span>
                  {item.qty} × £{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-slate-900">
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>£{itemsTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>£{order.deliveryCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>£{order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Surcharge</span>
            <span>{order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—"}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}
