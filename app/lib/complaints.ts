export type ComplaintStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED";

export type Complaint = {
  id: number;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  latitude: number | null;
  longitude: number | null;
  userEmail: string | null;
  resolutionNote?: string;
  user: {
    id: number;
    name: string | null;
    email: string;
    clerkId: string | null;
  };
};

export function getComplaintStatusLabel(status: ComplaintStatus) {
  if (status === "PENDING" || status === "IN_PROGRESS") {
    return "In Progress";
  }

  if (status === "RESOLVED") {
    return "Resolved";
  }

  return "Needs Attention";
}

export function isComplaintActive(status: ComplaintStatus) {
  return status === "PENDING" || status === "IN_PROGRESS";
}

export function getComplaintStatusTone(status: ComplaintStatus) {
  if (status === "RESOLVED") {
    return {
      dot: "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      panel: "bg-emerald-50 text-emerald-700",
      icon: "verified",
    };
  }

  if (status === "REJECTED") {
    return {
      dot: "bg-rose-500",
      badge: "bg-rose-50 text-rose-700 border border-rose-100",
      panel: "bg-rose-50 text-rose-700",
      icon: "warning",
    };
  }

  return {
    dot: "bg-primary animate-pulse",
    badge: "bg-primary/10 text-primary border border-primary/10",
    panel: "bg-primary/10 text-primary",
    icon: "sync",
  };
}

export function formatComplaintDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatComplaintLocation(complaint: Complaint) {
  if (complaint.latitude == null || complaint.longitude == null) {
    return "Location not shared";
  }

  return `${complaint.latitude.toFixed(4)}, ${complaint.longitude.toFixed(4)}`;
}
