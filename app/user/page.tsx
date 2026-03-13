"use client";

import { UserProfile } from "@clerk/nextjs";

export default function UserAccountPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="dm-sans-ui mb-3 text-sm font-medium text-primary">
            Secure account management
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">
            Account
          </h1>
          <p className="dm-sans-ui mt-3 max-w-2xl text-sm text-slate-500">
            Update your Clerk-managed profile, authentication details, and
            secure account settings here.
          </p>
        </div>

        <div className="overflow-hidden rounded-[40px] border border-slate-100 bg-white p-4 shadow-2xl shadow-slate-200/20">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 rounded-[32px]",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
