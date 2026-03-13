"use client";

import { useEffect, useState } from "react";

type AdminConfig = {
  showResolvedOnMap: boolean;
  autoRefreshAdmin: boolean;
  highlightRiskQueue: boolean;
};

const defaultConfig: AdminConfig = {
  showResolvedOnMap: true,
  autoRefreshAdmin: false,
  highlightRiskQueue: true,
};

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between rounded-[28px] border border-slate-100 bg-white px-5 py-5 shadow-sm"
    >
      <span className="dm-sans-ui text-sm font-medium text-slate-700">
        {label}
      </span>
      <span
        className={`relative h-8 w-14 rounded-full ${
          checked ? "bg-primary" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        ></span>
      </span>
    </button>
  );
}

export default function AdminCoreConfigPage() {
  const [config, setConfig] = useState(defaultConfig);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("resolvr-admin-config");
    if (stored) {
      setConfig({ ...defaultConfig, ...(JSON.parse(stored) as AdminConfig) });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("resolvr-admin-config", JSON.stringify(config));
    setSaved(true);
    const timer = window.setTimeout(() => setSaved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [config]);

  return (
    <div className="space-y-8 p-12">
      <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black tracking-tighter text-slate-900">
          Admin Preferences
        </h2>
        <p className="dm-sans-ui mt-3 text-sm text-slate-500">
          Local admin configuration for this dashboard session.
        </p>
        <p className="dm-sans-ui mt-3 text-sm font-medium text-primary">
          {saved ? "Saved" : "Stable"}
        </p>
      </div>

      <div className="grid gap-4">
        <Toggle
          label="Show resolved complaints on ward map"
          checked={config.showResolvedOnMap}
          onChange={(value) =>
            setConfig((current) => ({ ...current, showResolvedOnMap: value }))
          }
        />
        <Toggle
          label="Enable auto refresh for admin views"
          checked={config.autoRefreshAdmin}
          onChange={(value) =>
            setConfig((current) => ({ ...current, autoRefreshAdmin: value }))
          }
        />
        <Toggle
          label="Highlight risk queue by default"
          checked={config.highlightRiskQueue}
          onChange={(value) =>
            setConfig((current) => ({ ...current, highlightRiskQueue: value }))
          }
        />
      </div>
    </div>
  );
}
