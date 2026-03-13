"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ComplaintStatus } from "@/app/lib/complaints";
import {
  formatComplaintDate,
  formatComplaintLocation,
  getComplaintStatusLabel,
  getComplaintStatusTone,
} from "@/app/lib/complaints";
import { useAdminData } from "@/app/hooks/useAdminData";

type StatusFilter = "ALL" | ComplaintStatus;

const statusActions: ComplaintStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "RESOLVED",
  "REJECTED",
];

export default function AdminRegistryPage() {
  const { apiBaseUrl, complaints, loading, error, setComplaints } =
    useAdminData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [message, setMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    if (!message && !actionError) return;
    const timer = window.setTimeout(() => {
      setMessage(null);
      setActionError(null);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [actionError, message]);

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
        const matchesQuery =
          !normalizedQuery ||
          [
            complaint.title,
            complaint.description,
            complaint.user?.name || "",
            complaint.user?.email || "",
            complaint.userEmail || "",
            `c-${complaint.id}`,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesStatus && matchesQuery;
      });
  }, [complaints, query, statusFilter]);

  async function patchComplaint(id: number, status: ComplaintStatus) {
    try {
      setBusyId(id);
      setActionError(null);
      const response = await fetch(`${apiBaseUrl}/complaints/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update complaint.");
      const updated = await response.json();
      setComplaints((current) =>
        current.map((complaint) => (complaint.id === id ? updated : complaint)),
      );
      setMessage(`Complaint C-${id} updated.`);
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : "Could not update complaint.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function deleteComplaint(id: number) {
    if (!window.confirm(`Delete complaint C-${id}?`)) return;
    try {
      setBusyId(id);
      setActionError(null);
      const response = await fetch(`${apiBaseUrl}/complaints/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete complaint.");
      setComplaints((current) =>
        current.filter((complaint) => complaint.id !== id),
      );
      setMessage(`Complaint C-${id} deleted.`);
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : "Could not delete complaint.",
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8 p-12">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search complaints or reporter email"
            className="dm-sans-ui rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none shadow-sm sm:w-80"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="dm-sans-ui rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none shadow-sm"
          >
            <option value="ALL">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <p className="dm-sans-ui text-sm font-medium text-slate-500">
          {filteredComplaints.length} complaint
          {filteredComplaints.length === 1 ? "" : "s"} in view
        </p>
      </div>

      {error || actionError ? (
        <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-4 text-rose-700">
          <p className="dm-sans-ui text-sm font-medium">
            {actionError || error}
          </p>
        </div>
      ) : null}

      {message ? (
        <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-700">
          <p className="dm-sans-ui text-sm font-medium">{message}</p>
        </div>
      ) : null}

      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-[28px] bg-white animate-pulse shadow-sm"
            ></div>
          ))
        ) : (
          filteredComplaints.map((complaint) => {
            const tone = getComplaintStatusTone(complaint.status);
            const isBusy = busyId === complaint.id;

            return (
              <div
                key={complaint.id}
                className="rounded-[28px] border border-slate-100 bg-white px-5 py-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 2xl:flex-row 2xl:items-start 2xl:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="dm-sans-ui rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        C-{complaint.id}
                      </span>
                      <span
                        className={`dm-sans-ui rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
                      >
                        {getComplaintStatusLabel(complaint.status)}
                      </span>
                    </div>
                    <p className="mt-4 text-xl font-black text-slate-900">
                      {complaint.title}
                    </p>
                    <p className="dm-sans-ui mt-2 line-clamp-2 text-sm text-slate-500">
                      {complaint.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <p className="dm-sans-ui text-xs font-medium text-slate-400">
                        {complaint.user?.name || complaint.user?.email}
                      </p>
                      <p className="dm-sans-ui text-xs font-medium text-slate-400">
                        {formatComplaintDate(complaint.createdAt)}
                      </p>
                      <p className="dm-sans-ui text-xs font-medium text-slate-400">
                        {formatComplaintLocation(complaint)}
                      </p>
                    </div>
                  </div>

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
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100"
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
                        className="dm-sans-ui flex-1 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs font-medium text-slate-700"
                      >
                        Open detail
                      </Link>
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => void deleteComplaint(complaint.id)}
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
  );
}
