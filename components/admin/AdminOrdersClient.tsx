"use client";

import { useState } from "react";

import AdminCard from "./AdminCard";
import AdminEditModal from "./AdminEditModal";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminStatusModal from "./AdminStatusModal";
import AdminViewModal from "./AdminViewModal";
import MobileOrderCard from "./MobileOrderCard";
import OrderTable from "./OrderTable";
import { AdminOrder, allOrders } from "@/data/admin/adminOrders";

export default function AdminOrdersClient() {
  const [viewOrder, setViewOrder] = useState<AdminOrder | null>(null);
  const [editOrder, setEditOrder] = useState<AdminOrder | null>(null);
  const [statusOrder, setStatusOrder] = useState<AdminOrder | null>(null);

  return (
    <AdminShell>
      <AdminPageTitle
        title="All Orders"
        description="Edit items, delivery fees, surcharge, and status with responsive layouts."
        action={<button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md">Export CSV</button>}
      />

      <AdminCard title="Orders backlog" description="Desktop grid with mobile cards. No backend mutations.">
        <OrderTable orders={allOrders} onView={setViewOrder} onEdit={setEditOrder} onStatus={setStatusOrder} />
        <div className="mt-4 grid gap-3">
          {allOrders.map((order) => (
            <MobileOrderCard key={order.id} order={order} onView={setViewOrder} onEdit={setEditOrder} onStatus={setStatusOrder} />
          ))}
        </div>
      </AdminCard>

      <AdminViewModal order={viewOrder} open={Boolean(viewOrder)} onClose={() => setViewOrder(null)} />
      <AdminEditModal
        key={editOrder?.id ?? "edit-modal"}
        order={editOrder}
        open={Boolean(editOrder)}
        onClose={() => setEditOrder(null)}
      />
      <AdminStatusModal
        key={statusOrder?.id ?? "status-modal"}
        order={statusOrder}
        open={Boolean(statusOrder)}
        onClose={() => setStatusOrder(null)}
      />
    </AdminShell>
  );
}
