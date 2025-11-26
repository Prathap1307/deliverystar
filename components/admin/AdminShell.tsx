"use client";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-8">
      <div className="hidden md:block md:w-64">
        <AdminSidebar />
      </div>
      <div className="flex-1 space-y-4">
        <div className="md:hidden">
          <AdminSidebar />
        </div>
        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}

export default AdminShell;
