export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-6 selection:bg-primary/30">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
           <div className="flex items-center justify-center gap-3 mb-6">
              <span className="material-symbols-outlined text-5xl text-primary animate-float">location_city</span>
              <span className="text-3xl font-black tracking-tighter uppercase italic text-white group-hover:text-primary transition-colors duration-500 group-hover:scale-110">Resolvr.</span>
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Join the Network.</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Registering new node in Bengaluru Urban Grid</p>
        </div>

        <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/20">
           <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Full Identity</label>
                    <input 
                       type="text" 
                       placeholder="Jayanth Das"
                       className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Registry Email</label>
                    <input 
                       type="email" 
                       placeholder="name@example.com"
                       className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold"
                    />
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Ward Selection</label>
                    <select className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all text-slate-600 font-bold outline-none">
                       <option>Select Ward</option>
                       <option>Indiranagar (Ward 80)</option>
                       <option>Whitefield (Ward 184)</option>
                    </select>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Secure Password</label>
                    <input 
                       type="password" 
                       placeholder="••••••••"
                       className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-bold"
                    />
                 </div>
              </div>
           </div>

           <div className="flex items-start gap-4 mb-10 px-4">
              <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg border-slate-200 text-primary focus:ring-primary" />
              <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase tracking-widest">
                 I agree to the <span className="text-slate-900 underline">Network Protocols</span> and authorize data relay for civic improvement.
              </p>
           </div>

           <button className="w-full py-6 bg-slate-900 text-white rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10 mb-8">
              Register Node
           </button>

           <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-white px-4 text-slate-300">Institutional Access</span></div>
           </div>

           <div className="grid grid-cols-2 gap-6 mt-8">
              <button className="py-5 bg-white border border-slate-100 rounded-[28px] flex items-center justify-center gap-4 hover:bg-slate-50 transition-all group">
                 <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Google</span>
              </button>
              <button className="py-5 bg-white border border-slate-100 rounded-[28px] flex items-center justify-center gap-4 hover:bg-slate-50 transition-all group">
                 <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">domain</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Department</span>
              </button>
           </div>
        </div>

        <p className="text-center mt-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
           Already in the network? <a href="/login" className="text-primary hover:underline">Initiate Session</a>
        </p>
      </div>
    </div>
  );
}
