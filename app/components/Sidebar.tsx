"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Sidebar() {
  const { user } = useUser();

  const menuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard", active: true },
    { icon: "description", label: "My Complaints", href: "/dashboard" }, // Pointing to main for now
    { icon: "map", label: "Ward Map", href: "/dashboard" },
    { icon: "notifications", label: "Updates", href: "/dashboard" },
  ];

  return (
    <aside className="w-64 bg-nav-bg text-white h-full flex flex-col shadow-2xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      
      <div className="p-10 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-white">location_city</span>
          <span className="text-xl font-black tracking-tighter uppercase italic text-white">Resolvr.</span>
        </div>
      </div>

      <nav className="flex-grow px-6 relative z-10">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all group ${
                  item.active ? "bg-white/10 shadow-lg text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`material-symbols-outlined ${item.active ? 'text-white' : 'group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.active ? 'text-white' : 'group-hover:text-white'}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-8 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-white shadow-lg shadow-primary/20 overflow-hidden">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user?.firstName?.charAt(0) || "U"
            )}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-white truncate">
              {user?.fullName || "Resolvr User"}
            </p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 truncate">
              {user?.primaryEmailAddress?.emailAddress || "Active Node"}
            </p>
          </div>
          <Link href="/dashboard" className="material-symbols-outlined text-sm cursor-pointer text-white/20 hover:text-white transition-colors">settings</Link>
        </div>
      </div>
    </aside>
  );
}
