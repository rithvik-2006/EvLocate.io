"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// dynamic import disables SSR for Leaflet
const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function ChargeMapPage() {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [stations, setStations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos([latitude, longitude]);
        loadStations(latitude, longitude);
      },
      (err) => {
        console.error(err);
        alert("Unable to get your location :(");
      }
    );
  }, []);

  const loadStations = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stations?lat=${lat}&lon=${lon}&distance=10`);
      const data = await res.json();
      setStations(data.stations ?? []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {loading && <p style={{ padding: 10 }}>Loading nearby chargers…</p>}
      <MapView userPos={userPos} stations={stations} />
    </div>
  );
}
