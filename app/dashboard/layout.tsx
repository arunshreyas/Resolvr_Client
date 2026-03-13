import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 max-w-xl relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Search complaints, wards, or resources..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-4 ml-8">
            <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-sm">add</span>
              Submit New Complaint
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined">help</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
