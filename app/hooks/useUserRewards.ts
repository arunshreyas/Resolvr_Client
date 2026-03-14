"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export type UserProfile = {
  id: number;
  clerkId: string;
  email: string;
  name: string | null;
  rewardPoints: number;
};

import { API_BASE_URL, fetchWithRetry } from "@/app/lib/api";

export function useUserRewards() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
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

        const token = await getToken();
        
        const response = await fetchWithRetry(`${API_BASE_URL}/users/me`, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, [isLoaded, isSignedIn, user, getToken]);

  return {
    profile,
    rewardPoints: profile?.rewardPoints || 0,
    loading,
    error,
    isLoaded,
    isSignedIn,
  };
}
