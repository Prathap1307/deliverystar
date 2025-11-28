"use client";

import { useMemo, useState } from "react";

import AdminCard from "./AdminCard";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import AdminOrderHistoryModal from "./AdminOrderHistoryModal";
import AdminOrderStatusModal from "./AdminOrderStatusModal";
import AdminOrderViewModal from "./AdminOrderViewModal";
import MobileOrderCard from "./MobileOrderCard";
import OrderTable from "./OrderTable";
import type { AdminOrder } from "@/lib/admin/orders";

export default function DashboardClient({ orders }: { orders: AdminOrder[] }) {
  const [data, setData] = useState<AdminOrder[]>(orders);
  const [viewOrder, setViewOrder] = useState<AdminOrder | null>(null);
  const [statusOrder, setStatusOrder] = useState<AdminOrder | null>(null);
  const [historyOrder, setHistoryOrder] = useState<AdminOrder | null>(null);

  const handleStatusUpdated = (updated: AdminOrder) => {
    setData((prev) => prev.map((order) => (order.id === updated.id ? updated : order)));
    setStatusOrder(updated);
  };

  const totals = useMemo(
    () =>
      data.reduce(
        (acc, order) => {
          const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
          acc.revenue += itemsTotal + order.deliveryCharge + order.tax + order.surcharge;
          acc.active += order.status !== "order_delivered" ? 1 : 0;
          acc.pickups += order.instorePickup ? 1 : 0;
          return acc;
        },
        { revenue: 0, active: 0, pickups: 0 },
      ),
    [data],
  );

  return (
    <AdminShell>
      <AdminPageTitle
        title="Today’s Orders"
        description="Mobile-first run sheet showing pickups, surcharges, and quick actions."
        action={<button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md">Print Summary</button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard title="Live Orders" description="Currently active tickets">
          <div className="text-3xl font-bold text-slate-900">{totals.active}</div>
          <p className="text-sm text-slate-600">Preparing, rider en route, or awaiting pickup.</p>
        </AdminCard>
        <AdminCard title="Revenue (Today)" description="Including delivery + surcharge">
          <div className="text-3xl font-bold text-slate-900">£{totals.revenue.toFixed(2)}</div>
          <p className="text-sm text-slate-600">Gross before fees.</p>
        </AdminCard>
        <AdminCard title="In-Store Pickup" description="Orders flagged for pickup">
          <div className="text-3xl font-bold text-slate-900">{totals.pickups}</div>
          <p className="text-sm text-slate-600">Coordinate with store staff.</p>
        </AdminCard>
      </div>

      <AdminCard title="Today’s tickets" description="Desktop table + mobile cards with zero horizontal scroll">
        <OrderTable
          mode="dashboard"
          orders={data}
          onView={setViewOrder}
          onEditOrder={() => {}}
          onEditStatus={setStatusOrder}
          onHistory={setHistoryOrder}
          onPrint={setViewOrder}
        />
        <div className="mt-4 grid gap-3">
          {data.map((order) => (
            <MobileOrderCard
              key={order.id}
              mode="dashboard"
              order={order}
              onView={setViewOrder}
              onEditOrder={() => {}}
              onEditStatus={setStatusOrder}
              onHistory={setHistoryOrder}
              onPrint={setViewOrder}
            />
          ))}
        </div>
      </AdminCard>

      <AdminOrderViewModal order={viewOrder} open={Boolean(viewOrder)} onClose={() => setViewOrder(null)} />
      <AdminOrderStatusModal
        order={statusOrder}
        open={Boolean(statusOrder)}
        onClose={() => setStatusOrder(null)}
        onStatusUpdated={handleStatusUpdated}
      />
      <AdminOrderHistoryModal order={historyOrder} open={Boolean(historyOrder)} onClose={() => setHistoryOrder(null)} />
    </AdminShell>
  );
}
