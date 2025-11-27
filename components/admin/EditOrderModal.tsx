"use client";

import { useMemo, useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

import AdminFormField from "./AdminFormField";
import AdminModal from "./AdminModal";
import { AdminOrder, AdminOrderItem } from "@/data/adminOrders";

const menuItems: AdminOrderItem[] = [
  { name: "Biryani", qty: 1, price: 8.99 },
  { name: "Coke", qty: 1, price: 1.99 },
  { name: "Fries", qty: 1, price: 2.5 },
  { name: "Samosa", qty: 1, price: 3.25 },
];

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
};

export default function EditOrderModal({ order, open, onClose }: Props) {
  const [items, setItems] = useState<AdminOrderItem[]>(order?.items ?? []);
  const [address, setAddress] = useState(order?.customerLocation ?? "");
  const [phone, setPhone] = useState(order?.customerPhone ?? "");

  const addItem = (newItem: AdminOrderItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.name === newItem.name);
      if (existing) {
        return prev.map((item) => (item.name === newItem.name ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, newItem];
    });
  };

  const increment = (name: string) => setItems((prev) => prev.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item)));
  const decrement = (name: string) =>
    setItems((prev) => prev.flatMap((item) => (item.name === name ? (item.qty > 1 ? { ...item, qty: item.qty - 1 } : []) : item)));
  const remove = (name: string) => setItems((prev) => prev.filter((item) => item.name !== name));

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);

  if (!order) return null;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={`Edit ${order.id}`}
      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save changes</button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600">Items</h4>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">£{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => decrement(item.name)} className="rounded-full border border-slate-200 p-2 text-slate-700 hover:bg-slate-100" aria-label={`Decrease ${item.name}`}>
                    <FiMinus />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => increment(item.name)} className="rounded-full border border-slate-200 p-2 text-slate-700 hover:bg-slate-100" aria-label={`Increase ${item.name}`}>
                    <FiPlus />
                  </button>
                  <button onClick={() => remove(item.name)} className="rounded-full border border-rose-200 p-2 text-rose-600 hover:bg-rose-50" aria-label={`Remove ${item.name}`}>
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => addItem(menuItems[0])}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Add Item +
          </button>
          <div className="mt-2 text-sm text-slate-600">Tap to quickly duplicate Biryani, or select from menu below.</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => addItem(item)}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50"
              >
                {item.name} (£{item.price.toFixed(2)})
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminFormField
            label="Customer address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Luton Road"
          />
          <AdminFormField
            label="Customer phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="1234567"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-900">
          <div className="flex justify-between">
            <span>Items total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
          <p className="mt-1 text-xs font-normal text-slate-500">UI-only preview. Delivery, tax, and surcharge remain unchanged.</p>
        </div>
      </div>
    </AdminModal>
  );
}
