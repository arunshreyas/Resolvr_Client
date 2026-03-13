import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard", active: true },
    { icon: "description", label: "My Complaints", href: "/dashboard/complaints" },
    { icon: "map", label: "Ward Map", href: "/dashboard/map" },
    { icon: "notifications", label: "Updates", href: "/dashboard/updates" },
  ];

  return (
    <aside className="w-64 bg-nav-bg text-white h-full flex flex-col">
      <div className="p-6 flex items-center gap-2 mb-8">
        <span className="material-symbols-outlined text-3xl">location_city</span>
        <span className="text-xl font-bold tracking-tight">CivicPulse</span>
      </div>

      <nav className="flex-grow px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-600 font-bold">
            JD
          </div>
          <div className="flex-grow">
            <p className="text-sm font-bold truncate">Jayanth Das</p>
            <p className="text-xs text-white/60 truncate">Indiranagar Ward</p>
          </div>
          <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white/80 transition-colors">settings</span>
        </div>
      </div>
    </aside>
  );
}
