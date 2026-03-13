"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

type SettingsState = {
  emailAlerts: boolean;
  pushAlerts: boolean;
  weeklyDigest: boolean;
  shareLocationByDefault: boolean;
  showResolvedOnMap: boolean;
  compactDashboard: boolean;
};

const defaultSettings: SettingsState = {
  emailAlerts: true,
  pushAlerts: true,
  weeklyDigest: false,
  shareLocationByDefault: true,
  showResolvedOnMap: true,
  compactDashboard: false,
};

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-5 rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-5">
      <div className="min-w-0">
        <p className="text-lg font-black text-slate-900">{label}</p>
        <p className="dm-sans-ui mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        ></span>
      </button>
    </div>
  );
}

export default function DashboardSettingsPage() {
  const { user } = useUser();
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("resolvr-dashboard-settings");

    if (stored) {
      try {
        setSettings({
          ...defaultSettings,
          ...(JSON.parse(stored) as Partial<SettingsState>),
        });
      } catch {
        setSettings(defaultSettings);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(
      "resolvr-dashboard-settings",
      JSON.stringify(settings),
    );
    setSaved(true);

    const timer = window.setTimeout(() => {
      setSaved(false);
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [loaded, settings]);

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Citizen";

  return (
    <div className="p-12 space-y-10">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="dm-sans-ui mb-3 text-sm font-medium text-primary">
            Account controls
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">
            Settings
          </h1>
          <p className="dm-sans-ui mt-3 max-w-2xl text-sm text-slate-500">
            Manage your profile details, complaint preferences, alerts, and
            privacy options from one place.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm">
            <p className="dm-sans-ui text-sm font-medium text-slate-500">
              {saved ? "Preferences saved" : "All changes local and instant"}
            </p>
          </div>
          <Link
            href="/dashboard/submit"
            className="dm-sans-ui inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-medium text-white shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-base">
              add_circle
            </span>
            New complaint
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <section className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-[24px] bg-primary text-3xl font-black text-white shadow-lg shadow-primary/20">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    displayName.charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-3xl font-black tracking-tighter text-slate-900">
                    {displayName}
                  </p>
                  <p className="dm-sans-ui mt-2 text-sm text-slate-500">
                    {user?.primaryEmailAddress?.emailAddress || "No email available"}
                  </p>
                </div>
              </div>
              <Link
                href="/user"
                className="dm-sans-ui inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-base">person</span>
                Open Clerk account
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="dm-sans-ui text-xs font-medium text-slate-400">
                  Full name
                </p>
                <p className="mt-2 text-lg font-black text-slate-900">
                  {user?.fullName || "Not set yet"}
                </p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="dm-sans-ui text-xs font-medium text-slate-400">
                  Primary email
                </p>
                <p className="mt-2 text-lg font-black text-slate-900 break-all">
                  {user?.primaryEmailAddress?.emailAddress || "Unavailable"}
                </p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="dm-sans-ui text-xs font-medium text-slate-400">
                  Account id
                </p>
                <p className="mt-2 text-sm font-black text-slate-900 break-all">
                  {user?.id || "Unavailable"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <div className="mb-6">
              <h2 className="text-3xl font-black tracking-tighter text-slate-900">
                Notification Preferences
              </h2>
              <p className="dm-sans-ui mt-2 text-sm text-slate-500">
                Choose how Resolvr should keep you updated on complaint changes.
              </p>
            </div>
            <div className="grid gap-4">
              <SettingToggle
                label="Email alerts"
                description="Receive complaint status updates and confirmations by email."
                checked={settings.emailAlerts}
                onChange={(value) =>
                  setSettings((current) => ({ ...current, emailAlerts: value }))
                }
              />
              <SettingToggle
                label="Push-style alerts"
                description="Highlight urgent updates and active complaint movement inside the dashboard."
                checked={settings.pushAlerts}
                onChange={(value) =>
                  setSettings((current) => ({ ...current, pushAlerts: value }))
                }
              />
              <SettingToggle
                label="Weekly summary"
                description="Get a short weekly digest of the complaints you filed and their latest status."
                checked={settings.weeklyDigest}
                onChange={(value) =>
                  setSettings((current) => ({ ...current, weeklyDigest: value }))
                }
              />
            </div>
          </section>

          <section className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <div className="mb-6">
              <h2 className="text-3xl font-black tracking-tighter text-slate-900">
                Privacy and Tracking
              </h2>
              <p className="dm-sans-ui mt-2 text-sm text-slate-500">
                Control how location and complaint visibility behave in your
                dashboard experience.
              </p>
            </div>
            <div className="grid gap-4">
              <SettingToggle
                label="Share location by default"
                description="Keep location capture enabled when opening the complaint form."
                checked={settings.shareLocationByDefault}
                onChange={(value) =>
                  setSettings((current) => ({
                    ...current,
                    shareLocationByDefault: value,
                  }))
                }
              />
              <SettingToggle
                label="Show resolved complaints on map"
                description="Include resolved complaints in the map view alongside active ones."
                checked={settings.showResolvedOnMap}
                onChange={(value) =>
                  setSettings((current) => ({
                    ...current,
                    showResolvedOnMap: value,
                  }))
                }
              />
              <SettingToggle
                label="Compact dashboard layout"
                description="Prefer tighter spacing and denser cards for quicker scanning."
                checked={settings.compactDashboard}
                onChange={(value) =>
                  setSettings((current) => ({
                    ...current,
                    compactDashboard: value,
                  }))
                }
              />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-[40px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300/20">
            <p className="dm-sans-ui text-sm font-medium text-white/60">
              Profile health
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tighter">
              Ready for citizen reporting
            </h2>
            <p className="dm-sans-ui mt-4 text-sm leading-7 text-white/75">
              Your account is connected to Clerk, and complaint identity is
              synced through your backend user record automatically.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[28px] bg-white/8 px-5 py-4">
                <p className="dm-sans-ui text-xs font-medium text-white/45">
                  Auth provider
                </p>
                <p className="mt-2 text-lg font-black">Clerk</p>
              </div>
              <div className="rounded-[28px] bg-white/8 px-5 py-4">
                <p className="dm-sans-ui text-xs font-medium text-white/45">
                  Synced email
                </p>
                <p className="mt-2 text-lg font-black break-all">
                  {user?.primaryEmailAddress?.emailAddress || "Unavailable"}
                </p>
              </div>
              <div className="rounded-[28px] bg-white/8 px-5 py-4">
                <p className="dm-sans-ui text-xs font-medium text-white/45">
                  Preferences state
                </p>
                <p className="mt-2 text-lg font-black">
                  {saved ? "Saved" : "Stable"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">
              Quick Actions
            </h2>
            <div className="mt-6 grid gap-4">
              <Link
                href="/dashboard/complaints"
                className="flex items-center justify-between rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100"
              >
                <div>
                  <p className="text-lg font-black text-slate-900">
                    Review complaints
                  </p>
                  <p className="dm-sans-ui mt-1 text-sm text-slate-500">
                    Browse your complaint history and updates.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/dashboard/map"
                className="flex items-center justify-between rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100"
              >
                <div>
                  <p className="text-lg font-black text-slate-900">Open map</p>
                  <p className="dm-sans-ui mt-1 text-sm text-slate-500">
                    See your location-based complaints on the map.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400">
                  map
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-[40px] border border-rose-100 bg-rose-50 p-8 shadow-xl shadow-rose-100/40">
            <h2 className="text-3xl font-black tracking-tighter text-rose-700">
              Sensitive Changes
            </h2>
            <p className="dm-sans-ui mt-3 text-sm leading-7 text-rose-600">
              Email, password, and identity details are managed in Clerk. Use
              the Clerk account screen for sensitive account actions.
            </p>
            <Link
              href="/user"
              className="dm-sans-ui mt-6 inline-flex items-center gap-3 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-medium text-white"
            >
              <span className="material-symbols-outlined text-base">shield</span>
              Manage secure account settings
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
