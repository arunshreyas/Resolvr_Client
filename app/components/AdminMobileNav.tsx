"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: "analytics", label: "Intelligence", href: "/admin" },
    { icon: "description", label: "Registry", href: "/admin/registry" },
    { icon: "query_stats", label: "Forecasting", href: "/admin/forecasting" },
    { icon: "business", label: "Departments", href: "/admin/departments" },
    { icon: "map", label: "Ward Grid", href: "/admin/ward-grid" },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-primary"
      >
        <span className="material-symbols-outlined text-[24px]">
          {isOpen ? "close" : "menu"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full px-4 z-50">
          <div className="bg-nav-bg text-white rounded-[32px] p-6 shadow-2xl flex flex-col gap-4">
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 rounded-[20px] px-5 py-4 transition-all ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined ${
                            isActive ? "text-primary" : ""
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="dm-sans-ui text-sm font-bold">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-white/10 pt-4">
              <Link
                href="/admin/registry"
                onClick={() => setIsOpen(false)}
                className="dm-sans-ui block w-full rounded-[16px] bg-primary/20 px-6 py-4 text-center text-sm font-bold text-white transition-all hover:bg-primary"
              >
                Export Insights
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
