export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-white mb-6">
              <span className="material-symbols-outlined text-3xl">location_city</span>
              <span className="text-xl font-bold tracking-tight">CivicPulse Bengaluru</span>
            </div>
            <p className="max-w-sm mb-6">
              Building a bridge between citizens and government through technology and transparency. Let's make our city a better place to live.
            </p>
            <div className="flex gap-4">
              <a className="hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">social_leaderboard</span>
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">share</span>
              </a>
              <a className="hover:text-primary transition-colors" href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-white transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Department Access</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Volunteer Program</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Language / ಭಾಷೆ</h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-lg text-white border border-primary transition-all">
                <span>English</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>
              <button className="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-lg text-slate-300 border border-slate-700 hover:border-primary/50 transition-all">
                <span>ಕನ್ನಡ (Kannada)</span>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 CivicPulse Bengaluru. An independent initiative for Namma Bengaluru.</p>
          <div className="flex gap-6">
            <p>Designed for Ward Empowerment</p>
            <p>Powered by AI Insights</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
