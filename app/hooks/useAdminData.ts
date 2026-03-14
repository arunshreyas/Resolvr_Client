"use client";

import { useCallback, useEffect, useState } from "react";
import type { Complaint } from "@/app/lib/complaints";

export type AdminUser = {
  id: number;
  clerkId: string | null;
  email: string;
  name: string | null;
  complaints: Complaint[];
};

import { API_BASE_URL, fetchWithRetry } from "@/app/lib/api";

export function useAdminData() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [usersResponse, complaintsResponse] = await Promise.all([
        fetchWithRetry(`${API_BASE_URL}/users`, { cache: "no-store", timeout: 15000 }),
        fetchWithRetry(`${API_BASE_URL}/complaints`, { cache: "no-store", timeout: 15000 }),
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
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return {
    users,
    complaints,
    loading,
    error,
    setUsers,
    setComplaints,
    reload: loadData,
  };
}
