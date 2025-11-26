"use client";

import { FiBell, FiSearch, FiUser } from "react-icons/fi";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-lg shadow-slate-200/60 backdrop-blur">
      <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-3 py-2">
        <FiSearch className="h-5 w-5 text-slate-400" />
        <input
          className="w-full bg-transparent text-sm text-slate-900 outline-none"
          placeholder="Search orders, customers, items"
          aria-label="Search"
        />
      </div>
      <div className="ml-4 flex items-center gap-3">
        <button className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <FiBell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
          <FiUser />
          Admin
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;
