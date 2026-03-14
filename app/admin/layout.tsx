"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BGPattern } from "@/components/ui/bg-pattern";
import { UserButton } from "@clerk/nextjs";
import AdminMobileNav from "../components/AdminMobileNav";

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
      <aside className="hidden lg:flex w-72 bg-nav-bg text-white h-full flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

        <Link
          href="/"
          className="py-12 relative z-10 flex justify-center items-center"
        >
          <img
            src="/assets/resolver_logo.png"
            alt="Resolvr. Logo"
            className="w-12 h-12 object-contain invert brightness-0"
          />
        </Link>

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

        <div className="p-10 border-t border-white/5 relative z-10 flex justify-center">
          <Link
            href="/admin/registry"
            className="dm-sans-ui block w-full rounded-[20px] bg-primary/20 px-6 py-4 text-center text-sm font-medium text-white transition-all hover:bg-primary"
          >
            Export Insights
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 lg:h-28 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 lg:px-12 shrink-0 z-50">
          <div className="flex items-center gap-4">
            <AdminMobileNav />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl lg:text-3xl font-black tracking-tighter text-slate-900 italic line-clamp-1">
                {heading.title}
              </h2>
              <p className="hidden sm:block dm-sans-ui text-xs lg:text-sm font-medium text-slate-400">
                {heading.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="dm-sans-ui text-sm font-medium text-slate-500">
                Live infrastructure relay
              </span>
            </div>
            <div className="flex items-center gap-4 lg:gap-6 lg:pl-10 lg:border-l border-slate-100">
               <Link
                 href="/dashboard/settings"
                 aria-label="Open local settings"
                 className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-primary"
               >
                 <span className="material-symbols-outlined text-[22px]">
                   computer
                 </span>
               </Link>
               <UserButton
                 appearance={{
                   elements: {
                     userButtonAvatarBox: "w-12 h-12 rounded-2xl",
                     userButtonTrigger: "focus:shadow-none focus:outline-none"
                   }
                 }}
               />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50/50 relative">
          <BGPattern
            variant="grid"
            mask="fade-bottom"
            size={45}
            fill="rgba(132,147,74,0.15)"
            className="pointer-events-none absolute inset-0 z-0"
          />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
