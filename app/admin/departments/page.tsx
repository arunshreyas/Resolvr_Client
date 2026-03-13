"use client";

import { useMemo } from "react";
import { inferDepartment } from "@/app/lib/admin";
import { getComplaintStatusLabel } from "@/app/lib/complaints";
import { useAdminData } from "@/app/hooks/useAdminData";

export default function AdminDepartmentsPage() {
  const { complaints, loading, error } = useAdminData();

  const departmentGroups = useMemo(() => {
    const grouped = new Map<string, { total: number; latestStatus: string }>();

    complaints.forEach((complaint) => {
      const department = inferDepartment(complaint);
      const current = grouped.get(department) || {
        total: 0,
        latestStatus: "No activity",
      };
      grouped.set(department, {
        total: current.total + 1,
        latestStatus: getComplaintStatusLabel(complaint.status),
      });
    });

    return Array.from(grouped.entries())
      .map(([name, value]) => ({ name, ...value }))
      .sort((a, b) => b.total - a.total);
  }, [complaints]);

  return (
    <div className="space-y-8 p-12">
      {error ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-4 text-rose-700">
          <p className="dm-sans-ui text-sm font-medium">{error}</p>
        </div>
      ) : null}

      <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black tracking-tighter text-slate-900">
          Department Load
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-32 rounded-[28px] bg-slate-50 animate-pulse"></div>
            ))
          ) : (
            departmentGroups.map((department) => (
              <div
                key={department.name}
                className="rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-5"
              >
                <p className="text-2xl font-black text-slate-900">
                  {department.name}
                </p>
                <p className="dm-sans-ui mt-3 text-sm text-slate-500">
                  {department.total} linked complaints
                </p>
                <p className="dm-sans-ui mt-2 text-xs text-slate-400">
                  Latest status trend: {department.latestStatus}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
