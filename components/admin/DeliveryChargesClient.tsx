"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminFormField from "./AdminFormField";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";

interface Rule {
  id: string;
  miles: string;
  price: string;
  timeWindow: string;
}

interface Props {
  initialRules: Rule[];
}

export default function DeliveryChargesClient({ initialRules }: Props) {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [draft, setDraft] = useState<Rule>(() => ({ id: crypto.randomUUID(), miles: "", price: "", timeWindow: "" }));

  const persistRules = async (nextRules: Rule[]) => {
    setRules(nextRules);
    await fetch("/api/admin/settings/delivery-charges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextRules),
    });
  };

  return (
    <AdminShell>
      <AdminPageTitle
        title="Delivery Charge"
        description="Add rules by miles and optionally specify time-based pricing."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Add rule" description="Miles range, price, and time window">
          <div className="space-y-4">
            <AdminFormField
              label="Miles range"
              placeholder="0-5 miles"
              value={draft.miles}
              onChange={(e) => setDraft((prev) => ({ ...prev, miles: e.target.value }))}
            />
            <AdminFormField
              label="Price"
              type="number"
              placeholder="4.99"
              value={draft.price}
              onChange={(e) => setDraft((prev) => ({ ...prev, price: e.target.value }))}
            />
            <AdminFormField
              label="Time window"
              placeholder="08:00-20:00"
              value={draft.timeWindow}
              onChange={(e) => setDraft((prev) => ({ ...prev, timeWindow: e.target.value }))}
              hint="Optional for time-based delivery price"
            />
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
              onClick={() => {
                const nextRules = [...rules, { ...draft, id: crypto.randomUUID() }];
                setDraft({ id: crypto.randomUUID(), miles: "", price: "", timeWindow: "" });
                void persistRules(nextRules);
              }}
            >
              <FiPlus /> Add rule
            </button>
          </div>
        </AdminCard>

        <AdminCard title="Saved rules" description="UI only – no backend calls">
          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{rule.miles}</p>
                  <p className="text-xs text-slate-500">£{rule.price} • {rule.timeWindow || "Anytime"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AdminBadge label="Delivery" tone="info" />
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
