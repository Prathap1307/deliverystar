"use client";

import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <div className="flex">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col md:pl-72">
          <AdminTopbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="mx-auto flex w-full max-w-screen-2xl flex-1 px-4 pb-10 pt-24 md:px-8 md:pt-10">
            <div className="w-full space-y-6">{children}</div>
          </main>
        </div>
      </div>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
