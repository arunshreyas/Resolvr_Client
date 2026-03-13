"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Complaint, ComplaintStatus } from "@/app/lib/complaints";
import {
  formatComplaintDate,
  formatComplaintLocation,
  getComplaintStatusLabel,
  getComplaintStatusTone,
  isComplaintActive,
} from "@/app/lib/complaints";

type AdminUser = {
  id: number;
  clerkId: string | null;
  email: string;
  name: string | null;
  complaints: Complaint[];
};

type StatusFilter = "ALL" | ComplaintStatus;

const ComplaintLeafletMap = dynamic(
  () => import("@/app/components/ComplaintLeafletMap"),
  { ssr: false },
);

const statusActions: ComplaintStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "RESOLVED",
  "REJECTED",
];

export default function AdminDashboard() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersResponse, complaintsResponse] = await Promise.all([
        fetch(`${apiBaseUrl}/users`, { cache: "no-store" }),
        fetch(`${apiBaseUrl}/complaints`, { cache: "no-store" }),
      ]);

      if (!usersResponse.ok || !complaintsResponse.ok) {
        throw new Error("Failed to load admin data.");
      }

      const [usersData, complaintsData] = (await Promise.all([
        usersResponse.json(),
        complaintsResponse.json(),
      ])) as [AdminUser[], Complaint[]];

      setUsers(usersData);
      setComplaints(complaintsData);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Could not load admin dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2200);
    return () => window.clearTimeout(timer);
  }, [message]);

  const filteredComplaints = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...complaints]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .filter((complaint) => {
        const matchesStatus =
          statusFilter === "ALL" || complaint.status === statusFilter;
        const haystack = [
          complaint.title,
          complaint.description,
          complaint.user?.name || "",
          complaint.user?.email || "",
          complaint.userEmail || "",
          `c-${complaint.id}`,
        ]
          .join(" ")
          .toLowerCase();
        return matchesStatus && (!normalizedQuery || haystack.includes(normalizedQuery));
      });
  }, [complaints, query, statusFilter]);

  const selectedComplaint =
    complaints.find((complaint) => complaint.id === selectedId) ||
    filteredComplaints[0] ||
    null;

  const mappedComplaints = complaints.filter(
    (complaint) => complaint.latitude != null && complaint.longitude != null,
  );
  const activeCount = complaints.filter((complaint) =>
    isComplaintActive(complaint.status),
  ).length;
  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "RESOLVED",
  ).length;
  const rejectedCount = complaints.filter(
    (complaint) => complaint.status === "REJECTED",
  ).length;
  const topUsers = [...users]
    .sort((a, b) => b.complaints.length - a.complaints.length)
    .slice(0, 5);

  async function patchComplaint(id: number, status: ComplaintStatus) {
    try {
      setBusyId(id);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update complaint.");
      const updated = (await response.json()) as Complaint;
      setComplaints((current) =>
        current.map((complaint) => (complaint.id === id ? updated : complaint)),
      );
      setSelectedId(id);
      setMessage(`Complaint C-${id} updated.`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Could not update complaint.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function removeComplaint(id: number) {
    if (!window.confirm(`Delete complaint C-${id}?`)) return;
    try {
      setBusyId(id);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/complaints/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete complaint.");
      setComplaints((current) => current.filter((complaint) => complaint.id !== id));
      setUsers((current) =>
        current.map((user) => ({
          ...user,
          complaints: user.complaints.filter((complaint) => complaint.id !== id),
        })),
      );
      if (selectedId === id) setSelectedId(null);
      setMessage(`Complaint C-${id} deleted.`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Could not delete complaint.",
      );
    } finally {
      setBusyId(null);
    }
  }

  const stats = [
    { label: "Complaints", value: complaints.length, tag: `${activeCount} active` },
    { label: "Users", value: users.length, tag: `${users.filter((u) => u.clerkId).length} synced` },
    { label: "Resolved", value: resolvedCount, tag: complaints.length ? `${Math.round((resolvedCount / complaints.length) * 100)}% closure` : "No data" },
    { label: "Mapped", value: mappedComplaints.length, tag: "Geo-enabled" },
  ];

  return (
    <div className="space-y-10 p-12">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="dm-sans-ui mb-3 text-sm font-medium text-primary">Admin operations</p>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">Control Center</h1>
          <p className="dm-sans-ui mt-3 max-w-3xl text-sm text-slate-500">
            Live admin view for complaints, users, map activity, and queue actions.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => void loadData()}
            className="dm-sans-ui rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm"
          >
            Refresh
          </button>
          <Link
            href="/dashboard/map"
            className="dm-sans-ui rounded-2xl bg-primary px-5 py-4 text-sm font-medium text-white shadow-lg shadow-primary/20"
          >
            Open citizen map
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-4 text-rose-700">
          <p className="dm-sans-ui text-sm font-medium">{error}</p>
        </div>
      ) : null}
      {message ? (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-700">
          <p className="dm-sans-ui text-sm font-medium">{message}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/30">
            <p className="dm-sans-ui text-sm font-medium text-slate-500">{stat.label}</p>
            <h2 className="mt-3 text-5xl font-black text-slate-900">{stat.value}</h2>
            <p className="dm-sans-ui mt-3 text-xs font-medium text-slate-400">{stat.tag}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/20">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tighter text-slate-900">Queue Management</h2>
              <p className="dm-sans-ui mt-2 text-sm text-slate-500">
                Search, filter, update status, and delete complaints.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search complaints or users"
                className="dm-sans-ui rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none sm:w-72"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                className="dm-sans-ui rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none"
              >
                <option value="ALL">All statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-28 rounded-[28px] bg-slate-50 animate-pulse"></div>
              ))
            ) : filteredComplaints.length === 0 ? (
              <div className="rounded-[28px] border border-slate-100 bg-slate-50 px-6 py-10 text-center">
                <p className="text-2xl font-black text-slate-900">No matching complaints</p>
              </div>
            ) : (
              filteredComplaints.map((complaint) => {
                const tone = getComplaintStatusTone(complaint.status);
                const isBusy = busyId === complaint.id;
                return (
                  <div
                    key={complaint.id}
                    className={`rounded-[28px] border px-5 py-5 ${
                      selectedComplaint?.id === complaint.id
                        ? "border-primary/30 bg-primary/5"
                        : "border-slate-100 bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col gap-5 2xl:flex-row 2xl:items-start 2xl:justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedId(complaint.id)}
                        className="min-w-0 text-left"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="dm-sans-ui rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                            C-{complaint.id}
                          </span>
                          <span className={`dm-sans-ui rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}>
                            {getComplaintStatusLabel(complaint.status)}
                          </span>
                        </div>
                        <p className="mt-4 text-xl font-black text-slate-900">{complaint.title}</p>
                        <p className="dm-sans-ui mt-2 line-clamp-2 text-sm text-slate-500">{complaint.description}</p>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          <p className="dm-sans-ui text-xs font-medium text-slate-400">
                            {complaint.user?.name || complaint.user?.email || complaint.userEmail}
                          </p>
                          <p className="dm-sans-ui text-xs font-medium text-slate-400">{formatComplaintDate(complaint.createdAt)}</p>
                          <p className="dm-sans-ui text-xs font-medium text-slate-400">{formatComplaintLocation(complaint)}</p>
                        </div>
                      </button>

                      <div className="grid gap-2 2xl:min-w-[230px]">
                        <div className="grid grid-cols-2 gap-2">
                          {statusActions.map((status) => (
                            <button
                              key={status}
                              type="button"
                              disabled={isBusy}
                              onClick={() => void patchComplaint(complaint.id, status)}
                              className={`dm-sans-ui rounded-2xl px-3 py-3 text-xs font-medium transition ${
                                complaint.status === status
                                  ? "bg-slate-900 text-white"
                                  : "bg-white text-slate-600 hover:bg-slate-100"
                              } disabled:opacity-50`}
                            >
                              {status === "IN_PROGRESS"
                                ? "In progress"
                                : status.charAt(0) + status.slice(1).toLowerCase()}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/dashboard/complaint/${complaint.id}`}
                            className="dm-sans-ui flex-1 rounded-2xl bg-white px-4 py-3 text-center text-xs font-medium text-slate-700"
                          >
                            Open detail
                          </Link>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void removeComplaint(complaint.id)}
                            className="dm-sans-ui rounded-2xl bg-rose-500 px-4 py-3 text-xs font-medium text-white disabled:opacity-50"
                          >
                            {isBusy ? "Working" : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/20">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">Selected Complaint</h2>
            {selectedComplaint ? (
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <span className="dm-sans-ui rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    C-{selectedComplaint.id}
                  </span>
                  <span className={`dm-sans-ui rounded-full px-3 py-1 text-xs font-medium ${getComplaintStatusTone(selectedComplaint.status).badge}`}>
                    {getComplaintStatusLabel(selectedComplaint.status)}
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900">{selectedComplaint.title}</p>
                <p className="dm-sans-ui text-sm leading-7 text-slate-500">{selectedComplaint.description}</p>
                <div className="grid gap-3">
                  <div className="rounded-[22px] bg-slate-50 px-4 py-4">
                    <p className="dm-sans-ui text-xs font-medium text-slate-400">Reporter</p>
                    <p className="mt-2 text-lg font-black text-slate-900">
                      {selectedComplaint.user?.name ||
                        selectedComplaint.user?.email ||
                        selectedComplaint.userEmail ||
                        "Unknown"}
                    </p>
                  </div>
                  <div className="rounded-[22px] bg-slate-50 px-4 py-4">
                    <p className="dm-sans-ui text-xs font-medium text-slate-400">Location</p>
                    <p className="mt-2 text-lg font-black text-slate-900">
                      {formatComplaintLocation(selectedComplaint)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="dm-sans-ui mt-6 text-sm text-slate-500">
                Pick a complaint from the queue to inspect it here.
              </p>
            )}
          </div>

          <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/20">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">User Directory</h2>
            <div className="mt-6 space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-20 rounded-[28px] bg-slate-50 animate-pulse"></div>
                ))
              ) : users.length === 0 ? (
                <p className="dm-sans-ui text-sm text-slate-500">No users synced yet.</p>
              ) : (
                [...users]
                  .sort((a, b) => b.complaints.length - a.complaints.length)
                  .map((user) => (
                    <div
                      key={user.id}
                      className="rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-lg font-black text-slate-900 truncate">
                            {user.name || user.email.split("@")[0]}
                          </p>
                          <p className="dm-sans-ui mt-1 truncate text-sm text-slate-500">
                            {user.email}
                          </p>
                          <p className="dm-sans-ui mt-2 text-xs text-slate-400">
                            {user.clerkId ? "Clerk synced" : "Manual/local user"}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 text-center">
                          <p className="text-2xl font-black text-slate-900">{user.complaints.length}</p>
                          <p className="dm-sans-ui text-xs font-medium text-slate-400">reports</p>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="overflow-hidden rounded-[44px] border border-slate-100 bg-white shadow-2xl shadow-slate-200/20">
          <div className="border-b border-slate-100 px-8 py-6">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">Issue Map</h2>
            <p className="dm-sans-ui mt-2 text-sm text-slate-500">
              Real complaint markers across all geo-enabled reports.
            </p>
          </div>
          {loading ? (
            <div className="flex h-[420px] items-center justify-center bg-slate-50">
              <div className="h-20 w-20 rounded-full border-8 border-slate-200 border-t-primary animate-spin"></div>
            </div>
          ) : mappedComplaints.length === 0 ? (
            <div className="flex h-[420px] flex-col items-center justify-center bg-slate-50 px-6 text-center">
              <p className="text-2xl font-black text-slate-900">No mapped complaints yet</p>
            </div>
          ) : (
            <ComplaintLeafletMap complaints={mappedComplaints} />
          )}
        </div>

        <div className="rounded-[44px] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/20">
          <h2 className="text-3xl font-black tracking-tighter text-slate-900">Recent Intake</h2>
          <div className="mt-6 space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-24 rounded-[28px] bg-slate-50 animate-pulse"></div>
              ))
            ) : (
              complaints
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                )
                .slice(0, 6)
                .map((complaint) => {
                  const tone = getComplaintStatusTone(complaint.status);
                  return (
                    <Link
                      key={complaint.id}
                      href={`/dashboard/complaint/${complaint.id}`}
                      className="block rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4 transition-colors hover:bg-slate-100"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-lg font-black text-slate-900 line-clamp-1">{complaint.title}</p>
                          <p className="dm-sans-ui mt-2 text-sm text-slate-500 line-clamp-2">{complaint.description}</p>
                        </div>
                        <span className={`dm-sans-ui shrink-0 rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}>
                          {getComplaintStatusLabel(complaint.status)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="dm-sans-ui text-xs font-medium text-slate-400">C-{complaint.id}</p>
                        <p className="dm-sans-ui text-xs font-medium text-slate-400">{formatComplaintDate(complaint.createdAt)}</p>
                      </div>
                    </Link>
                  );
                })
            )}
          </div>
          <div className="mt-8 rounded-[28px] bg-slate-900 px-5 py-5 text-white">
            <p className="dm-sans-ui text-xs font-medium text-white/50">Top reporters right now</p>
            <div className="mt-4 space-y-3">
              {topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <p className="dm-sans-ui text-sm text-white/80">
                    {index + 1}. {user.name || user.email.split("@")[0]}
                  </p>
                  <p className="text-sm font-black">{user.complaints.length}</p>
                </div>
              ))}
              {!loading && topUsers.length === 0 ? (
                <p className="dm-sans-ui text-sm text-white/60">No user activity yet.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
