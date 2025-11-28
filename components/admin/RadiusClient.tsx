"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import AdminBadge from "./AdminBadge";
import AdminCard from "./AdminCard";
import AdminFormField from "./AdminFormField";
import AdminPageTitle from "./AdminPageTitle";
import AdminShell from "./AdminShell";

interface Zone {
  id: string;
  name: string;
  lat: string;
  lng: string;
  radius: string;
}

interface Props {
  initialZones: Zone[];
}

export default function RadiusClient({ initialZones }: Props) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [draft, setDraft] = useState<Zone>(() => ({ id: crypto.randomUUID(), name: "", lat: "", lng: "", radius: "" }));

  const persistZones = async (nextZones: Zone[]) => {
    setZones(nextZones);
    await fetch("/api/admin/settings/radius-zones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextZones),
    });
  };

  return (
    <AdminShell>
        <AdminPageTitle
          title="Radius"
          description="Define named delivery zones with center points."
          action={
            <button
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md"
              onClick={() => persistZones(zones)}
            >
              Save zones
            </button>
          }
        />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Create zone" description="Name, center point, and radius in miles">
          <div className="space-y-4">
            <AdminFormField
              label="Name"
              placeholder="Luton Interchange Zone"
              value={draft.name}
              onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
            />
            <AdminFormField
              label="Center latitude"
              placeholder="51.8787"
              value={draft.lat}
              onChange={(e) => setDraft((prev) => ({ ...prev, lat: e.target.value }))}
            />
            <AdminFormField
              label="Center longitude"
              placeholder="-0.4200"
              value={draft.lng}
              onChange={(e) => setDraft((prev) => ({ ...prev, lng: e.target.value }))}
            />
            <AdminFormField
              label="Radius (miles)"
              placeholder="5"
              value={draft.radius}
              onChange={(e) => setDraft((prev) => ({ ...prev, radius: e.target.value }))}
            />
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
              onClick={() => {
                const nextZones = [...zones, { ...draft, id: crypto.randomUUID() }];
                setDraft({ id: crypto.randomUUID(), name: "", lat: "", lng: "", radius: "" });
                void persistZones(nextZones);
              }}
            >
              <FiPlus /> Add zone
            </button>
          </div>
        </AdminCard>

        <AdminCard title="Saved delivery zones" description="UI only – no maps or API calls">
          <div className="space-y-3">
            {zones.map((zone) => (
              <div key={zone.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{zone.name}</p>
                  <p className="text-xs text-slate-500">Lat {zone.lat}, Lng {zone.lng}</p>
                  <p className="text-xs text-slate-500">Radius: {zone.radius} miles</p>
                </div>
                <AdminBadge label="Active" tone="info" />
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
