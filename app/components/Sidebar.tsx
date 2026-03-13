"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "description", label: "Complaints", href: "/dashboard/complaints" },
    { icon: "map", label: "Map", href: "/dashboard/map" },
    { icon: "add_circle", label: "Submit", href: "/dashboard/submit" },
    { icon: "settings", label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside
      className={`${
        isExpanded ? "w-72" : "w-24"
      } bg-nav-bg text-white h-full shrink-0 flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      
      <div className="py-12 relative z-10 flex justify-center items-center transition-all duration-300">
        <img 
          src="/assets/resolver_logo.png" 
          alt="Resolvr. Logo" 
          className={`w-12 h-12 object-contain invert brightness-0 transition-transform duration-300 ${
            isExpanded ? "scale-110" : ""
          }`}
        />
      </div>

      <nav className="flex-grow px-6 relative z-10">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
            <li key={`${item.label}-${item.href}`}>
              <Link
                href={item.href}
                className={`flex items-center ${
                  isExpanded ? "justify-start gap-4 px-6" : "justify-center gap-0 px-0"
                } py-4 rounded-[20px] transition-all group ${
                  isActive ? "bg-white/10 shadow-lg text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`material-symbols-outlined !text-[28px] ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <span
                  className={`dm-sans-ui overflow-hidden transition-all duration-300 whitespace-nowrap text-lg font-bold ${
                    isExpanded ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
                  } ${isActive ? "text-white" : "group-hover:text-white"}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </nav>

      <div className={`border-t border-white/5 relative z-10 transition-all duration-300 ${isExpanded ? "p-8" : "p-6"}`}>
        <div
          className={`flex items-center rounded-2xl bg-white/5 border border-white/5 shadow-inner transition-all duration-300 ${
            isExpanded
              ? "justify-start gap-4 p-4"
              : "justify-center gap-0 p-0"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-white shadow-lg shadow-primary/20 overflow-hidden">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.firstName?.charAt(0) || "U"
            )}
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 flex-grow min-w-0 ${
              isExpanded ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <p className="dm-sans-ui text-sm font-medium text-white truncate">
              {user?.fullName || "Your profile"}
            </p>
            <p className="dm-sans-ui text-xs font-medium text-white/55 truncate">
              {user?.primaryEmailAddress?.emailAddress || "Signed in"}
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className={`material-symbols-outlined text-sm cursor-pointer text-white/20 hover:text-white overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-w-10 opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            settings
          </Link>
        </div>
      </div>
    </aside>
  );
}
