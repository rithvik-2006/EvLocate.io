// app/api/stations/global/route.ts
import { NextRequest, NextResponse } from "next/server";

const OCM_API = "https://api.openchargemap.io/v3/poi";

function parseNum(value: string | null) {
  if (value == null) return NaN;
  const n = Number(value);
  return Number.isNaN(n) ? NaN : n;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const minLat = parseNum(searchParams.get("minLat")); // south
  const minLon = parseNum(searchParams.get("minLon")); // west
  const maxLat = parseNum(searchParams.get("maxLat")); // north
  const maxLon = parseNum(searchParams.get("maxLon")); // east

  const maxresults = searchParams.get("maxresults") ?? "500"; // be nice to OCM

  if (
    Number.isNaN(minLat) ||
    Number.isNaN(minLon) ||
    Number.isNaN(maxLat) ||
    Number.isNaN(maxLon)
  ) {
    return NextResponse.json(
      { error: "minLat, minLon, maxLat, maxLon are required numeric values" },
      { status: 400 }
    );
  }

  // OCM expects boundingbox as: (topLeftLat,topLeftLon),(bottomRightLat,bottomRightLon)
  // top-left = (maxLat, minLon), bottom-right = (minLat, maxLon)
  const bbox = `(${maxLat},${minLon}),(${minLat},${maxLon})`;

  const url =
    `${OCM_API}?output=json` +
    `&boundingbox=${encodeURIComponent(bbox)}` +
    `&maxresults=${maxresults}` +
    `&compact=true&verbose=false`; // lighter response for global view

  const res = await fetch(url, {
    headers: {
      "X-API-Key": process.env.OCM_API_KEY!,
    },
  });

  if (!res.ok) {
    console.error("OCM global error:", await res.text());
    return NextResponse.json(
      { error: "Failed to fetch from OpenChargeMap (global)" },
      { status: 500 }
    );
  }

  const data = await res.json();

  const stations = data.map((item: any) => ({
    id: item.ID,
    title: item.AddressInfo?.Title ?? "Unknown",
    lat: item.AddressInfo?.Latitude,
    lon: item.AddressInfo?.Longitude,
    address: item.AddressInfo?.AddressLine1,
    town: item.AddressInfo?.Town,
    state: item.AddressInfo?.StateOrProvince,
    postcode: item.AddressInfo?.Postcode,
    // no distance here (not using lat/lon distance mode),
    // but frontend can calculate if needed
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

  return NextResponse.json({ stations });
}

