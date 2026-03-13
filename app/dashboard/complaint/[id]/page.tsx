'use client';

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ComplaintDetail() {
  const { id } = useParams();
  const router = useRouter();

  // Mock data for the specific complaint
  const complaint = {
    id: id || "C-123",
    category: "Sanitation",
    status: "In Progress",
    title: "Garbage Pile near Indiranagar Park",
    description: "Illegal dumping has been observed for over a week. The smell is becoming unbearable for residents nearby. Multiple bags of construction debris and household waste have been spotted.",
    date: "Oct 24, 2024",
    ward: "Ward 80",
    location: "Indiranagar 1st Stage, near Public Park entrance",
    department: "BBMP Solid Waste Management",
    timeline: [
      { date: "Oct 24, 2024", time: "10:30 AM", event: "Issue Reported", detail: "Ticket generated and assigned to Ward 80.", status: "completed" },
      { date: "Oct 24, 2024", time: "02:15 PM", event: "Automated Neural Routing", detail: "Categorized as 'Sanitation' and routed to BBMP SWM.", status: "completed" },
      { date: "Oct 25, 2024", time: "09:00 AM", event: "Department Acknowledged", detail: "Assistant Engineer (SWM) assigned to the case.", status: "completed" },
      { date: "Oct 26, 2024", time: "11:45 AM", event: "On-site Inspection", detail: "Field agent confirmed illegal dumping site.", status: "in-progress" },
      { date: "Pending", time: "-", event: "Clearing Operation", detail: "Scheduled for next collection cycle.", status: "pending" },
    ]
  };

  return (
    <div className="p-12 space-y-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => router.back()}
          className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] font-black underline decoration-primary decoration-2 underline-offset-4 uppercase tracking-[0.2em] text-primary">{complaint.category}</span>
            <span className="text-[10px] font-bold text-slate-400">/</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{complaint.id}</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter">{complaint.title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/20">
            <h3 className="text-xl font-black uppercase tracking-tighter italic mb-8 border-l-4 border-primary pl-4">Situation Analysis</h3>
            <p className="text-slate-600 font-medium leading-relaxed text-lg mb-8">
              {complaint.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 border-t border-slate-50 pt-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Location</p>
                <p className="font-bold text-slate-900">{complaint.location}</p>
                <p className="text-xs text-slate-500">{complaint.ward}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Assigned To</p>
                <p className="font-bold text-slate-900">{complaint.department}</p>
                <p className="text-xs text-slate-500">Official Relay ID: SWM-80-AE</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
             <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10 text-glow">Progress Ledger</h3>
             
             <div className="space-y-8 relative">
                {/* Timeline Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>
                
                {complaint.timeline.map((item, i) => (
                  <div key={i} className="relative flex gap-8 pl-10 group">
                    <div className={`absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-4 border-slate-900 z-10 ${
                      item.status === 'completed' ? 'bg-primary' : 
                      item.status === 'in-progress' ? 'bg-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 
                      'bg-slate-800'
                    }`}></div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`font-black uppercase tracking-widest text-[10px] ${item.status === 'pending' ? 'text-white/30' : 'text-white'}`}>{item.event}</h4>
                        <p className="text-[10px] font-bold text-white/40">{item.date} • {item.time}</p>
                      </div>
                      <p className={`text-sm ${item.status === 'pending' ? 'text-white/20' : 'text-white/60'}`}>{item.detail}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Actions & Meta */}
        <div className="space-y-8">
           <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/20 text-center">
              <div className={`w-16 h-16 rounded-3xl mx-auto mb-6 flex items-center justify-center ${
                complaint.status === 'In Progress' ? 'bg-primary/20 text-primary animate-pulse' : 'bg-green-100 text-green-600'
              }`}>
                <span className="material-symbols-outlined text-3xl">
                  {complaint.status === 'In Progress' ? 'sync' : 'verified_user'}
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Current Status</p>
              <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">{complaint.status}</h4>
              <button className="w-full bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl hover:bg-primary transition-all shadow-lg shadow-black/10">
                Request Urgent Update
              </button>
           </div>

           <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-6">Evidence Logs</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden relative group">
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">zoom_in</span>
                   </div>
                </div>
                <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden relative group">
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xl">zoom_in</span>
                   </div>
                </div>
              </div>
              <p className="mt-4 text-[10px] font-bold text-slate-400 italic text-center">Authenticated via Mobile App Geotag</p>
           </div>
        </div>
      </div>
    </div>
  );
}
