export default function AdminDashboard() {
  const stats = [
    { label: "Neural Registry", value: "14.2k", tag: "+12.4%", status: "success", icon: "analytics" },
    { label: "Active Nodes", value: "3,120", tag: "Stable", status: "neutral", icon: "hub" },
    { label: "Resolution Flux", value: "10.4k", tag: "+8.2%", status: "success", icon: "dynamic_feed" },
    { label: "System Alerts", value: "675", tag: "Critical", status: "danger", icon: "emergency_home" },
  ];

  return (
    <div className="p-12 space-y-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 ${
             stat.status === 'danger' ? 'bg-slate-900 border-none' : ''
          }`}>
            <div className="flex justify-between items-start mb-10">
              <div className={`p-4 rounded-2xl ${stat.status === 'danger' ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors'}`}>
                 <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${
                stat.status === 'success' ? 'bg-green-50 text-green-600' :
                stat.status === 'danger' ? 'bg-red-500/20 text-red-500' :
                'bg-slate-100 text-slate-500'
              }`}>{stat.tag}</span>
            </div>
            <p className={`${stat.status === 'danger' ? 'text-white/60' : 'text-slate-600'} text-[10px] font-black uppercase tracking-[0.3em] mb-2`}>
              {stat.label}
            </p>
            <h3 className={`text-5xl font-black ${stat.status === 'danger' ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Resolution Rate by Department */}
        <div className="lg:col-span-2 bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/20">
          <div className="flex items-center justify-between mb-12">
            <div>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Institutional Yield</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Resolution efficiency by primary department</p>
            </div>
            <select className="bg-slate-50 border-none text-[10px] font-black uppercase tracking-widest rounded-xl px-6 py-3 cursor-pointer outline-none hover:bg-slate-100 transition-colors">
              <option>Oct 2024</option>
              <option>Sept 2024</option>
            </select>
          </div>
          <div className="space-y-10">
            {[
              { name: "Waste Management (BBMP)", rate: 92, color: "bg-primary" },
              { name: "Water Supply (BWSSB)", rate: 78, color: "bg-primary/70" },
              { name: "Electricity (BESCOM)", rate: 85, color: "bg-primary/80" },
              { name: "Road Maintenance", rate: 45, color: "bg-slate-200" },
            ].map((dept) => (
              <div key={dept.name} className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 italic">{dept.name}</span>
                  <span className={`text-[10px] font-black ${dept.rate < 50 ? 'text-red-500' : 'text-slate-600'}`}>{dept.rate}%</span>
                </div>
                <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                  <div 
                    className={`h-full ${dept.color} transition-all duration-[2s] ease-out shadow-[0_0_10px_rgba(132,147,74,0.3)]`} 
                    style={{ width: `${dept.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution Chart Mockup */}
        <div className="bg-slate-900 p-12 rounded-[56px] shadow-2xl shadow-slate-900/40 flex flex-col items-center">
            <h3 className="text-2xl font-black tracking-tighter uppercase italic text-white w-full text-left mb-12">Issue Density</h3>
            <div className="relative w-56 h-56 flex items-center justify-center mb-12">
                <div className="absolute inset-0 border-[30px] border-primary rounded-full opacity-10"></div>
                <div className="absolute inset-0 border-[30px] border-primary border-t-transparent border-l-transparent rounded-full rotate-45 shadow-[0_0_20px_rgba(132,147,74,0.4)]"></div>
                <div className="text-center">
                    <p className="text-5xl font-black text-white">14k</p>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.3em] mt-1">Total</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full">
                {[
                    { label: "Infrastructure", val: "45%", dot: "bg-primary" },
                    { label: "Utility", val: "25%", dot: "bg-primary/60" },
                    { label: "Sanitation", val: "20%", dot: "bg-white/10" },
                    { label: "Secondary", val: "10%", dot: "bg-white/5" },
                ].map(cat => (
                    <div key={cat.label} className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${cat.dot}`}></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{cat.val}</span>
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/40 ml-4">{cat.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Map Heatmap Mockup */}
      <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden group">
          <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Spatial Intelligence</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Real-time ticket density across Bengaluru zones</p>
              </div>
              <div className="flex gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-sm">filter_alt</span>
                </div>
                <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">Expand Matrix</button>
              </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-12">
              <div className="lg:col-span-3 h-[500px] bg-slate-50 rounded-[48px] relative overflow-hidden group-hover:shadow-inner transition-all flex items-center justify-center border border-slate-100">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2yG63q0iN1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4Wqj" 
                    className="w-full h-full object-cover opacity-20 grayscale contrast-125 group-hover:scale-110 transition-transform duration-[5s]"
                    alt="Map mockup"
                  />
                  <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-primary/20 rounded-full animate-pulse border border-primary/50 shadow-[0_0_30px_rgba(132,147,74,0.4)]"></div>
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full animate-pulse blur-3xl"></div>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Peak Volume Wards</h4>
                {[
                    { name: "1. Whitefield", count: "1,240", status: "danger" },
                    { name: "2. Koramangala", count: "892", status: "warning" },
                    { name: "3. Indiranagar", count: "654", status: "warning" },
                    { name: "4. Hebbal", count: "512", status: "neutral" },
                    { name: "5. Jayanagar", count: "480", status: "neutral" },
                ].map(ward => (
                    <div key={ward.name} className="flex flex-col gap-2 group cursor-pointer">
                        <div className="flex justify-between items-center transition-all group-hover:translate-x-1">
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{ward.name}</span>
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${
                                ward.status === 'danger' ? 'bg-red-50 text-red-600' :
                                ward.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                                'bg-slate-50 text-slate-500'
                            }`}>{ward.count} TIX</span>
                        </div>
                        <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                            <div className={`h-full ${ward.status === 'danger' ? 'bg-red-500' : 'bg-slate-200'} w-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                        </div>
                    </div>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
}
