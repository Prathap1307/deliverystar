"use client";

import { FiX } from "react-icons/fi";

interface AdminModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AdminModal({ title, open, onClose, children, footer }: AdminModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <FiX className="h-5 w-5" />
        </button>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-6 flex items-center justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

export default AdminModal;
