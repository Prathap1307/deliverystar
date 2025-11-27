"use client";

import { useMemo, useState } from "react";

import AdminCard from "./AdminCard";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";
import EditOrderModal from "./EditOrderModal";
import MobileOrderCard from "./MobileOrderCard";
import OrderTable from "./OrderTable";
import StatusModal from "./StatusModal";
import ViewOrderModal from "./ViewOrderModal";
import { AdminOrder, todaysOrders } from "@/data/adminOrders";

export default function DashboardClient() {
  const [viewOrder, setViewOrder] = useState<AdminOrder | null>(null);
  const [editOrder, setEditOrder] = useState<AdminOrder | null>(null);
  const [statusOrder, setStatusOrder] = useState<AdminOrder | null>(null);

  const totals = useMemo(
    () =>
      todaysOrders.reduce(
        (acc, order) => {
          const itemsTotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
          acc.revenue += itemsTotal + order.deliveryCharge + order.tax + order.surcharge;
          acc.active += order.status !== "Delivered" ? 1 : 0;
          acc.pickups += order.instorePickup ? 1 : 0;
          return acc;
        },
        { revenue: 0, active: 0, pickups: 0 },
      ),
    [],
  );

  return (
    <AdminShell>
      <AdminPageTitle
        title="Today’s Orders"
        description="Fast access to pickup tags, surcharges, and live statuses."
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

      <AdminCard title="Today’s tickets" description="Run sheets for the operations team">
        <OrderTable orders={todaysOrders} onView={setViewOrder} onEdit={setEditOrder} onStatus={setStatusOrder} />
        <div className="mt-4 grid gap-3">
          {todaysOrders.map((order) => (
            <MobileOrderCard key={order.id} order={order} onView={setViewOrder} onEdit={setEditOrder} onStatus={setStatusOrder} />
          ))}
        </div>
      </AdminCard>

      <ViewOrderModal order={viewOrder} open={Boolean(viewOrder)} onClose={() => setViewOrder(null)} />
      <EditOrderModal key={editOrder?.id ?? "edit-modal"} order={editOrder} open={Boolean(editOrder)} onClose={() => setEditOrder(null)} />
      <StatusModal order={statusOrder} open={Boolean(statusOrder)} onClose={() => setStatusOrder(null)} />
    </AdminShell>
  );
}
