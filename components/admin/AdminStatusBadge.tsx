import { AdminOrderStatus } from "@/data/admin/adminOrders";

const toneMap: Record<AdminOrderStatus, string> = {
  Pending: "bg-slate-100 text-slate-800 border-slate-200",
  "Accepted by Restaurant": "bg-blue-50 text-blue-700 border-blue-200",
  "Delivery Boy Reached": "bg-amber-50 text-amber-700 border-amber-200",
  "Restaurant Prepared": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Delivery Boy Picked Up": "bg-purple-50 text-purple-700 border-purple-200",
  "On The Way": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function AdminStatusBadge({ status }: { status: AdminOrderStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneMap[status]}`}>
      {status}
    </span>
  );
}
