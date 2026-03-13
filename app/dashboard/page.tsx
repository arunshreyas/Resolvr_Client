export default function CitizenDashboard() {
  const stats = [
    { label: "Total Filed", value: "12", icon: "assignment", color: "blue", tag: "Overall" },
    { label: "In Progress", value: "3", icon: "pending", color: "amber", tag: "+1 new" },
    { label: "Resolved", value: "8", icon: "check_circle", color: "green", tag: "85% fix rate" },
    { label: "Escalated", value: "1", icon: "error", color: "red", tag: "Attention" },
  ];

  const complaints = [
    {
      id: "C-123",
      category: "Sanitation",
      status: "In Progress",
      title: "Garbage Pile near Indiranagar Park",
      description: "Illegal dumping has been observed for over a week. The smell is becoming unbearable for residents nearby.",
      date: "Oct 24, 2023",
      ward: "Ward 80",
    },
    {
      id: "C-124",
      category: "Roads & Infra",
      status: "Escalated",
      title: "Deep Pothole at 100ft Road Intersection",
      description: "Large pothole causing traffic congestion and safety hazards for two-wheelers. Reported multiple times.",
      date: "Oct 18, 2023",
      ward: "Ward 80",
    },
    {
      id: "C-125",
      category: "Street Lights",
      status: "Open",
      title: "Broken Street Light - 4th Cross",
      description: "The street light pole near the bakery is flickering and mostly dark. Security concern at night.",
      date: "Oct 26, 2023",
      ward: "Ward 80",
    },
    {
      id: "C-126",
      category: "Water Supply",
      status: "Resolved",
      title: "Low Water Pressure Issue",
      description: "Residents of 2nd main were facing low water pressure. BWSSB team inspected and fixed a valve blockage.",
      date: "Oct 10, 2023",
      ward: "Ward 80",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Citizen Dashboard</h1>
        <p className="text-slate-500 mt-2">Welcome back. You have 3 complaints currently in progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-50 text-slate-400 shadow-sm`}>{stat.tag}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-4xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">My Recent Complaints</h2>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Active</span>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">sort</span>
              Newest
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {complaints.map((c) => (
            <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-slate-100 text-[10px] font-bold uppercase tracking-widest text-slate-500 px-2 py-1 rounded">
                  {c.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1 ${
                  c.status === "In Progress" ? "bg-blue-50 text-blue-500" :
                  c.status === "Escalated" ? "bg-red-50 text-red-500" :
                  c.status === "Resolved" ? "bg-green-50 text-green-500" :
                  "bg-amber-50 text-amber-500"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {c.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2">{c.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">calendar_today</span>
                    {c.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    {c.ward}
                  </div>
                </div>
                <button className="flex items-center gap-1 text-primary hover:gap-2 transition-all">
                  Details
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-nav-bg rounded-3xl p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-4xl font-black mb-4 leading-tight">Making Bengaluru Better</h2>
          <p className="text-white/80 text-lg mb-8">Your active participation helps local authorities prioritize and resolve issues faster. Invite your neighbors to join CivicPulse.</p>
          <div className="flex gap-12">
            <div>
              <p className="text-4xl font-black mb-1">2.4k</p>
              <p className="text-xs uppercase tracking-widest opacity-60">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-black mb-1">12h</p>
              <p className="text-xs uppercase tracking-widest opacity-60">Avg. Response</p>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 translate-x-1/2"></div>
      </div>
    </div>
  );
}
