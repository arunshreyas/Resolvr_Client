"use client";

import { useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useGeolocation } from "@/app/hooks/useGeolocation";
import { HoverButton } from "@/components/ui/hover-button";

/**
 * MUNICIPAL COMPLAINT SYSTEM
 * 
 * Strategy:
 * - Uses /api/relay/complaints (Next.js server-side bypass for CORS)
 * - Formal Civic Tone (No tech jargon)
 * - Explicit High-Contrast Text
 */

export default function SubmitComplaint() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userLoaded || !isSignedIn) {
      setError("Please sign in to proceed with your grievance submission.");
      return;
    }

    if (!title || !description) {
      setError("Complaint Title and Details are required to process this request.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token is missing. Please sign in again.");
      }

      const response = await fetch(`${apiBaseUrl}/complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          latitude: latitude || null,
          longitude: longitude || null,
        })
      });

      if (!response.ok) {
        const status = response.status;
        const errorData = await response.json().catch(() => ({ message: "Unknown Relay Error" }));
        console.error(`Relay Error [${status}]:`, errorData);
        
        if (status === 401) throw new Error("Authentication Denied. Please refresh your session.");
        if (status === 404) throw new Error("Municipal Endpoint Not Found. Verify backend is running on :3000.");
        throw new Error(errorData.message || "Relay Station Unreachable. The municipal servers may be under maintenance.");
      }

      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);

    } catch (err: unknown) {
      console.error("Transmission Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Connection failure. Ensure your internet is active and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10 pb-24">
      {/* Formal Header */}
      <div className="space-y-3">
         <h2 className="text-4xl font-bold tracking-tight text-slate-900 italic">Submit Civic Grievance</h2>
         <p className="text-sm text-slate-500 font-semibold uppercase tracking-widest">Bengaluru Municipal Administration (BBMP) • Official Portal</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-200 shadow-2xl shadow-slate-200/40">
         {success ? (
            <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
               <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="material-symbols-outlined text-5xl text-emerald-600">verified</span>
               </div>
               <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Grievance Registered</h3>
               <p className="text-sm text-slate-500 mt-4 font-medium uppercase tracking-widest">Your report has been securely transmitted to the city registry.</p>
            </div>
         ) : (
           <form onSubmit={handleSubmit} className="space-y-10">
            {/* Geo-Location Status (Informational) */}
            <div className={`px-6 py-3 rounded-2xl flex items-center gap-3 border transition-all ${
              geoError ? 'bg-red-50 border-red-100 text-red-700' : 
              geoLoading ? 'bg-slate-50 border-slate-100 text-slate-400 animate-pulse' : 
              'bg-emerald-50 border-emerald-100 text-emerald-700'
            }`}>
              <span className="material-symbols-outlined text-lg">
                {geoError ? 'location_off' : geoLoading ? 'sync' : 'verified_user'}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">
                {geoLoading ? 'Acquiring GPS Signal...' : 
                 geoError ? `Location Error: ${geoError}` : 
                 `GPS Signal Locked: ${latitude?.toFixed(5)}, ${longitude?.toFixed(5)}`}
              </span>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Grievance Subject</label>
               <input 
                  type="text" 
                  placeholder="Summarize the issue clearly"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl text-black text-base focus:border-slate-900 transition-all outline-none"
               />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nature of Complaint</label>
               <textarea 
                  placeholder="Provide comprehensive details about the civic grievance..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl text-black text-base focus:border-slate-900 transition-all min-h-[160px] resize-none outline-none"
               ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-5 bg-rose-50 text-rose-700 border border-rose-100 rounded-3xl text-xs font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            {/* Submit Block */}
            <div className="flex items-center gap-8 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
                <div className="flex-grow">
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1.5 rotate-[0]">Registry ID</p>
                   <p className="text-[15px] text-white/90 font-medium">
                     {isSignedIn ? (user.fullName || user.primaryEmailAddress?.emailAddress) : "Anonymous Node"}
                   </p>
                </div>
                <HoverButton 
                  type="submit"
                  disabled={loading || !isSignedIn}
                  className="px-14 py-6 rounded-3xl shadow-2xl shadow-slate-900/20 disabled:opacity-50 flex items-center gap-4"
                >
                   {loading ? "Transmitting..." : "Submit Report"}
                </HoverButton>
            </div>
           </form>
         )}
      </div>
    </div>
  );
}
