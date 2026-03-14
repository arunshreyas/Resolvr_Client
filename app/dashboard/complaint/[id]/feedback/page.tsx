"use client";

import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Complaint } from "@/app/lib/complaints";
import {
  formatComplaintDate,
  getComplaintStatusLabel,
  getComplaintStatusTone,
} from "@/app/lib/complaints";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  html?: string;
};

import { API_BASE_URL, fetchWithRetry } from "@/app/lib/api";

export default function ComplaintFeedbackPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const params = useParams<{ id: string }>();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loadingComplaint, setLoadingComplaint] = useState(true);
  const [loadingReply, setLoadingReply] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [urgentReason, setUrgentReason] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Tell me what feels wrong about this complaint update, and I'll help you build a stronger dispute tied to this exact case.",
    },
  ]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !user?.id) {
      setLoadingComplaint(false);
      setError("Please sign in to open dispute support.");
      return;
    }

    if (!params?.id) {
      setLoadingComplaint(false);
      setError("Complaint id is missing.");
      return;
    }

    let isCancelled = false;

    async function loadComplaint() {
      try {
        setLoadingComplaint(true);
        setError(null);

        const response = await fetchWithRetry(`${API_BASE_URL}/complaints/${params.id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not load complaint details.");
        }

        const data = (await response.json()) as Complaint;

        if (data.user?.clerkId !== user?.id) {
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
              : "Could not load dispute context.",
          );
        }
      } finally {
        if (!isCancelled) {
          setLoadingComplaint(false);
        }
      }
    }

    void loadComplaint();

    return () => {
      isCancelled = true;
    };
  }, [isLoaded, isSignedIn, params?.id, user?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loadingReply]);

  const tone = useMemo(
    () => (complaint ? getComplaintStatusTone(complaint.status) : null),
    [complaint],
  );

  async function handleSendMessage(event: React.FormEvent) {
    event.preventDefault();

    const trimmed = draft.trim();

    if (!trimmed || !complaint) {
      return;
    }

    try {
      setLoadingReply(true);
      setError(null);

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token missing. Please sign in again.");
      }

      const nextMessages = [
        ...messages,
        { role: "user" as const, content: trimmed },
      ];
      setMessages(nextMessages);
      setDraft("");

      const response = await fetchWithRetry(
        `${API_BASE_URL}/complaints/${complaint.id}/dispute-chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({
              role,
              content,
            })),
          }),
        },
      );

      const payload = (await response.json().catch(() => null)) as
        | {
            message?: string;
            messageHtml?: string;
            urgent?: boolean;
            urgentReason?: string | null;
          }
        | null;

      if (!response.ok || !payload?.message) {
        throw new Error(
          payload?.message ||
            "The dispute assistant is unavailable right now. Try again shortly.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: payload.message as string,
          html: payload.messageHtml,
        },
      ]);
      setUrgentReason(
        payload.urgent
          ? payload.urgentReason || "This dispute was flagged for quick admin review."
          : null,
      );
    } catch (err: unknown) {
      setMessages((current) =>
        current[current.length - 1]?.content === trimmed &&
        current[current.length - 1]?.role === "user"
          ? current.slice(0, -1)
          : current,
      );
      setDraft(trimmed);
      setError(
        err instanceof Error ? err.message : "Could not send dispute message.",
      );
    } finally {
      setLoadingReply(false);
    }
  }

  if (loadingComplaint) {
    return (
      <div className="p-12">
        <div className="h-[620px] rounded-[48px] bg-white animate-pulse"></div>
      </div>
    );
  }

  if (error && !complaint) {
    return (
      <div className="p-12">
        <div className="rounded-[40px] border border-rose-200 bg-rose-50 px-10 py-8 text-rose-700">
          <p className="dm-sans-ui text-base font-medium">{error}</p>
          <Link
            href="/dashboard/feedback"
            className="dm-sans-ui mt-6 inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back to feedback hub
          </Link>
        </div>
      </div>
    );
  }

  if (!complaint || !tone) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">
            Dispute this complaint
          </h1>
          <p className="dm-sans-ui mt-3 max-w-3xl text-sm text-slate-500">
            Use the assistant to challenge the latest update, ask for a stronger
            response, or draft a message tied to this exact complaint.
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
            Open complaint
          </Link>
          <Link
            href="/dashboard/feedback"
            className="dm-sans-ui inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            Back to hub
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[40px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/20">
          <p className="dm-sans-ui text-sm font-medium text-primary">
            Complaint context
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tighter text-slate-900">
            {complaint.title}
          </h2>
          <p className="dm-sans-ui mt-4 text-sm leading-7 text-slate-600">
            {complaint.description}
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="dm-sans-ui text-xs font-medium text-slate-400">
                Current state
              </p>
              <p className="mt-2 text-lg font-black text-slate-900">
                {getComplaintStatusLabel(complaint.status)}
              </p>
            </div>
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="dm-sans-ui text-xs font-medium text-slate-400">
                Last updated
              </p>
              <p className="mt-2 text-lg font-black text-slate-900">
                {formatComplaintDate(complaint.updatedAt)}
              </p>
            </div>
            <div className="rounded-[28px] bg-slate-50 p-5">
              <p className="dm-sans-ui text-xs font-medium text-slate-400">
                Best prompts
              </p>
              <ul className="dm-sans-ui mt-3 space-y-2 text-sm text-slate-600">
                <li>What evidence would best dispute this update?</li>
                <li>Draft a concise escalation note for the city team.</li>
                <li>Help me explain why this issue is still unresolved.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[40px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300/20">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="dm-sans-ui text-sm font-medium text-white/55">
                OpenRouter dispute assistant
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tighter">
                Complaint conversation
              </h2>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
              Complaint-aware
            </span>
          </div>

          <div className="mt-6 max-h-[540px] space-y-4 overflow-y-auto rounded-[32px] bg-white/5 p-5">
            {urgentReason ? (
              <div className="rounded-[24px] border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-amber-100">
                <p className="dm-sans-ui text-sm font-medium">
                  Urgent dispute flagged for admin review. {urgentReason}
                </p>
              </div>
            ) : null}

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-[24px] px-5 py-4 ${
                    message.role === "assistant"
                      ? "bg-white/10 text-white"
                      : "bg-primary text-white shadow-lg shadow-primary/20"
                  }`}
                >
                  {message.html ? (
                    <div
                      className="dm-sans-ui prose prose-invert prose-sm max-w-none leading-7 [&_code]:rounded-md [&_code]:bg-black/20 [&_code]:px-1.5 [&_code]:py-0.5 [&_li]:my-1"
                      dangerouslySetInnerHTML={{ __html: message.html }}
                    />
                  ) : (
                    <p className="dm-sans-ui whitespace-pre-wrap text-sm leading-7">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loadingReply ? (
              <div className="flex justify-start">
                <div className="rounded-[24px] bg-white/10 px-5 py-4">
                  <p className="dm-sans-ui text-sm text-white/70 animate-pulse">
                    Thinking through your dispute...
                  </p>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="mt-6 space-y-4">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Explain what feels wrong about the status update, what is still unresolved, or what proof you have."
              className="dm-sans-ui min-h-[140px] w-full rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-primary/40"
            />

            {error ? (
              <div className="rounded-[24px] border border-rose-400/20 bg-rose-400/10 px-5 py-4 text-rose-100">
                <p className="dm-sans-ui text-sm font-medium">{error}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="dm-sans-ui text-xs text-white/45">
                Your complaint context and synced email help the assistant keep
                the dispute specific.
              </p>
              <button
                type="submit"
                disabled={loadingReply || !draft.trim()}
                className="dm-sans-ui inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-base">send</span>
                Send message
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
