import Link from "next/link";

export default function CitizenDashboard() {
  const stats = [
    { label: "Total Filed", value: "12", icon: "assignment", color: "bg-slate-900", tag: "Overall" },
    { label: "In Progress", value: "3", icon: "pending", color: "bg-primary", tag: "+1 new" },
    { label: "Resolved", value: "8", icon: "check_circle", color: "bg-sage-200", tag: "85% fix rate" },
    { label: "Escalated", value: "1", icon: "error", color: "bg-red-500", tag: "Attention" },
  ];

  const complaints = [
    {
      id: "C-123",
      category: "Sanitation",
      status: "In Progress",
      title: "Garbage Pile near Indiranagar Park",
      description: "Illegal dumping has been observed for over a week. The smell is becoming unbearable for residents nearby.",
      date: "Oct 24, 2024",
      ward: "Ward 80",
    },
    {
      id: "C-124",
      category: "Roads & Infra",
      status: "Escalated",
      title: "Deep Pothole at 100ft Road Intersection",
      description: "Large pothole causing traffic congestion and safety hazards for two-wheelers. Reported multiple times.",
      date: "Oct 18, 2024",
      ward: "Ward 80",
    },
    {
      id: "C-125",
      category: "Street Lights",
      status: "Open",
      title: "Broken Street Light - 4th Cross",
      description: "The street light pole near the bakery is flickering and mostly dark. Security concern at night.",
      date: "Oct 26, 2024",
      ward: "Ward 80",
    },
    {
      id: "C-126",
      category: "Water Supply",
      status: "Resolved",
      title: "Low Water Pressure Issue",
      description: "Residents of 2nd main were facing low water pressure. BWSSB team inspected and fixed a valve blockage.",
      date: "Oct 10, 2024",
      ward: "Ward 80",
    },
  ];

  return (
    <div className="p-12 space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-2">My Overview</h2>
          <p className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[10px]">Tracking 12 Active Issues in Namma Bengaluru</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
           <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Infrastructure Relay: Online</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color === 'bg-sage-200' ? 'bg-slate-100 text-slate-900 border border-slate-200' : stat.color + ' text-white'} p-10 rounded-[40px] shadow-2xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}>
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000 ${stat.color === 'bg-sage-200' || stat.color === 'bg-slate-100' ? 'bg-slate-900' : 'bg-white'}`}></div>
            <div className="flex justify-between items-start mb-12">
              <div className={`p-4 rounded-2xl ${stat.color === 'bg-sage-200' ? 'bg-white text-slate-400' : 'bg-white/10 text-white/60'} group-hover:text-primary transition-colors`}>
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${stat.color === 'bg-sage-200' ? 'text-slate-500' : 'text-white/60'}`}>{stat.tag}</span>
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${stat.color === 'bg-sage-200' ? 'text-slate-700' : 'text-white/80'}`}>{stat.label}</p>
            <h3 className="text-6xl font-black">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
        <div className="p-12 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic">Registry of Issues</h3>
          <div className="flex gap-4">
            <button className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">filter_list</span></button>
            <button className="p-4 bg-slate-50 rounded-2xl text-slate-600 hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">sort</span></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
              <tr>
                <th className="px-12 py-8 font-black">Ticket ID</th>
                <th className="px-12 py-8 font-black">Description</th>
                <th className="px-12 py-8 font-black">Status</th>
                <th className="px-12 py-8 font-black">Metadata</th>
                <th className="px-12 py-8 text-right font-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {complaints.map((c) => (
                <tr key={c.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-12 py-10">
                    <span className="text-xs font-black text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">{c.id}</span>
                  </td>
                  <td className="px-12 py-10">
                    <p className="font-black text-slate-800 text-sm mb-1">{c.title}</p>
                    <p className="text-xs text-slate-500 font-medium line-clamp-1 max-w-xs">{c.description}</p>
                  </td>
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${
                         c.status === "Resolved" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" :
                         c.status === "In Progress" ? "bg-primary animate-pulse" :
                         c.status === "Escalated" ? "bg-red-500" : "bg-slate-300"
                       }`}></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">{c.status}</span>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">{c.ward}</p>
                        <p className="text-[10px] font-bold text-slate-500">{c.date}</p>
                     </div>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <Link href={`/dashboard/complaint/${c.id}`}>
                      <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-900 hover:text-white flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-slate-900 rounded-[48px] p-16 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-[2s]"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full w-fit border border-white/10 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 text-glow">Community Impact</span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-[0.9] tracking-tighter">Impact <br /> Shared is Impact <br /> <span className="text-primary italic">Multiplied.</span></h2>
          <p className="text-white/60 text-lg mb-12 font-medium leading-relaxed">Your active participation helps local authorities prioritize and resolve issues faster. Invite your neighbors to join the movement.</p>
          <div className="flex gap-16">
            <div>
              <p className="text-5xl font-black mb-1">2.4k</p>
              <div className="w-8 h-1 bg-primary mb-3"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Active Users</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-1">12h</p>
              <div className="w-8 h-1 bg-primary mb-3"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Avg. Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

