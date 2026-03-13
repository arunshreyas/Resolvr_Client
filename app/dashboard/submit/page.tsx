"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SubmitComplaint() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [priority, setPriority] = useState('Standard');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!isSignedIn) {
      alert("Please sign in to report an issue.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          userId: user.id,
          userEmail: user.primaryEmailAddress?.emailAddress,
          userName: user.fullName || user.username || 'Anonymous Citizen',
          ward: 'Indiranagar (Ward 80)', // Defaulting as per layout
          priority
        })
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        throw new Error("Relay failure");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Relay failed. Please check network protocols.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-12 pb-24">
      <div className="space-y-2">
         <h2 className="text-5xl font-black tracking-tighter italic">Relay New Issue</h2>
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Transmitting civic data to Departmental Intelligence</p>
      </div>

      <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-12">
         {success ? (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
               <span className="material-symbols-outlined text-7xl text-primary mb-6 block">check_circle</span>
               <h3 className="text-3xl font-black italic tracking-tighter">Transmission Successful.</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Redirecting to Registry Dashboard...</p>
            </div>
         ) : (
           <>
            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Issue Priority</label>
                     <div className="flex gap-4">
                        {['Standard', 'Urgent', 'Emergency'].map(level => (
                           <button 
                             key={level} 
                             onClick={() => setPriority(level)}
                             className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              priority === level ? 'bg-slate-900 text-white border-none shadow-lg' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                           }`}>
                              {level}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Classification</label>
                     <select 
                       onChange={(e) => setCategory(e.target.value)}
                       className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all text-slate-600 font-bold outline-none"
                     >
                        <option>Select Category</option>
                        <option>Sanitation & Waste</option>
                        <option>Roads & Infrastructure</option>
                        <option>Water & Sewage</option>
                        <option>Street Lighting</option>
                     </select>
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Visual Evidence</label>
                  <div className="w-full h-full min-h-[160px] border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center gap-4 group hover:border-primary/40 transition-all cursor-pointer bg-slate-50/50">
                     <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">add_a_photo</span>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload Transmission</p>
                  </div>
               </div>
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Neural Summary</label>
               <input 
                  type="text" 
                  placeholder="Briefly describe the anomaly..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-8 py-5 bg-slate-50 border-none rounded-3xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold outline-none"
               />
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Log Details</label>
               <textarea 
                  placeholder="Provide precise location markers and environmental context..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-8 py-8 bg-slate-50 border-none rounded-[40px] text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-300 font-bold min-h-[200px] resize-none outline-none"
               ></textarea>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden group">
               <div className="absolute right-0 top-0 bottom-0 w-32 bg-white/5 skew-x-12 translate-x-1/2 group-hover:bg-white/10 transition-all"></div>
               <div className="flex-grow">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-1">Grid Sync</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed line-clamp-1">
                    {isSignedIn ? `Reporting as ${user.fullName || user.username}` : "Not Authenticated"}
                  </p>
               </div>
               <button 
                 onClick={handleSubmit}
                 disabled={loading || !isSignedIn}
                 className="px-12 py-5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 relative z-10 disabled:opacity-50"
               >
                  {loading ? "Transmitting..." : "Initiate Relay"}
               </button>
            </div>
           </>
         )}
      </div>
    </div>
  );
}
