"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export type UserProfile = {
  id: number;
  clerkId: string;
  email: string;
  name: string | null;
  rewardPoints: number;
};

export function useUserRewards() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { user, isLoaded, isSignedIn } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !user?.id) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;

    async function loadRewards() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/users/me`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load user profile.");
        }

        const data = (await response.json()) as UserProfile;

        if (!isCancelled) {
          setProfile(data);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Could not load your rewards.",
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    void loadRewards();

    return () => {
      isCancelled = true;
    };
  }, [apiBaseUrl, isLoaded, isSignedIn, user]);

  return {
    profile,
    rewardPoints: profile?.rewardPoints || 0,
    loading,
    error,
    isLoaded,
    isSignedIn,
  };
}
