"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import type { Complaint } from "@/app/lib/complaints";

export function useUserComplaints() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { user, isLoaded, isSignedIn } = useUser();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !user?.id) {
      setComplaints([]);
      setLoading(false);
      setError(null);
      return;
    }

    const currentClerkUserId = user.id;
    let isCancelled = false;

    async function loadComplaints() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/complaints`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load complaints.");
        }

        const data = (await response.json()) as Complaint[];
        const userComplaints = data.filter(
          (complaint) => complaint.user?.clerkId === currentClerkUserId,
        );

        if (!isCancelled) {
          setComplaints(userComplaints);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load your complaints.",
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    void loadComplaints();

    return () => {
      isCancelled = true;
    };
  }, [apiBaseUrl, isLoaded, isSignedIn, user]);

  return {
    complaints,
    loading,
    error,
    isLoaded,
    isSignedIn,
    user,
  };
}
