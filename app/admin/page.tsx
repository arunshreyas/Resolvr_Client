export default function AdminDashboard() {
  const stats = [
    { label: "Total Complaints", value: "14,284", tag: "+12.4%", status: "success" },
    { label: "Pending Issues", value: "3,120", tag: "Stable", status: "neutral" },
    { label: "Resolved Cases", value: "10,489", tag: "+8.2%", status: "success" },
    { label: "Escalated", value: "675", tag: "Critical", status: "danger" },
  ];

  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden ${
             stat.status === 'danger' ? 'bg-red-900 text-white border-none' : ''
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${stat.status === 'danger' ? 'bg-white/10' : 'bg-blue-50 text-blue-500'}`}>
                 <span className="material-symbols-outlined">{
                   i === 0 ? 'analytics' : i === 1 ? 'assignment_late' : i === 2 ? 'task_alt' : 'report_problem'
                 }</span>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm ${
                stat.status === 'success' ? 'bg-green-50 text-green-600' :
                stat.status === 'danger' ? 'bg-white/10 text-white' :
                'bg-slate-100 text-slate-500'
              }`}>{stat.tag}</span>
            </div>
            <p className={`${stat.status === 'danger' ? 'text-white/60' : 'text-slate-500'} text-xs font-bold uppercase tracking-widest`}>
              {stat.label}
            </p>
            <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Resolution Rate by Department */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Resolution Rate by Department</h3>
            <select className="bg-slate-50 border-none text-xs font-bold rounded-lg px-3 py-2 cursor-pointer outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="space-y-6">
            {[
              { name: "Waste Management (BBMP)", rate: 92, color: "bg-primary" },
              { name: "Water Supply (BWSSB)", rate: 78, color: "bg-primary/70" },
              { name: "Electricity (BESCOM)", rate: 85, color: "bg-primary/80" },
              { name: "Road Maintenance", rate: 45, color: "bg-slate-300" },
            ].map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-900 uppercase tracking-wider">{dept.name}</span>
                  <span className="text-slate-500">{dept.rate}%</span>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${dept.color} transition-all duration-1000`} 
                    style={{ width: `${dept.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution Chart Mockup */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold w-full text-left mb-8">Category Distribution</h3>
            <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <div className="absolute inset-0 border-[20px] border-primary rounded-full opacity-10"></div>
                <div className="absolute inset-0 border-[20px] border-primary border-t-transparent border-l-transparent rounded-full rotate-45"></div>
                <div className="text-center">
                    <p className="text-3xl font-black">14k</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Total Issues</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
                {[
                    { label: "Sanitation", val: "45%", dot: "bg-primary" },
                    { label: "Potholes", val: "25%", dot: "bg-primary/60" },
                    { label: "Streetlights", val: "20%", dot: "bg-slate-300" },
                    { label: "Others", val: "10%", dot: "bg-slate-900" },
                ].map(cat => (
                    <div key={cat.label} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cat.dot}`}></div>
                        <span className="text-[10px] font-bold text-slate-500">{cat.label} ({cat.val})</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Map Heatmap Mockup */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">Complaints Heatmap by Ward</h3>
                <p className="text-xs text-slate-500 font-medium">Visualizing ticket density across Bengaluru zones</p>
              </div>
              <div className="flex gap-2">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                    <span className="material-symbols-outlined text-sm">filter_alt</span>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold">View Full Map</button>
              </div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-3 h-[400px] bg-slate-100 rounded-3xl relative overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2yG63q0iN1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4WqjG1I4Wqj" 
                    className="w-full h-full object-cover opacity-50 grayscale"
                    alt="Map mockup"
                  />
                  <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-red-500/20 rounded-full animate-pulse border border-red-500/50"></div>
                  <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-red-500/10 rounded-full animate-pulse blur-xl"></div>
              </div>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Top Volume Wards</h4>
                {[
                    { name: "1. Whitefield", count: "1,240", status: "danger" },
                    { name: "2. Koramangala", count: "892", status: "warning" },
                    { name: "3. Indiranagar", count: "654", status: "warning" },
                    { name: "4. Hebbal", count: "512", status: "neutral" },
                    { name: "5. Jayanagar", count: "480", status: "neutral" },
                ].map(ward => (
                    <div key={ward.name} className="flex justify-between items-center group cursor-pointer">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">{ward.name}</span>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                            ward.status === 'danger' ? 'bg-red-50 text-red-600' :
                            ward.status === 'warning' ? 'bg-amber-50 text-amber-600' :
                            'bg-slate-100 text-slate-500'
                        }`}>{ward.count} tickets</span>
                    </div>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
}
