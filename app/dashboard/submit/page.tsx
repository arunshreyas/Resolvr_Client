export default function SubmitComplaint() {
  return (
    <div className="p-12 max-w-4xl mx-auto space-y-12 pb-24">
      <div className="space-y-2">
         <h2 className="text-5xl font-black tracking-tighter italic">Relay New Issue</h2>
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Transmitting civic data to Departmental Intelligence</p>
      </div>

      <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-12">
         <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Issue Priority</label>
                  <div className="flex gap-4">
                     {['Standard', 'Urgent', 'Emergency'].map(level => (
                        <button key={level} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                           level === 'Standard' ? 'bg-slate-900 text-white border-none shadow-lg' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                        }`}>
                           {level}
                        </button>
                     ))}
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Classification</label>
                  <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all text-slate-600 font-bold outline-none">
                     <option>Select Category</option>
                     <option>Sanitation & Waste</option>
                     <option>Roads & Infrastructure</option>
                     <option>Water & Sewage</option>
                     <option>Street Lighting</option>
                  </select>
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Visual Evidence</label>
               <div className="w-full h-full min-h-[160px] border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center gap-4 group hover:border-primary/40 transition-all cursor-pointer bg-slate-50/50">
                  <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">add_a_photo</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload Transmission</p>
               </div>
            </div>
         </div>

         <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Neural Summary</label>
            <input 
               type="text" 
               placeholder="Briefly describe the anomaly..."
               className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold"
            />
         </div>

         <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Log Details</label>
            <textarea 
               placeholder="Provide precise location markers and environmental context..."
               className="w-full px-8 py-8 bg-slate-50 border-none rounded-[40px] text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold min-h-[200px] resize-none"
            ></textarea>
         </div>

         <div className="flex items-center gap-4 bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/5 skew-x-12 translate-x-1/2 group-hover:bg-white/10 transition-all"></div>
            <div className="flex-grow">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">Grid Sync</h4>
               <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed line-clamp-1">Syncing with Ward 80 Indiranagar Relay Stations</p>
            </div>
            <button className="px-12 py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 relative z-10">
               Initiate Relay
            </button>
         </div>
      </div>
    </div>
  );
}
