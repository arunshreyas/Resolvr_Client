import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background-light overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 md:h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 md:px-10 shrink-0">
          <div className="flex-1 max-w-xl relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Search reports or wards..." 
              className="dm-sans-ui w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
               <Link
                 href="/dashboard/settings"
                 aria-label="Open local settings"
                 className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-primary"
               >
                 <span className="material-symbols-outlined text-[22px]">
                   settings
                 </span>
               </Link>
               <UserButton
                 appearance={{
                   elements: {
                     userButtonAvatarBox: "w-12 h-12 rounded-2xl",
                     userButtonTrigger: "focus:shadow-none focus:outline-none"
                   }
                 }}
               />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50/50 relative">
          <BGPattern
            variant="grid"
            mask="fade-bottom"
            size={45}
            fill="rgba(132,147,74,0.15)"
            className="pointer-events-none absolute inset-0 z-0"
          />
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
