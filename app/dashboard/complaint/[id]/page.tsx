"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Complaint } from "@/app/lib/complaints";
import {
  formatComplaintDate,
  formatComplaintLocation,
  getComplaintStatusLabel,
  getComplaintStatusTone,
  isComplaintActive,
} from "@/app/lib/complaints";

export default function ComplaintDetailPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { user, isLoaded, isSignedIn } = useUser();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !user?.id) {
      setLoading(false);
      setError("Please sign in to view this complaint.");
      return;
    }

    if (!params?.id) {
      setLoading(false);
      setError("Complaint id is missing.");
      return;
    }

    const currentUserId = user.id;
    let isCancelled = false;

    async function loadComplaint() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/complaints/${params.id}`, {
          cache: "no-store",
        });

        if (response.status === 404) {
          throw new Error("That complaint could not be found.");
        }

        if (!response.ok) {
          throw new Error("Failed to load complaint details.");
        }

        const data = (await response.json()) as Complaint;

        if (data.user?.clerkId !== currentUserId) {
          throw new Error("You do not have access to this complaint.");
        }

        if (!isCancelled) {
          setComplaint(data);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load complaint details.",
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    void loadComplaint();

    return () => {
      isCancelled = true;
    };
  }, [apiBaseUrl, isLoaded, isSignedIn, params?.id, user]);

  const timeline = useMemo(() => {
    if (!complaint) {
      return [];
    }

    const currentStatus = getComplaintStatusLabel(complaint.status);
    const isActive = isComplaintActive(complaint.status);

    return [
      {
        label: "Complaint filed",
        detail: "Your complaint was registered in the city system.",
        status: "completed",
        date: formatComplaintDate(complaint.createdAt),
      },
      {
        label: "Relay review",
        detail: "The complaint was routed to the civic action queue.",
        status: "completed",
        date: formatComplaintDate(complaint.createdAt),
      },
      {
        label: currentStatus,
        detail: isActive
          ? "The complaint is waiting for or receiving official action."
          : complaint.status === "RESOLVED"
            ? "The complaint was marked resolved by the backend."
            : "The complaint requires attention or rework.",
        status: isActive ? "active" : complaint.status === "RESOLVED" ? "completed" : "alert",
        date: formatComplaintDate(complaint.updatedAt),
      },
    ];
  }, [complaint]);

  if (loading) {
    return (
      <div className="p-12">
        <div className="h-[540px] rounded-[48px] bg-white animate-pulse"></div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="p-12">
        <div className="rounded-[40px] border border-rose-200 bg-rose-50 px-10 py-8 text-rose-700">
          <p className="dm-sans-ui text-base font-medium">
            {error || "Complaint not found."}
          </p>
          <Link
            href="/dashboard/complaints"
            className="dm-sans-ui mt-6 inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to complaints
          </Link>
        </div>
      </div>
    );
  }

  const tone = getComplaintStatusTone(complaint.status);

  return (
    <div className="mx-auto max-w-7xl space-y-10 p-12">
      <div className="flex items-start gap-5">
        <button
          onClick={() => router.back()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-400 shadow-sm transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </button>
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="dm-sans-ui rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              C-{complaint.id}
            </span>
            <span
              className={`dm-sans-ui rounded-full px-3 py-1 text-xs font-medium ${tone.badge}`}
            >
              {getComplaintStatusLabel(complaint.status)}
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">
            {complaint.title}
          </h1>
          <p className="dm-sans-ui mt-3 max-w-3xl text-sm text-slate-500">
            Created {formatComplaintDate(complaint.createdAt)} and updated{" "}
            {formatComplaintDate(complaint.updatedAt)}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_0.8fr]">
        <div className="space-y-8">
          <div className="rounded-[40px] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-200/20">
            <h2 className="text-2xl font-black tracking-tighter text-slate-900">
              Complaint Summary
            </h2>
            <p className="dm-sans-ui mt-5 text-base leading-8 text-slate-600">
              {complaint.description}
            </p>

            <div className="mt-10 grid gap-6 border-t border-slate-100 pt-8 sm:grid-cols-2">
              <div>
                <p className="dm-sans-ui text-xs font-medium text-slate-400">
                  Filed by
                </p>
                <p className="mt-2 text-lg font-black text-slate-900">
                  {complaint.user?.name || complaint.userEmail || "Citizen"}
                </p>
                <p className="dm-sans-ui mt-1 text-sm text-slate-500">
                  {complaint.userEmail || complaint.user?.email}
                </p>
              </div>
              <div>
                <p className="dm-sans-ui text-xs font-medium text-slate-400">
                  Shared location
                </p>
                <p className="mt-2 text-lg font-black text-slate-900">
                  {formatComplaintLocation(complaint)}
                </p>
                <p className="dm-sans-ui mt-1 text-sm text-slate-500">
                  {complaint.latitude != null && complaint.longitude != null
                    ? "Location was captured during submission."
                    : "This complaint was submitted without coordinates."}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] bg-slate-900 p-10 text-white">
            <h2 className="text-2xl font-black tracking-tighter">
              Activity Timeline
            </h2>
            <div className="mt-8 space-y-7">
              {timeline.map((item) => (
                <div key={`${item.label}-${item.date}`} className="flex gap-4">
                  <div
                    className={`mt-1 h-4 w-4 rounded-full ${
                      item.status === "completed"
                        ? "bg-primary"
                        : item.status === "active"
                          ? "bg-white animate-pulse"
                          : "bg-rose-400"
                    }`}
                  ></div>
                  <div>
                    <p className="font-black text-lg">{item.label}</p>
                    <p className="dm-sans-ui mt-1 text-sm text-white/70">
                      {item.detail}
                    </p>
                    <p className="dm-sans-ui mt-2 text-xs text-white/40">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <div
              className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl ${tone.panel}`}
            >
              <span className="material-symbols-outlined text-3xl">
                {tone.icon}
              </span>
            </div>
            <p className="dm-sans-ui text-center text-xs font-medium text-slate-400">
              Current status
            </p>
            <h2 className="mt-3 text-center text-3xl font-black text-slate-900">
              {getComplaintStatusLabel(complaint.status)}
            </h2>
            <p className="dm-sans-ui mt-4 text-center text-sm text-slate-500">
              Pending complaints are shown as in progress so ongoing city work
              stays easier to track.
            </p>
          </div>

          <div className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
            <h3 className="text-2xl font-black tracking-tighter text-slate-900">
              Quick links
            </h3>
            <div className="mt-6 grid gap-4">
              <Link
                href="/dashboard/complaints"
                className="dm-sans-ui rounded-[24px] border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Back to all complaints
              </Link>
              <Link
                href="/dashboard/map"
                className="dm-sans-ui rounded-[24px] border border-slate-100 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                Open map view
              </Link>
              <Link
                href="/dashboard/submit"
                className="dm-sans-ui rounded-[24px] bg-primary px-5 py-4 text-sm font-medium text-white shadow-lg shadow-primary/20"
              >
                Submit another complaint
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
