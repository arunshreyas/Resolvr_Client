export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-24 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 text-white mb-8">
              <span className="material-symbols-outlined text-4xl text-primary">location_city</span>
              <span className="text-3xl font-black tracking-tighter uppercase italic text-slate-900 group-hover:text-primary transition-colors duration-500 group-hover:scale-110">Resolvr.</span>
            </div>
            <p className="max-w-sm mb-10 text-lg font-medium leading-relaxed">
              Advancing urban transparency through neural-routed civic resolution.
            </p>
            <div className="flex gap-6">
              {['social_leaderboard', 'share', 'alternate_email'].map(icon => (
                <a key={icon} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group" href="#">
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Resources</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Protocol</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">System Status</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">API Documentation</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Ward Intelligence</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Localization</h4>
            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl text-white border border-primary/50 text-xs font-bold">
                <span>English (Global)</span>
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </button>
              <button className="flex items-center justify-between px-6 py-4 bg-transparent rounded-2xl text-slate-500 border border-white/10 text-xs font-bold hover:border-primary/30 transition-all">
                <span>ಕನ್ನಡ (Regional)</span>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">© 2024 Resolvr. Bengaluru. Neural Insights Initiative.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span className="hover:text-white transition-colors cursor-pointer">Ward Empowerment</span>
            <span className="hover:text-white transition-colors cursor-pointer">Open Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

