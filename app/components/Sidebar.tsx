"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard" },
    { icon: "description", label: "Complaints", href: "/dashboard/complaints" },
    { icon: "forum", label: "Feedback", href: "/dashboard/feedback" },
    { icon: "map", label: "Map", href: "/dashboard/map" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 288 : 96 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex bg-nav-bg text-white h-full shrink-0 flex-col shadow-2xl relative overflow-hidden"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      
      <Link
        href="/"
        className="py-12 relative z-10 flex justify-center items-center"
      >
        <motion.img
          animate={{ scale: isExpanded ? 1.1 : 1 }}
          src="/assets/resolver_logo.png"
          alt="Resolvr. Logo"
          className="w-12 h-12 object-contain invert brightness-0"
        />
      </Link>

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
                  className={`flex items-center rounded-[20px] transition-all group relative ${
                    isExpanded ? "justify-start gap-4 px-6" : "justify-center gap-0 px-0"
                  } py-4 ${
                    isActive ? "text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 shadow-lg rounded-[20px] z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`material-symbols-outlined !text-[28px] relative z-10 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`dm-sans-ui overflow-hidden whitespace-nowrap text-lg font-bold relative z-10 ${
                          isActive ? "text-white" : "group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
}

