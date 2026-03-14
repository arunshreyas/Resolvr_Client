"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  formatComplaintDate,
  formatComplaintLocation,
  getComplaintStatusLabel,
  getComplaintStatusTone,
  isComplaintActive,
} from "@/app/lib/complaints";
import { useUserComplaints } from "@/app/hooks/useUserComplaints";
import { useUserRewards } from "@/app/hooks/useUserRewards";

export default function CitizenDashboard() {
  const { complaints, loading, error, user } = useUserComplaints();
  const { rewardPoints } = useUserRewards();

  const stats = useMemo(() => {
    const total = complaints.length;
    const inProgress = complaints.filter((complaint) =>
      isComplaintActive(complaint.status),
    ).length;
    const resolved = complaints.filter(
      (complaint) => complaint.status === "RESOLVED",
    ).length;
    const attention = complaints.filter(
      (complaint) => complaint.status === "REJECTED",
    ).length;

    return [
      {
        label: "Total filed",
        value: String(total),
        icon: "assignment",
        color: "bg-slate-900",
        tag: "All reports",
      },
      {
        label: "In progress",
        value: String(inProgress),
        icon: "pending",
        color: "bg-primary",
        tag: inProgress > 0 ? `${inProgress} active` : "No active work",
      },
      {
        label: "Resolved",
        value: String(resolved),
        icon: "check_circle",
        color: "bg-sage-200",
        tag:
          total > 0 ? `${Math.round((resolved / total) * 100)}% closed` : "No data yet",
      },
      {
        label: "Needs attention",
        value: String(attention),
        icon: "error",
        color: "bg-red-500",
        tag: attention > 0 ? "Review needed" : "All clear",
      },
      {
        label: "Civic Impact",
        value: String(rewardPoints),
        icon: "stars",
        color: "bg-amber-500",
        tag: rewardPoints > 0 ? "~₹" + (rewardPoints / 10).toFixed(0) + " discount" : "Earn points",
      },
    ];
  }, [complaints, rewardPoints]);

  const latestComplaints = useMemo(
    () =>
      [...complaints].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [complaints],
  );

  const summaryText = loading
    ? "Loading your latest complaint activity"
    : complaints.length > 0
      ? `Tracking ${complaints.length} issue${complaints.length === 1 ? "" : "s"} for ${user?.firstName || "you"}`
      : "No complaints filed yet";

  return (
    <div className="p-12 space-y-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-2 text-slate-900">
            My Overview
          </h2>
          <p className="dm-sans-ui text-slate-600 text-sm font-medium">
            {summaryText}
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="dm-sans-ui text-sm font-medium text-slate-600">
            Complaint relay online
          </span>
        </div>
      </div>

      {error ? (
        <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-8 py-6 text-rose-700">
          <p className="dm-sans-ui text-base font-medium">{error}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${
              stat.color === "bg-sage-200"
                ? "bg-slate-100 text-slate-900 border border-slate-200"
                : `${stat.color} text-white`
            } p-10 rounded-[40px] shadow-2xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}
          >
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000 ${
                stat.color === "bg-sage-200" ? "bg-slate-900" : "bg-white"
              }`}
            ></div>
            <div className="flex justify-between items-start mb-12">
              <div
                className={`p-4 rounded-2xl ${
                  stat.color === "bg-sage-200"
                    ? "bg-white text-slate-400"
                    : "bg-white/10 text-white/60"
                } group-hover:text-primary transition-colors`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {stat.icon}
                </span>
              </div>
              <span
                className={`dm-sans-ui text-sm font-medium ${
                  stat.color === "bg-sage-200"
                    ? "text-slate-500"
                    : "text-white/70"
                }`}
              >
                {stat.tag}
              </span>
            </div>
            <p
              className={`dm-sans-ui text-sm font-medium mb-2 ${
                stat.color === "bg-sage-200"
                  ? "text-slate-700"
                  : "text-white/80"
              }`}
            >
              {stat.label}
            </p>
            <h3 className="text-6xl font-black">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-8">
        <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
          <div className="p-12 border-b border-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black tracking-tighter italic text-slate-900">
                Recent Complaints
              </h3>
              <p className="dm-sans-ui text-sm text-slate-500 mt-2">
                {loading
                  ? "Fetching your latest reports"
                  : `${latestComplaints.length} record${latestComplaints.length === 1 ? "" : "s"} found`}
              </p>
            </div>
            <Link
              href="/dashboard/complaints"
              className="dm-sans-ui bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-primary transition-colors"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="p-12">
              <div className="grid gap-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-24 rounded-[28px] bg-slate-50 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ) : latestComplaints.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">
                  description
                </span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-3">
                No complaints yet
              </h4>
              <p className="dm-sans-ui text-base text-slate-500 mb-8">
                Once you submit an issue, it will show up here with live status.
              </p>
              <Link
                href="/dashboard/submit"
                className="dm-sans-ui inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl text-sm font-medium shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-base">
                  add_circle
                </span>
                Submit your first complaint
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {latestComplaints.slice(0, 5).map((complaint) => {
                const tone = getComplaintStatusTone(complaint.status);

                return (
                  <Link
                    key={complaint.id}
                    href={`/dashboard/complaint/${complaint.id}`}
                    className="flex flex-col gap-4 p-8 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="dm-sans-ui text-xs font-medium text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                          C-{complaint.id}
                        </span>
                        <span
                          className={`dm-sans-ui text-xs font-medium px-3 py-1 rounded-full ${tone.badge}`}
                        >
                          {getComplaintStatusLabel(complaint.status)}
                        </span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 line-clamp-1">
                        {complaint.title}
                      </h4>
                      <p className="dm-sans-ui text-sm text-slate-500 mt-2 line-clamp-2">
                        {complaint.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <p className="dm-sans-ui font-medium text-slate-700">
                          {formatComplaintDate(complaint.createdAt)}
                        </p>
                        <p className="dm-sans-ui text-xs text-slate-500">
                          {formatComplaintLocation(complaint)}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-slate-400">
                        arrow_forward
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
            <p className="dm-sans-ui text-sm font-medium text-white/60 mb-3">
              Active field queue
            </p>
            <h3 className="text-4xl font-black mb-4">
              {stats[1].value} live issues
            </h3>
            <p className="dm-sans-ui text-sm text-white/70 leading-relaxed">
              Pending complaints are treated as in progress in your dashboard so
              you can track everything that still needs city action in one place.
            </p>
            <Link
              href="/dashboard/map"
              className="dm-sans-ui inline-flex items-center gap-3 mt-8 rounded-2xl bg-white text-slate-900 px-5 py-3 text-sm font-medium"
            >
              <span className="material-symbols-outlined text-base">map</span>
              Open map view
            </Link>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-xl shadow-slate-200/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black tracking-tighter text-slate-900">
                Quick Actions
              </h3>
              <span className="material-symbols-outlined text-slate-300">
                bolt
              </span>
            </div>
            <div className="grid gap-4">
              <Link
                href="/dashboard/submit"
                className="flex items-center justify-between rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:bg-primary hover:text-white"
              >
                <div>
                  <p className="font-black text-lg">Report a new issue</p>
                  <p className="dm-sans-ui text-sm text-slate-500">
                    Send a complaint with your latest location
                  </p>
                </div>
                <span className="material-symbols-outlined">add_circle</span>
              </Link>
              <Link
                href="/dashboard/complaints"
                className="flex items-center justify-between rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-900 hover:text-white"
              >
                <div>
                  <p className="font-black text-lg">Review your registry</p>
                  <p className="dm-sans-ui text-sm text-slate-500">
                    Browse every complaint with dates and status
                  </p>
                </div>
                <span className="material-symbols-outlined">folder_open</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
