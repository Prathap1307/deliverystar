"use client";

import { useEffect, useState } from "react";

import AdminCard from "./AdminCard";
import AdminOrderEditModal from "./AdminOrderEditModal";
import AdminOrderHistoryModal from "./AdminOrderHistoryModal";
import AdminOrderViewModal from "./AdminOrderViewModal";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import MobileOrderCard from "./MobileOrderCard";
import OrderTable from "./OrderTable";
import type { AdminOrder } from "@/lib/admin/orders";

export default function AdminOrdersClient({ orders }: { orders: AdminOrder[] }) {
  const [data, setData] = useState<AdminOrder[]>(orders);
  const [viewOrder, setViewOrder] = useState<AdminOrder | null>(null);
  const [editOrder, setEditOrder] = useState<AdminOrder | null>(null);
  const [historyOrder, setHistoryOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const json = await res.json();
        setData(json.data ?? []);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    loadOrders();
  }, []);

  const handleOrderUpdated = (updated: AdminOrder) => {
    setData((prev) => prev.map((order) => (order.id === updated.id ? updated : order)));
    setEditOrder(updated);
  };

  return (
    <AdminShell>
      <AdminPageTitle
        title="All Orders"
        description="Edit items, delivery fees, surcharge, and status with responsive layouts."
        action={<button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">Export CSV</button>}
      />

      <AdminCard title="Orders backlog" description="Desktop grid with mobile cards.">
        <OrderTable
          mode="orders"
          orders={data}
          onView={setViewOrder}
          onEditOrder={setEditOrder}
          onEditStatus={() => {}}
          onHistory={setHistoryOrder}
          onPrint={setViewOrder}
        />
        <div className="mt-4 grid gap-3">
          {data.map((order) => (
            <MobileOrderCard
              key={order.id}
              mode="orders"
              order={order}
              onView={setViewOrder}
              onEditOrder={setEditOrder}
              onEditStatus={() => {}}
              onHistory={setHistoryOrder}
              onPrint={setViewOrder}
            />
          ))}
        </div>
      </AdminCard>

      <AdminOrderViewModal order={viewOrder} open={Boolean(viewOrder)} onClose={() => setViewOrder(null)} />
      <AdminOrderEditModal
        order={editOrder}
        open={Boolean(editOrder)}
        onClose={() => setEditOrder(null)}
        onOrderUpdated={handleOrderUpdated}
      />
      <AdminOrderHistoryModal order={historyOrder} open={Boolean(historyOrder)} onClose={() => setHistoryOrder(null)} />
    </AdminShell>
  );
}
