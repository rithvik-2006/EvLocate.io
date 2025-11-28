"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

export function MapAutoCenter({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 14);
  }, [position, map]);
  return null;
}

// 👇 define different icons
const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
});

const nearestIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  shadowAnchor: [15, 50],
});

const stationIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [34, 54],
  iconAnchor: [17, 54],
  shadowAnchor: [17, 54],
});

type Station = {
  id: number;
  title: string;
  lat: number;
  lon: number;
  address?: string;
  town?: string;
  postcode?: string;
  distanceKm?: number;
  status?: string;
};

export default function MapView({
  userPos,
  stations,
}: {
  userPos: [number, number] | null;
  stations: Station[];
}) {
  const center = userPos ?? [20.5937, 78.9629]; // India fallback
  const nearestStation = stations[0]; // already sorted by distance in API

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapAutoCenter position={userPos} />

      {/* 🧍 Your position marker */}
      {userPos && (
        <Marker position={userPos} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* 🔌 EV station markers */}
      {stations.map((s, index) =>
        s.lat && s.lon ? (
          <Marker
            key={s.id}
            position={[s.lat, s.lon]}
            // 👇 nearest station uses gold icon, others green
            icon={index === 0 ? nearestIcon : stationIcon}
          >
            <Popup>
              <strong>{s.title}</strong>
              <br />
              {s.address}, {s.town} {s.postcode}
              <br />
              {s.distanceKm != null && (
                <>
                  {s.distanceKm.toFixed(2)} km away
                  <br />
                </>
              )}
              {s.status && <>Status: {s.status}</>}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}

