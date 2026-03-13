import Sidebar from "../components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-nav-bg text-white h-full flex flex-col">
        <div className="p-6 flex items-center gap-2 mb-8">
          <span className="material-symbols-outlined text-3xl">location_city</span>
          <span className="text-xl font-bold tracking-tight">CivicPulse</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-black uppercase">Admin</span>
        </div>

        <nav className="flex-grow px-4">
          <ul className="space-y-2">
            {[
              { icon: "analytics", label: "Dashboard", active: true },
              { icon: "description", label: "Complaints" },
              { icon: "query_stats", label: "Analytics" },
              { icon: "business", label: "Departments" },
              { icon: "map", label: "Wards Map" },
            ].map((item) => (
              <li key={item.label}>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active ? "bg-white/10" : "hover:bg-white/5"
                }`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 mt-auto border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium">Settings</span>
          </button>
          <button className="bg-primary/20 hover:bg-primary/30 text-white w-full py-3 rounded-xl font-bold mt-4 transition-all">
            Export Report
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-bold text-slate-900">Analytics Overview</h2>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-1 max-w-xs relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                placeholder="Search data points..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">Admin User</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-600">
                  AU
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
