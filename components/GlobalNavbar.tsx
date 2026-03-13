"use client";

import { Home, PlusCircle, LayoutDashboard, Settings, User, LogOut } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export function GlobalNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const tabs = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Report", icon: PlusCircle, href: "/dashboard/submit" },
  ];

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.href === pathname);
    if (index !== -1) setActiveIndex(index);
  }, [pathname]);

  const handleChange = (index: number | null) => {
    if (index !== null) {
      const tab = tabs[index];
      if (tab && 'href' in tab && tab.href) {
        router.push(tab.href);
      }
    }
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="bg-slate-950/90 backdrop-blur-2xl p-2 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <ExpandableTabs 
          tabs={tabs as any} 
          onChange={handleChange}
          activeColor="text-white"
          className="border-none shadow-none bg-transparent"
        />
      </div>
    </nav>
  );
}
