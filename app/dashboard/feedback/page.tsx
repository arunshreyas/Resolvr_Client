"use client";

import Link from "next/link";
import {
  formatComplaintDate,
  getComplaintStatusLabel,
  getComplaintStatusTone,
} from "@/app/lib/complaints";
import { useUserComplaints } from "@/app/hooks/useUserComplaints";

export default function FeedbackHubPage() {
  const { complaints, loading, error } = useUserComplaints();

  const sortedComplaints = [...complaints].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <div className="p-12 space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="dm-sans-ui mb-3 text-sm font-medium text-primary">
            Dispute support
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">
            Feedback Hub
          </h1>
          <p className="dm-sans-ui mt-3 max-w-3xl text-sm text-slate-500">
            If a complaint update feels wrong, open the dispute assistant for
            that specific complaint and build a stronger response before you
            escalate it.
          </p>
        </div>
        <Link
          href="/dashboard/complaints"
          className="dm-sans-ui inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-sm"
        >
          <span className="material-symbols-outlined text-base">
            description
          </span>
          View all complaints
        </Link>
      </div>

      <section className="rounded-[40px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300/20">
        <p className="dm-sans-ui text-sm font-medium text-white/55">
          How it works
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Pick the complaint",
              description:
                "Open dispute chat for the exact complaint whose status or resolution you want to challenge.",
            },
            {
              title: "Explain what changed",
              description:
                "Tell the assistant what feels wrong, what is still unresolved, and what evidence you have.",
            },
            {
              title: "Get a sharper dispute",
              description:
                "The assistant will help you draft a clearer, more actionable response tied to that complaint.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] bg-white/8 p-5">
              <h2 className="text-xl font-black">{item.title}</h2>
              <p className="dm-sans-ui mt-3 text-sm leading-7 text-white/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-8 py-6 text-rose-700">
          <p className="dm-sans-ui text-base font-medium">{error}</p>
        </div>
      ) : null}

      <section className="rounded-[40px] border border-slate-100 bg-white shadow-2xl shadow-slate-200/20 overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50/70 px-8 py-6">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900">
            Start a complaint dispute
          </h2>
          <p className="dm-sans-ui mt-2 text-sm text-slate-500">
            Choose the complaint you want help responding to.
          </p>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 rounded-[28px] bg-slate-50 animate-pulse"
              ></div>
            ))}
          </div>
        ) : sortedComplaints.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <span className="material-symbols-outlined text-3xl">forum</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              No complaints to dispute yet
            </h2>
            <p className="dm-sans-ui mt-3 text-sm text-slate-500">
              Once you submit complaints, you can open a dispute thread from
              here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {sortedComplaints.map((complaint) => {
              const tone = getComplaintStatusTone(complaint.status);

              return (
                <div
                  key={complaint.id}
                  className="flex flex-col gap-6 px-8 py-6 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="dm-sans-ui inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        C-{complaint.id}
                      </span>
                      <span
                        className={`dm-sans-ui inline-flex rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
                      >
                        {getComplaintStatusLabel(complaint.status)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {complaint.title}
                    </h3>
                    <p className="dm-sans-ui mt-2 max-w-3xl text-sm text-slate-500 line-clamp-2">
                      {complaint.description}
                    </p>
                    <p className="dm-sans-ui mt-3 text-xs text-slate-400">
                      Last updated {formatComplaintDate(complaint.updatedAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/dashboard/complaint/${complaint.id}`}
                      className="dm-sans-ui inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
                    >
                      <span className="material-symbols-outlined text-base">
                        visibility
                      </span>
                      View complaint
                    </Link>
                    <Link
                      href={`/dashboard/complaint/${complaint.id}/feedback`}
                      className="dm-sans-ui inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-lg shadow-primary/20"
                    >
                      <span className="material-symbols-outlined text-base">
                        gavel
                      </span>
                      Open dispute chat
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
