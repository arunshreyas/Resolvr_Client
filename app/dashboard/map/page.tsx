"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import {
  formatComplaintDate,
  getComplaintStatusLabel,
  getComplaintStatusTone,
} from "@/app/lib/complaints";
import { useUserComplaints } from "@/app/hooks/useUserComplaints";

const ComplaintLeafletMap = dynamic(
  () => import("@/app/components/ComplaintLeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[620px] w-full items-center justify-center rounded-[40px] bg-slate-100">
        <div className="h-20 w-20 rounded-full border-8 border-slate-200 border-t-primary animate-spin"></div>
      </div>
    ),
  },
);

export default function ComplaintMapPage() {
  const { complaints, loading, error } = useUserComplaints();

  const mappedComplaints = useMemo(
    () =>
      complaints.filter(
        (complaint) =>
          complaint.latitude != null && complaint.longitude != null,
      ),
    [complaints],
  );

  return (
    <div className="p-12 space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="dm-sans-ui mb-3 text-sm font-medium text-primary">
            Spatial view
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">
            Complaint Map
          </h1>
          <p className="dm-sans-ui mt-3 max-w-2xl text-sm text-slate-500">
            A real map of the complaints you submitted with saved latitude and
            longitude coordinates.
          </p>
        </div>
        <Link
          href="/dashboard/submit"
          className="dm-sans-ui inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-medium text-white"
        >
          <span className="material-symbols-outlined text-base">
            add_location_alt
          </span>
          Add another complaint
        </Link>
      </div>

      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-8 py-6 text-rose-700">
          <p className="dm-sans-ui text-base font-medium">{error}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="overflow-hidden rounded-[48px] border border-slate-100 bg-white shadow-2xl shadow-slate-200/20">
          <div className="border-b border-slate-100 px-10 py-8">
            <h2 className="text-2xl font-black tracking-tighter text-slate-900">
              Field Positions
            </h2>
            <p className="dm-sans-ui mt-2 text-sm text-slate-500">
              Markers are placed on a live OpenStreetMap layer using the
              coordinates captured with each complaint.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[620px] items-center justify-center bg-slate-50">
              <div className="h-24 w-24 rounded-full border-8 border-slate-200 border-t-primary animate-spin"></div>
            </div>
          ) : mappedComplaints.length === 0 ? (
            <div className="flex min-h-[620px] flex-col items-center justify-center bg-[linear-gradient(180deg,#f8faf7_0%,#eef3e7_100%)] px-6 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                <span className="material-symbols-outlined text-4xl">map</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900">
                No mapped complaints yet
              </h3>
              <p className="dm-sans-ui mt-3 max-w-md text-sm text-slate-500">
                Submit a complaint with location access enabled and it will
                appear here automatically.
              </p>
            </div>
          ) : (
            <ComplaintLeafletMap complaints={mappedComplaints} />
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <p className="dm-sans-ui text-sm font-medium text-slate-500">
              Mapped records
            </p>
            <h2 className="mt-2 text-5xl font-black text-slate-900">
              {mappedComplaints.length}
            </h2>
            <p className="dm-sans-ui mt-3 text-sm text-slate-500">
              Complaints with usable coordinates attached.
            </p>
          </div>

          <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <h3 className="text-2xl font-black tracking-tighter text-slate-900">
              Latest positions
            </h3>
            <div className="mt-6 space-y-4">
              {mappedComplaints.slice(0, 4).map((complaint) => {
                const tone = getComplaintStatusTone(complaint.status);

                return (
                  <Link
                    key={complaint.id}
                    href={`/dashboard/complaint/${complaint.id}`}
                    className="block rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-lg font-black text-slate-900 line-clamp-1">
                          {complaint.title}
                        </p>
                        <p className="dm-sans-ui mt-1 text-xs text-slate-500">
                          {formatComplaintDate(complaint.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`dm-sans-ui rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
                      >
                        {getComplaintStatusLabel(complaint.status)}
                      </span>
                    </div>
                    <p className="dm-sans-ui mt-3 text-sm text-slate-500">
                      {complaint.latitude?.toFixed(5)},{" "}
                      {complaint.longitude?.toFixed(5)}
                    </p>
                  </Link>
                );
              })}

              {!loading && mappedComplaints.length === 0 ? (
                <p className="dm-sans-ui text-sm text-slate-500">
                  No location-enabled complaints available yet.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
