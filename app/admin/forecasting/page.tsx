"use client";

import { useMemo } from "react";
import { formatComplaintDate } from "@/app/lib/complaints";
import { useAdminData } from "@/app/hooks/useAdminData";

export default function AdminForecastingPage() {
  const { complaints, loading, error } = useAdminData();

  const recentSeries = useMemo(() => {
    const grouped = new Map<string, number>();

    complaints.forEach((complaint) => {
      const day = new Date(complaint.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      grouped.set(day, (grouped.get(day) || 0) + 1);
    });

    return Array.from(grouped.entries())
      .map(([label, count]) => ({ label, count }))
      .slice(-7);
  }, [complaints]);

  const averageDailyIntake = useMemo(() => {
    if (recentSeries.length === 0) return 0;
    return (
      recentSeries.reduce((sum, day) => sum + day.count, 0) / recentSeries.length
    );
  }, [recentSeries]);

  const projectedNextWeek = Math.round(averageDailyIntake * 7);
  const peakDay = recentSeries.reduce(
    (best, day) => (day.count > best.count ? day : best),
    { label: "N/A", count: 0 },
  );

  return (
    <div className="space-y-8 p-12">
      {error ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-4 text-rose-700">
          <p className="dm-sans-ui text-sm font-medium">{error}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm">
          <p className="dm-sans-ui text-sm font-medium text-slate-500">
            Average daily intake
          </p>
          <h2 className="mt-3 text-5xl font-black text-slate-900">
            {averageDailyIntake.toFixed(1)}
          </h2>
          <p className="dm-sans-ui mt-3 text-sm text-slate-400">
            Complaints per observed day
          </p>
        </div>
        <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm">
          <p className="dm-sans-ui text-sm font-medium text-slate-500">
            Projected next 7 days
          </p>
          <h2 className="mt-3 text-5xl font-black text-slate-900">
            {projectedNextWeek}
          </h2>
          <p className="dm-sans-ui mt-3 text-sm text-slate-400">
            Based on current intake velocity
          </p>
        </div>
        <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-sm">
          <p className="dm-sans-ui text-sm font-medium text-slate-500">
            Peak intake day
          </p>
          <h2 className="mt-3 text-4xl font-black text-slate-900">
            {peakDay.label}
          </h2>
          <p className="dm-sans-ui mt-3 text-sm text-slate-400">
            {peakDay.count} complaints logged
          </p>
        </div>
      </div>

      <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black tracking-tighter text-slate-900">
          Intake Trend
        </h2>
        <div className="mt-8 grid gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-12 rounded-full bg-slate-50 animate-pulse"></div>
            ))
          ) : recentSeries.length === 0 ? (
            <p className="dm-sans-ui text-sm text-slate-500">
              No complaint history available yet.
            </p>
          ) : (
            recentSeries.map((day) => (
              <div key={day.label}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="dm-sans-ui text-sm font-medium text-slate-700">
                    {day.label}
                  </p>
                  <p className="dm-sans-ui text-sm font-medium text-slate-500">
                    {day.count}
                  </p>
                </div>
                <div className="h-5 rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.max(12, (day.count / Math.max(...recentSeries.map((entry) => entry.count), 1)) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black tracking-tighter text-slate-900">
          Latest Signals
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {complaints
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            )
            .slice(0, 6)
            .map((complaint) => (
              <div
                key={complaint.id}
                className="rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-5"
              >
                <p className="text-xl font-black text-slate-900 line-clamp-2">
                  {complaint.title}
                </p>
                <p className="dm-sans-ui mt-2 text-sm text-slate-500">
                  {formatComplaintDate(complaint.createdAt)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
