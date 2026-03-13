import type { Complaint } from "@/app/lib/complaints";
import { isComplaintActive } from "@/app/lib/complaints";
import type { AdminUser } from "@/app/hooks/useAdminData";

export function inferDepartment(complaint: Complaint) {
  const haystack = `${complaint.title} ${complaint.description}`.toLowerCase();

  if (haystack.match(/garbage|waste|dump|sanitation|trash/)) {
    return "Waste Management";
  }

  if (haystack.match(/water|drain|sewage|pipe/)) {
    return "Water Supply";
  }

  if (haystack.match(/light|electric|power|wire/)) {
    return "Electricity";
  }

  if (haystack.match(/road|pothole|street|sidewalk|traffic/)) {
    return "Road Maintenance";
  }

  return "General Civic Operations";
}

export function inferWardLabel(complaint: Complaint) {
  if (complaint.latitude == null || complaint.longitude == null) {
    return "Unmapped Ward";
  }

  const latBucket = Math.round((complaint.latitude - 12.85) * 100);
  const lngBucket = Math.round((complaint.longitude - 77.45) * 100);
  const wardNumber = Math.abs((latBucket * 7 + lngBucket * 11) % 198) + 1;
  return `Ward ${wardNumber}`;
}

export function getAdminStats(users: AdminUser[], complaints: Complaint[]) {
  const active = complaints.filter((complaint) =>
    isComplaintActive(complaint.status),
  ).length;
  const resolved = complaints.filter(
    (complaint) => complaint.status === "RESOLVED",
  ).length;
  const rejected = complaints.filter(
    (complaint) => complaint.status === "REJECTED",
  ).length;
  const mapped = complaints.filter(
    (complaint) => complaint.latitude != null && complaint.longitude != null,
  ).length;

  return { active, resolved, rejected, mapped, totalUsers: users.length };
}
