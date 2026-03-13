"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { divIcon, latLng } from "leaflet";

type ComplaintLocationPickerProps = {
  latitude: number | null;
  longitude: number | null;
  onChange: (coords: { latitude: number; longitude: number }) => void;
};

const bengaluruCenter: [number, number] = [12.9716, 77.5946];

function RecenterMap({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (latitude == null || longitude == null) {
      return;
    }

    map.setView(latLng(latitude, longitude), Math.max(map.getZoom(), 15), {
      animate: true,
    });
  }, [latitude, longitude, map]);

  return null;
}

function LocationMarker({
  latitude,
  longitude,
  onChange,
}: ComplaintLocationPickerProps) {
  useMapEvents({
    click(event) {
      onChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  if (latitude == null || longitude == null) {
    return null;
  }

  return (
    <Marker
      position={[latitude, longitude]}
      draggable
      eventHandlers={{
        dragend(event) {
          const marker = event.target;
          const position = marker.getLatLng();
          onChange({
            latitude: position.lat,
            longitude: position.lng,
          });
        },
      }}
      icon={divIcon({
        className: "",
        html: '<div class="flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-primary shadow-xl"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })}
    />
  );
}

export default function ComplaintLocationPicker({
  latitude,
  longitude,
  onChange,
}: ComplaintLocationPickerProps) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200">
      <MapContainer
        center={
          latitude != null && longitude != null
            ? [latitude, longitude]
            : bengaluruCenter
        }
        zoom={13}
        scrollWheelZoom
        className="h-[360px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap latitude={latitude} longitude={longitude} />
        <LocationMarker
          latitude={latitude}
          longitude={longitude}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}
