import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <header className="relative overflow-hidden pt-16 pb-24 px-6 bg-background-light">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full w-fit border border-primary/20">
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Governance</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
                Fix Bengaluru <span className="text-primary">Together</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                AI-powered civic issue resolution for a smarter, cleaner city. Empowering citizens to drive real change through instant reporting and automated routing.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all hover:scale-105">
                  <span className="material-symbols-outlined">add_circle</span>
                  Report an Issue
                </button>
                <button className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl text-lg font-bold shadow-sm flex items-center gap-2 transition-all hover:scale-105">
                  <span className="material-symbols-outlined">track_changes</span>
                  Track Complaint
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl overflow-hidden border border-primary/10 relative">
                <img 
                  alt="Bengaluru city infrastructure" 
                  className="object-cover w-full h-full opacity-90 mix-blend-multiply"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Ho06Z5iTupRYcMd5fHiVmx0lUHVN1GQF5qDaFTOm0cqvuTL7MKacxz9Ru2gOhs8-ZsyuSj5WfuqQpo8Aweq67WRRK-_hJH1SztihlOAfH3cv6TTX9h3CVIffhiyyFx-AW5bs1ygnjg-EiFo5P8VDD6LVPcwz2C98DaCkk_lshzlTvnMFjI05WefkBpR_zx8O6PwoCoYtKfOZ4OROliwY3pg6-nWhc9XfWPK5LiL7evtg263uuHdBEWQs1ctJuWYAsE8G8swJiD8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-slate-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">12,400+ Issues Fixed</p>
                    <p className="text-xs text-slate-500">Across 198 wards this month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* How it Works */}
        <section className="py-24 px-6 bg-white/50" id="how-it-works">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Three Simple Steps</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Our AI platform ensures your concerns reach the right BBMP department instantly without bureaucratic delays.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Report", desc: "Snap a photo and describe the civic issue. Our app automatically captures GPS location and ward details.", icon: "photo_camera" },
                { step: "2", title: "AI Routing", desc: "Our proprietary AI analyzes the image, categorizes the urgency, and routes it to the specific field engineer.", icon: "neurology" },
                { step: "3", title: "Resolution", desc: "Track real-time progress on your dashboard. Receive a photo confirmation once the issue is marked resolved.", icon: "check_circle" }
              ].map((item) => (
                <div key={item.step} className="bg-white p-8 rounded-2xl border border-slate-100 hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.step}. {item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 bg-nav-bg text-white" id="stats">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { val: "98%", label: "Resolution Rate" },
                { val: "45k+", label: "Issues Resolved" },
                { val: "12", label: "Departments Joined" },
                { val: "198", label: "Wards Covered" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-4xl md:text-5xl font-black text-primary/30">{stat.val}</span>
                  <p className="text-sm font-medium uppercase tracking-widest opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 overflow-hidden" id="testimonials">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Voice of Citizens</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Rajesh K.", role: "Indiranagar Resident", text: "Reported a broken streetlight in Indiranagar and it was fixed within 48 hours. The AI tracking is surprisingly accurate!", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXb-V9a42-AnHeJiWmdNP-PRW8tdXby5CUSyQ33H7dJ3936qcEcaM55lPTorrRIo6_djIfSylM-D_jmF-njIRzdeTM-HVVEw1yuRgHBzlm098TWBlNBgHUKytMmPMe7uR7ycNV4dIsMa20AaAo6dCyvezChRTGT7WRwnjSdRXMVbKOADSbTinzMUt2sqOK2zLgfXddk_oxkqp_z6qt5_Q5fZG1CRLrrN5s--VQqwROx2GgkoVVzHip6Gmeb9rdM4U4U9gex-4FWUM" },
                { name: "Ananya S.", role: "Whitefield Activist", text: "CivicPulse made it so easy to report illegal dumping near my house. No more running around offices to find who is responsible.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvwM4TbSQlNCizdGTuAQCioMODFCY1jKgD4XhVdyA681Xx8E-ffdR-uR1lRphelgszokq-HpiI1c28g_kR7hnmNbC8OF_w7Zq15LpAUIHg6aBsxMWgykAGFCfvP1hASWagynquqq0lbg0gGNRrGDd-mzgNEaK3Dt8L6Cwa2jn9ORpfY3b4SwguwYD7YOytJTByzlDS9TT-os6YARYjSG8iZ0Npv8_SFDAIWjxEMuEB27uq6rejoyUa5TZK-HVWXTzjk6Jb-HPqFgg" },
                { name: "Vikram M.", role: "Jayanagar Ward Leader", text: "The transparency is what I love. You can see when the official visits the site. This is exactly what Bengaluru needed.", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtQc0X7C-5Ohr_3diY0FzxDgL20lu7MWuFxISfJ7qlUAisoZMKk-ejPKwEOOtniw_U23wyMXhDL8DIh74cPqCmU4rMO_ZbzjM0pwQS3QW_srt6l97VirAFJE7EIE4DUGYipQGTPOvDlMpCUasj-Hd6Pe-adShRreUTlYYuAJmvuy6tDG1tuNJMajfp_JkKIvG9adwmEfN6q-7ZfFywIwLE-y6ME0s5tk6uNtlO7irFQdwE108T_KflpBdU3tNIsENkg4d9zT93mDo" }
              ].map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative group hover:shadow-md transition-all">
                  <span className="material-symbols-outlined absolute top-6 right-8 text-primary/20 text-4xl">format_quote</span>
                  <p className="text-slate-600 mb-6 italic leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                      <img alt={t.name} className="w-full h-full object-cover" src={t.img} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
