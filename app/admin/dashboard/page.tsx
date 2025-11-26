import type { Metadata } from "next";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminCard from "@/components/admin/AdminCard";
import AdminPageTitle from "@/components/admin/AdminPageTitle";
import AdminShell from "@/components/admin/AdminShell";
import AdminTable from "@/components/admin/AdminTable";
import { todaysOrders } from "@/data/adminOrders";

export const metadata: Metadata = {
  title: "Delivery Star Admin – Dashboard",
  description: "Monitor today’s Delivery Star orders with status, surcharges, and pickup flags.",
};

const columns = [
  { key: "customerName", label: "Customer Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "items", label: "Ordered Items", className: "min-w-[200px]" },
  { key: "price", label: "Price" },
  { key: "deliveryPrice", label: "Delivery" },
  { key: "surcharge", label: "Surcharge" },
  { key: "location", label: "Delivery Location", className: "min-w-[200px]" },
  { key: "instorePickup", label: "In-store Pickup" },
  { key: "status", label: "Status" },
  { key: "actions", label: "View / Print" },
];

export default function DashboardPage() {
  const totals = todaysOrders.reduce(
    (acc, order) => {
      acc.revenue += order.price + order.deliveryPrice + order.surcharge;
      acc.active += order.status !== "Delivered" ? 1 : 0;
      acc.pickups += order.instorePickup ? 1 : 0;
      return acc;
    },
    { revenue: 0, active: 0, pickups: 0 },
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
        <AdminTable
          columns={columns}
          data={todaysOrders}
          renderCell={(order, key) => {
            if (key === "price") return `£${order.price.toFixed(2)}`;
            if (key === "deliveryPrice") return `£${order.deliveryPrice.toFixed(2)}`;
            if (key === "surcharge") return order.surcharge ? `£${order.surcharge.toFixed(2)}` : "—";
            if (key === "instorePickup")
              return order.instorePickup ? (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">In-Store Pickup</span>
              ) : (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Delivery</span>
              );
            if (key === "status") {
              const tone =
                order.status === "Delivered"
                  ? "success"
                  : order.status === "On The Way"
                    ? "info"
                    : order.status === "Preparing"
                      ? "warning"
                      : "neutral";
              return <AdminBadge label={order.status} tone={tone} />;
            }
            if (key === "actions")
              return (
                <div className="flex flex-wrap items-center gap-2">
                  <button className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100">View</button>
                  <button className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800">Print</button>
                </div>
              );
            const fallback = order[key as keyof typeof order];
            return (fallback as React.ReactNode) ?? "";
          }}
        />
      </AdminCard>
    </AdminShell>
  );
}
