import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Star Admin",
  description: "Back-office tools for Delivery Star operators to manage orders and catalogue.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50">{children}</div>;
}
