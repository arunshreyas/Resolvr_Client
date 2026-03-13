import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-nav-bg text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl">location_city</span>
          <span className="text-xl font-bold tracking-tight">CivicPulse Bengaluru</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm font-medium hover:text-white/80 transition-colors">
            How it Works
          </Link>
          <Link href="#stats" className="text-sm font-medium hover:text-white/80 transition-colors">
            Stats
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-white/80 transition-colors">
            Testimonials
          </Link>
          <div className="flex gap-3">
            <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all">
              Report an Issue
            </button>
            <Link 
              href="/login" 
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-lg text-sm font-bold border border-white/20 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="md:hidden">
          <span className="material-symbols-outlined cursor-pointer">menu</span>
        </div>
      </div>
    </nav>
  );
}
