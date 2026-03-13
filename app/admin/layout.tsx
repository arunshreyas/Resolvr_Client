"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "analytics", label: "Intelligence", href: "/admin" },
  { icon: "description", label: "Registry", href: "/admin/registry" },
  { icon: "query_stats", label: "Forecasting", href: "/admin/forecasting" },
  { icon: "business", label: "Departments", href: "/admin/departments" },
  { icon: "map", label: "Ward Grid", href: "/admin/ward-grid" },
];

const headingMap: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Urban Intelligence",
    subtitle: "Live operational metrics from complaints and users",
  },
  "/admin/registry": {
    title: "Complaint Registry",
    subtitle: "Search and act on the live complaint queue",
  },
  "/admin/forecasting": {
    title: "Forecasting",
    subtitle: "Volume projections and risk signals from recent activity",
  },
  "/admin/departments": {
    title: "Departments",
    subtitle: "Operational load by inferred civic department",
  },
  "/admin/ward-grid": {
    title: "Ward Grid",
    subtitle: "Spatial concentration across mapped complaint clusters",
  },
  "/admin/core-config": {
    title: "Core Config",
    subtitle: "Admin-side controls and dashboard preferences",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const heading = headingMap[pathname] || headingMap["/admin"];

  return (
    <div className="flex h-screen overflow-hidden bg-background-light selection:bg-primary/30">
      <aside className="w-72 bg-nav-bg text-white h-full flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

        <div className="p-12 mb-10 relative z-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-primary">
              location_city
            </span>
            <div>
              <span className="text-2xl font-black tracking-tighter italic text-slate-900">
                Resolvr.
              </span>
              <span className="dm-sans-ui mt-1 block w-fit rounded-full bg-white/10 px-2 py-1 text-[11px] font-medium text-primary">
                Central Admin
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-8 relative z-10">
          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-[24px] px-6 py-4 transition-all group ${
                      isActive
                        ? "bg-white/10 shadow-lg text-white"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`material-symbols-outlined ${
                          isActive ? "text-primary" : "group-hover:text-white"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="dm-sans-ui text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                    {isActive ? (
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(132,147,74,1)]"></div>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-10 border-t border-white/5 relative z-10">
          <Link
            href="/admin/core-config"
            className={`flex items-center gap-4 w-full rounded-2xl px-6 py-4 transition-colors ${
              pathname === "/admin/core-config"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="dm-sans-ui text-sm font-medium">Core Config</span>
          </Link>
          <Link
            href="/admin/registry"
            className="dm-sans-ui mt-6 block w-full rounded-[20px] bg-primary/20 px-6 py-4 text-center text-sm font-medium text-white transition-all hover:bg-primary"
          >
            Export Insights
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-28 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-12 shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 italic">
              {heading.title}
            </h2>
            <p className="dm-sans-ui text-sm font-medium text-slate-400">
              {heading.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="dm-sans-ui text-sm font-medium text-slate-500">
                Live infrastructure relay
              </span>
            </div>
            <div className="flex items-center gap-6 pl-10 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="dm-sans-ui text-sm font-medium text-slate-900">
                  Nagaraj S.
                </p>
                <p className="dm-sans-ui text-xs font-medium text-primary">
                  Level-4 Executive
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center font-black text-primary text-xl italic">
                NS
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50/50">{children}</main>
      </div>
    </div>
  );
}
