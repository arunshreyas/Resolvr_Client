import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background-light overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex-1 max-w-xl relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Search reports or wards..." 
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-5">
               <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all relative group">
                 <span className="material-symbols-outlined group-hover:scale-110 transition-transform">notifications</span>
                 <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </button>
                <Link href="/dashboard/submit" className="bg-primary text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center justify-center">
                  Report New Issue
                </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">
              <span className="material-symbols-outlined">help</span>
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

