import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Typewriter } from "@/components/ui/typewriter";
import HeroCarousel from "./components/HeroCarousel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light selection:bg-primary/30">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <header className="relative overflow-hidden pt-24 pb-32 px-6">
          <BGPattern
            variant="grid"
            mask="fade-right"
            size={36}
            fill="rgba(132,147,74,0.14)"
            className="pointer-events-none opacity-100"
          />
          <BGPattern
            variant="dots"
            mask="fade-bottom"
            size={24}
            fill="rgba(74,93,35,0.1)"
            className="pointer-events-none opacity-70"
          />
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="flex flex-col gap-10">
              <div className="inline-flex items-center gap-3 bg-white/55 backdrop-blur-md px-4 py-1.5 rounded-full w-fit border border-white/50 shadow-sm animate-fade-in">
                <span className="material-symbols-outlined text-primary text-sm animate-pulse">bolt</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">AI-Powered Governance</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900">
                  Fix <br /> Bengaluru <br />
                  <Typewriter
                    text={[
                      "Together.",
                      "As one.",
                      "For the best.",
                      "Sustainably.",
                      "Safely.",
                    ]}
                    speed={70}
                    className="text-primary italic"
                    waitTime={1500}
                    deleteSpeed={40}
                    cursorChar={"|"}
                  />
                </h1>
                <p className="text-xl text-slate-700 leading-tight max-w-lg font-medium">
                  Building a smarter, cleaner city through automated <span className="text-slate-900 font-bold">issue routing</span> and citizen empowerment.
                </p>
              </div>

              <div className="flex flex-wrap gap-5">
                <Link href="/dashboard/submit" className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-3 overflow-hidden">
                  <span className="relative z-10">Report an Issue</span>
                  <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">add_circle</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/0 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
                <Link href="/dashboard" className="bg-white/80 backdrop-blur-md hover:bg-white text-slate-900 border border-slate-200/50 px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-slate-200/20 flex items-center gap-3 transition-all">
                  <span className="material-symbols-outlined">track_changes</span>
                  Track Complaint
                </Link>
              </div>
            </div>

            <div className="relative group">
              <HeroCarousel />

              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[32px] max-w-[280px] hidden md:block animate-float">
                <div className="flex items-center gap-5">
                  <div className="bg-primary p-4 rounded-2xl text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900">12.4k</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Issues Resolved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* How it Works - Modernized */}
        <section className="py-32 px-6 relative" id="how-it-works">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Three <br /> Simple Steps</h2>
                <p className="text-xl text-slate-500 font-medium">Bypassing bureaucracy with smart automation.</p>
              </div>
              <div className="hidden md:block h-px flex-grow bg-slate-200 mx-12 mb-6"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Report", desc: "Snap a photo of the issue. Our AI automatically extracts location, ward, and urgency metrics.", icon: "photo_camera" },
                { step: "02", title: "AI Routing", desc: "Our neural engine categorizes and assigns the task to the relevant field department in milliseconds.", icon: "neurology" },
                { step: "03", title: "Resolution", desc: "Follow real-time progress on your dashboard. Receive signed-off photo proof once resolved.", icon: "check_circle" }
              ].map((item, i) => (
                <div key={item.step} className="group relative">
                  <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                    <span className="text-8xl font-black text-slate-200 absolute -top-10 left-10 pointer-events-none group-hover:text-primary/20 transition-colors">
                      {item.step}
                    </span>
                    <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center text-slate-400 mb-10 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                      <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                    </div>
                    <h3 className="text-3xl font-black mb-4 text-slate-900">{item.title}</h3>
                    <p className="text-slate-700 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Premium Look */}
        <section className="relative py-24 px-6 bg-slate-900 border-y border-white/5 overflow-hidden" id="stats">
          <DottedSurface className="opacity-90" />
          <BGPattern
            variant="grid"
            mask="fade-y"
            size={40}
            fill="rgba(255,255,255,0.07)"
            className="pointer-events-none opacity-75"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(132,147,74,0.16),transparent_30%),linear-gradient(180deg,rgba(9,21,59,0.12),rgba(9,21,59,0.35))]"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 lg:gap-8">
              {[
                { title: "BBMP & BWSSB", label: "Multi-Agency Grid" },
                { title: "100%", label: "Traceable History" },
                { title: "Direct", label: "Citizen Oversight" },
                { title: "Verified", label: "Ward Presence" }
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <span className="block text-center text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic transition-transform group-hover:scale-110 duration-500">
                    {stat.title}
                  </span>
                  <div className="w-12 h-1 bg-primary mx-auto mb-6 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 group-hover:text-primary transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology/Features Section */}
        <section className="py-32 px-6 bg-slate-50" id="tech">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-center mb-24">
              <div className="flex-1">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900">
                  Built for <span className="text-primary italic">Scale.</span>
                </h2>
                <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                  Resolvr. isn't just a dashboard—it's a mission-critical infrastructure for the modern city, powered by cutting-edge automation.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-6">
                {[
                  { icon: "psychology", title: "Neural Routing", desc: "AI instantly maps reports to the correct municipal wing." },
                  { icon: "encrypted", title: "Secure Privacy", desc: "Citizen data is encrypted with military-grade protocols." },
                  { icon: "speed", title: "Real-time API", desc: "Synchronized updates between citizens and field agents." },
                  { icon: "query_stats", title: "Predictive Analytics", desc: "Identify urban decay before it becomes a crisis." }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <span className="material-symbols-outlined text-primary text-4xl mb-6 block group-hover:scale-110 transition-transform">{feature.icon}</span>
                    <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
