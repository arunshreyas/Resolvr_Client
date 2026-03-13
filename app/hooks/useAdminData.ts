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

export function useAdminData() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return {
    apiBaseUrl,
    users,
    complaints,
    loading,
    error,
    setUsers,
    setComplaints,
    reload: loadData,
  };
}
