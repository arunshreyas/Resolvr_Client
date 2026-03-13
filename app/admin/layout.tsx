import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background-light overflow-hidden selection:bg-primary/30">
      <aside className="w-72 bg-nav-bg text-white h-full flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        
        <div className="p-12 mb-10 relative z-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-primary">location_city</span>
            <div className="flex flex-col -gap-1">
              <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-900 group-hover:text-primary transition-colors duration-500">Resolvr.</span>
              <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest text-primary w-fit">Central Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-8 relative z-10">
          <ul className="space-y-4">
            {[
              { icon: "analytics", label: "Intelligence", active: true },
              { icon: "description", label: "Registry" },
              { icon: "query_stats", label: "Forecasting" },
              { icon: "business", label: "Departments" },
              { icon: "map", label: "Ward Grid" },
            ].map((item) => (
              <li key={item.label}>
                <button className={`w-full flex items-center justify-between px-6 py-4 rounded-[24px] transition-all group ${
                  item.active ? "bg-white/10 shadow-lg text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}>
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined ${item.active ? 'text-primary' : 'group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.active ? 'text-white' : 'group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  </div>
                  {item.active && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(132,147,74,1)]"></div>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-10 border-t border-white/5 relative z-10">
          <button className="flex items-center gap-4 w-full px-6 py-4 hover:bg-white/5 rounded-2xl transition-colors text-white/40 hover:text-white group">
            <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">settings</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Core Config</span>
          </button>
          <button className="bg-primary/20 hover:bg-primary text-white w-full py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest mt-6 transition-all shadow-lg hover:shadow-primary/20">
            Export Insights
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-28 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-12 shrink-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 italic">Urban Analytics</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aggregated Neural Metrics for Oct 2024</p>
          </div>
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Infrastructure Relay</span>
            </div>
            <div className="flex items-center gap-6 pl-10 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Nagaraj S.</p>
                  <p className="text-[8px] text-primary uppercase tracking-[0.2em] font-black">Level-4 Executive</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-slate-900 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center font-black text-primary text-xl italic transition-transform hover:rotate-6 cursor-pointer">
                  NS
                </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}

