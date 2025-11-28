// app/api/stations/route.ts
import { NextRequest, NextResponse } from "next/server";

const OCM_API = "https://api.openchargemap.io/v3/poi";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const distance = searchParams.get("distance") ?? "10"; // km
  const maxresults = searchParams.get("maxresults") ?? "20";

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "lat and lon are required" },
      { status: 400 }
    );
  }

  const url = `${OCM_API}?output=json&latitude=${lat}&longitude=${lon}&distance=${distance}&maxresults=${maxresults}`;

  const res = await fetch(url, {
    headers: {
      "X-API-Key": process.env.OCM_API_KEY!, // set in .env.local
    },
    // You can also send a User-Agent header if OCM recommends it
  });

  if (!res.ok) {
    console.error("OCM error:", await res.text());
    return NextResponse.json(
      { error: "Failed to fetch from OpenChargeMap" },
      { status: 500 }
    );
  }

  const data = await res.json();

  // Normalize the structure
  const stations = data.map((item: any) => ({
    id: item.ID,
    title: item.AddressInfo?.Title ?? "Unknown",
    lat: item.AddressInfo?.Latitude,
    lon: item.AddressInfo?.Longitude,
    address: item.AddressInfo?.AddressLine1,
    town: item.AddressInfo?.Town,
    state: item.AddressInfo?.StateOrProvince,
    postcode: item.AddressInfo?.Postcode,
    distanceKm: item.AddressInfo?.Distance, // already from API
    usageType: item.UsageType?.Title,
    status: item.StatusType?.Title,
    isOperational: item.StatusType?.IsOperational ?? null,
    operator: item.OperatorInfo?.Title,
    usageCost: item.UsageCost,
    connections:
      item.Connections?.map((c: any) => ({
        type: c.ConnectionType?.Title,
        level: c.Level?.Title,
        powerKW: c.PowerKW,
        amps: c.Amps,
        voltage: c.Voltage,
        quantity: c.Quantity,
      })) ?? [],
  }));

  // Sort by distance just in case
  stations.sort((a: any, b: any) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));

  return NextResponse.json({ stations });
}

