"use client";

import Link from "next/link";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { divIcon, latLngBounds } from "leaflet";
import type { Complaint } from "@/app/lib/complaints";
import {
  formatComplaintDate,
  getComplaintStatusLabel,
} from "@/app/lib/complaints";

type ComplaintLeafletMapProps = {
  complaints: Complaint[];
};

const bengaluruCenter: [number, number] = [12.9716, 77.5946];

function FitBounds({ complaints }: ComplaintLeafletMapProps) {
  const map = useMap();

  if (complaints.length > 0) {
    const bounds = latLngBounds(
      complaints.map((complaint) => [
        complaint.latitude as number,
        complaint.longitude as number,
      ]),
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  } else {
    map.setView(bengaluruCenter, 11);
  }

  return null;
}

function getMarkerClass(status: Complaint["status"]) {
  if (status === "RESOLVED") {
    return "bg-emerald-500";
  }

  if (status === "REJECTED") {
    return "bg-rose-500";
  }

  return "bg-primary";
}

export default function ComplaintLeafletMap({
  complaints,
}: ComplaintLeafletMapProps) {
  return (
    <div className="h-[620px] w-full overflow-hidden rounded-[40px]">
      <MapContainer
        center={bengaluruCenter}
        zoom={11}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds complaints={complaints} />

        {complaints.map((complaint) => (
          <Marker
            key={complaint.id}
            position={[complaint.latitude as number, complaint.longitude as number]}
            icon={divIcon({
              className: "",
              html: `<div class="flex h-5 w-5 items-center justify-center rounded-full border-4 border-white shadow-lg ${getMarkerClass(
                complaint.status,
              )}"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup>
              <div className="min-w-[220px]">
                <p className="text-base font-black text-slate-900">
                  {complaint.title}
                </p>
                <p className="dm-sans-ui mt-1 text-xs font-medium text-slate-500">
                  {getComplaintStatusLabel(complaint.status)}
                </p>
                <p className="dm-sans-ui mt-3 text-sm text-slate-600">
                  {complaint.description}
                </p>
                <p className="dm-sans-ui mt-3 text-xs text-slate-400">
                  {formatComplaintDate(complaint.createdAt)}
                </p>
                <Link
                  href={`/dashboard/complaint/${complaint.id}`}
                  className="dm-sans-ui mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white"
                >
                  Open complaint
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
