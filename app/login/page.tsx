export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-6 selection:bg-primary/30">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
           <div className="flex items-center justify-center gap-3 mb-6">
              <span className="material-symbols-outlined text-5xl text-primary animate-float">location_city</span>
              <span className="text-3xl font-black tracking-tighter uppercase italic text-white group-hover:text-primary transition-colors duration-500 group-hover:scale-110">Resolvr.</span>
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Back to Action.</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Authenticating with Urban Resilience Network</p>
        </div>

        <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-8">
           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Registry Email</label>
                 <input 
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 font-bold"
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Access Keyword</label>
                 <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold"
                 />
              </div>
           </div>

           <button className="w-full py-6 bg-slate-900 text-white rounded-[28px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/10">
              Initiate Session
           </button>

           <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-white px-4 text-slate-500">Alternate Access</span></div>
           </div>

           <button className="w-full py-5 bg-white border border-slate-100 rounded-[28px] flex items-center justify-center gap-4 hover:bg-slate-50 transition-all group">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Google Intelligence</span>
           </button>
        </div>

        <p className="text-center mt-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
           New to the network? <a href="/register" className="text-primary hover:underline">Register Node</a>
        </p>
      </div>
    </div>
  );
}
