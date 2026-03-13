"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { inferWardLabel } from "@/app/lib/admin";
import { useAdminData } from "@/app/hooks/useAdminData";

const ComplaintLeafletMap = dynamic(
  () => import("@/app/components/ComplaintLeafletMap"),
  { ssr: false },
);

export default function AdminWardGridPage() {
  const { complaints, loading, error } = useAdminData();

  const mappedComplaints = complaints.filter(
    (complaint) => complaint.latitude != null && complaint.longitude != null,
  );

  const wardGroups = useMemo(() => {
    const grouped = new Map<string, number>();
    complaints.forEach((complaint) => {
      const ward = inferWardLabel(complaint);
      grouped.set(ward, (grouped.get(ward) || 0) + 1);
    });
    return Array.from(grouped.entries())
      .map(([ward, total]) => ({ ward, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 12);
  }, [complaints]);

  return (
    <div className="space-y-8 p-12">
      {error ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-4 text-rose-700">
          <p className="dm-sans-ui text-sm font-medium">{error}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-[44px] border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-8 py-6">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">
              Ward Grid Map
            </h2>
          </div>
          {loading ? (
            <div className="h-[520px] bg-slate-50 animate-pulse"></div>
          ) : mappedComplaints.length === 0 ? (
            <div className="flex h-[520px] items-center justify-center bg-slate-50">
              <p className="text-2xl font-black text-slate-900">
                No mapped complaints yet
              </p>
            </div>
          ) : (
            <ComplaintLeafletMap complaints={mappedComplaints} />
          )}
        </div>

        <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900">
            Busiest Wards
          </h2>
          <div className="mt-6 space-y-4">
            {wardGroups.map((ward, index) => (
              <div
                key={ward.ward}
                className="flex items-center justify-between rounded-[24px] bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="dm-sans-ui text-xs font-medium text-slate-400">
                    Rank #{index + 1}
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {ward.ward}
                  </p>
                </div>
                <p className="text-2xl font-black text-slate-900">
                  {ward.total}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
