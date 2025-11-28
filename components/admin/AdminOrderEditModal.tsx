"use client";

import { useEffect, useMemo, useState } from "react";
import { FiMinus, FiPlus, FiSearch, FiX } from "react-icons/fi";

import AdminFormField from "./AdminFormField";
import AdminModal from "./AdminModal";
import { AdminOrder, AdminOrderItem } from "@/data/admin/adminOrders";
import { products } from "@/data/products";

type Props = {
  order?: AdminOrder | null;
  open: boolean;
  onClose: () => void;
};

export default function AdminOrderEditModal({ order, open, onClose }: Props) {
  const [items, setItems] = useState<AdminOrderItem[]>([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (order) {
      setItems(order.items);
      setAddress(order.customerLocation);
      setPhone(order.customerPhone);
      setDeliveryCharge(order.deliveryCharge);
      setTax(order.tax);
      setSurcharge(order.surcharge);
      setSearch("");
      setShowProductPicker(false);
    }
  }, [order]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  const addProduct = (name: string, price: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { name, price, qty: 1 }];
    });
  };

  const increment = (name: string) => setItems((prev) => prev.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item)));
  const decrement = (name: string) =>
    setItems((prev) => prev.flatMap((item) => (item.name === name ? (item.qty > 1 ? { ...item, qty: item.qty - 1 } : []) : item)));
  const remove = (name: string) => setItems((prev) => prev.filter((item) => item.name !== name));

  const itemsTotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const orderTotal = itemsTotal + deliveryCharge + tax + surcharge;

  if (!order) return null;

  return (
    <AdminModal
      open={open}
      onClose={onClose}
      title={`Edit order – ${order.id}`}
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
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Items</h4>
            <button
              onClick={() => setShowProductPicker((v) => !v)}
              className="rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-white"
            >
              + Add Item
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {items.map((item) => (
              <div key={item.name} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 shadow-sm">
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

          {showProductPicker && (
            <div className="mt-4 space-y-3 rounded-2xl border border-dashed border-slate-300 bg-white p-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <FiSearch className="h-4 w-4 text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search menu items"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                />
              </div>
              <div className="grid max-h-48 gap-2 overflow-y-auto text-sm">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProduct(product.name, product.price)}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-left font-semibold text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    <div>
                      <p>{product.name}</p>
                      <p className="text-xs text-slate-500">£{product.price.toFixed(2)}</p>
                    </div>
                    <FiPlus className="h-4 w-4" />
                  </button>
                ))}
                {filteredProducts.length === 0 && <p className="text-xs text-slate-500">No products match this search.</p>}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminFormField label="Customer phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="123456" />
          <AdminFormField label="Customer address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Luton Road" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Charges</h4>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Delivery Charge</label>
              <input
                type="number"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tax</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Surcharge</label>
              <input
                type="number"
                value={surcharge}
                onChange={(e) => setSurcharge(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-900">
            <div className="flex justify-between">
              <span>Items subtotal</span>
              <span>£{itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery + Tax + Surcharge</span>
              <span>£{(deliveryCharge + tax + surcharge).toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-dashed border-slate-300 pt-2 text-base">
              <span>Total preview</span>
              <span>£{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}
