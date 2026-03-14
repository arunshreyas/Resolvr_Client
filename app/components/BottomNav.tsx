"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const menuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "description", label: "Complaints", href: "/dashboard/complaints" },
    { icon: "forum", label: "Feedback", href: "/dashboard/feedback" },
    { icon: "map", label: "Map", href: "/dashboard/map" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-nav-bg text-white shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:hidden z-50 px-4 py-2 border-t border-white/5 pb-safe">
      <ul className="flex items-center justify-between">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-white/40 hover:text-white"
                }`}
              >
                <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isActive ? 'bg-white/10' : ''}`}>
                  <span className={`material-symbols-outlined !text-[24px]`}>
                    {item.icon}
                  </span>
                </div>
                <span className={`dm-sans-ui text-[10px] font-bold mt-1 ${isActive ? "text-white" : ""}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
