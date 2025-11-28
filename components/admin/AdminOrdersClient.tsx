"use client";

import { useState } from "react";

import AdminCard from "./AdminCard";
import AdminOrderEditModal from "./AdminOrderEditModal";
import AdminOrderHistoryModal from "./AdminOrderHistoryModal";
import AdminOrderViewModal from "./AdminOrderViewModal";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import MobileOrderCard from "./MobileOrderCard";
import OrderTable from "./OrderTable";
import { AdminOrder, allOrders } from "@/data/admin/adminOrders";

export default function AdminOrdersClient() {
  const [viewOrder, setViewOrder] = useState<AdminOrder | null>(null);
  const [editOrder, setEditOrder] = useState<AdminOrder | null>(null);
  const [historyOrder, setHistoryOrder] = useState<AdminOrder | null>(null);

  return (
    <AdminShell>
      <AdminPageTitle
        title="All Orders"
        description="Edit items, delivery fees, surcharge, and status with responsive layouts."
        action={<button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">Export CSV</button>}
      />

      <AdminCard title="Orders backlog" description="Desktop grid with mobile cards. No backend mutations.">
        <OrderTable
          mode="orders"
          orders={allOrders}
          onView={setViewOrder}
          onEditOrder={setEditOrder}
          onEditStatus={() => {}}
          onHistory={setHistoryOrder}
          onPrint={setViewOrder}
        />
        <div className="mt-4 grid gap-3">
          {allOrders.map((order) => (
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
      <AdminOrderEditModal order={editOrder} open={Boolean(editOrder)} onClose={() => setEditOrder(null)} />
      <AdminOrderHistoryModal order={historyOrder} open={Boolean(historyOrder)} onClose={() => setHistoryOrder(null)} />
    </AdminShell>
  );
}
