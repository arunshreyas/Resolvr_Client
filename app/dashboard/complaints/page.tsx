"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  formatComplaintDate,
  formatComplaintLocation,
  getComplaintStatusLabel,
  getComplaintStatusTone,
} from "@/app/lib/complaints";
import { useUserComplaints } from "@/app/hooks/useUserComplaints";

export default function ComplaintsRegistryPage() {
  const [query, setQuery] = useState("");
  const { complaints, loading, error } = useUserComplaints();

  const filteredComplaints = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...complaints]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .filter((complaint) => {
        if (!normalizedQuery) {
          return true;
        }

        return [complaint.title, complaint.description, `c-${complaint.id}`]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      });
  }, [complaints, query]);

  return (
    <div className="p-12 space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="dm-sans-ui text-sm font-medium text-primary mb-3">
            Complaint registry
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">
            All Complaints
          </h1>
          <p className="dm-sans-ui text-sm text-slate-500 mt-3 max-w-2xl">
            Every complaint you have submitted, with live status and location
            details in one place.
          </p>
        </div>
        <Link
          href="/dashboard/submit"
          className="dm-sans-ui inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-medium text-white shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-base">
            add_circle
          </span>
          New complaint
        </Link>
      </div>

      <div className="rounded-[36px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/20">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
            search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, description, or ticket id"
            className="dm-sans-ui w-full rounded-2xl border border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-primary/30 focus:bg-white"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-8 py-6 text-rose-700">
          <p className="dm-sans-ui text-base font-medium">{error}</p>
        </div>
      ) : null}

      <div className="rounded-[40px] border border-slate-100 bg-white shadow-2xl shadow-slate-200/20 overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1.7fr_0.9fr_1fr_0.8fr] gap-6 border-b border-slate-100 bg-slate-50/70 px-8 py-5">
          <p className="dm-sans-ui text-xs font-medium text-slate-500">
            Ticket
          </p>
          <p className="dm-sans-ui text-xs font-medium text-slate-500">
            Complaint
          </p>
          <p className="dm-sans-ui text-xs font-medium text-slate-500">
            Status
          </p>
          <p className="dm-sans-ui text-xs font-medium text-slate-500">
            Created
          </p>
          <p className="dm-sans-ui text-xs font-medium text-slate-500 text-right">
            View
          </p>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-24 rounded-[28px] bg-slate-50 animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <span className="material-symbols-outlined text-3xl">
                folder_open
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Nothing matches yet
            </h2>
            <p className="dm-sans-ui mt-3 text-sm text-slate-500">
              Try a different search or submit your first complaint.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filteredComplaints.map((complaint) => {
              const tone = getComplaintStatusTone(complaint.status);

              return (
                <Link
                  key={complaint.id}
                  href={`/dashboard/complaint/${complaint.id}`}
                  className="grid grid-cols-1 gap-5 px-8 py-6 transition-colors hover:bg-slate-50 lg:grid-cols-[1.1fr_1.7fr_0.9fr_1fr_0.8fr] lg:items-center"
                >
                  <div>
                    <span className="dm-sans-ui inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                      C-{complaint.id}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-black text-slate-900 line-clamp-1">
                      {complaint.title}
                    </p>
                    <p className="dm-sans-ui mt-2 text-sm text-slate-500 line-clamp-2">
                      {complaint.description}
                    </p>
                    <p className="dm-sans-ui mt-2 text-xs text-slate-400">
                      {formatComplaintLocation(complaint)}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`dm-sans-ui inline-flex rounded-full px-3 py-1 text-sm font-medium ${tone.badge}`}
                    >
                      {getComplaintStatusLabel(complaint.status)}
                    </span>
                  </div>

                  <div>
                    <p className="dm-sans-ui text-sm font-medium text-slate-700">
                      {formatComplaintDate(complaint.createdAt)}
                    </p>
                    <p className="dm-sans-ui mt-1 text-xs text-slate-400">
                      Updated {formatComplaintDate(complaint.updatedAt)}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <span className="material-symbols-outlined text-slate-300 transition group-hover:text-slate-500">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
