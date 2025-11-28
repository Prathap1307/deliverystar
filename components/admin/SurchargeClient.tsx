"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminFormField from "./AdminFormField";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";

interface SurchargeRule {
  id: string;
  reason: string;
  price: string;
}

interface Props {
  initialRules: SurchargeRule[];
}

export default function SurchargeClient({ initialRules }: Props) {
  const [rules, setRules] = useState<SurchargeRule[]>(initialRules);
  const [draft, setDraft] = useState<SurchargeRule>(() => ({ id: crypto.randomUUID(), reason: "", price: "" }));

  const persistRules = async (nextRules: SurchargeRule[]) => {
    setRules(nextRules);
    await fetch("/api/admin/settings/surcharge-rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextRules),
    });
  };

  return (
    <AdminShell>
      <AdminPageTitle
        title="Surcharge"
        description="Configure additional charges for weather or conditions."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Add surcharge condition" description="Reason and additional price">
          <div className="space-y-4">
            <AdminFormField
              label="Reason"
              placeholder="Rain"
              value={draft.reason}
              onChange={(e) => setDraft((prev) => ({ ...prev, reason: e.target.value }))}
            />
            <AdminFormField
              label="Additional price"
              type="number"
              placeholder="1.50"
              value={draft.price}
              onChange={(e) => setDraft((prev) => ({ ...prev, price: e.target.value }))}
            />
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
              onClick={() => {
                const nextRules = [...rules, { ...draft, id: crypto.randomUUID() }];
                setDraft({ id: crypto.randomUUID(), reason: "", price: "" });
                void persistRules(nextRules);
              }}
            >
              <FiPlus /> Add surcharge
            </button>
          </div>
        </AdminCard>

        <AdminCard title="Existing surcharges" description="UI only – no backend">
          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{rule.reason}</p>
                  <p className="text-xs text-slate-500">+£{rule.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AdminBadge label="Surcharge" tone="danger" />
                  <button
                    className="rounded-lg bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                    onClick={() =>
                      persistRules(
                        rules.filter((entry) => entry.id !== rule.id),
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
