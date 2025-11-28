// "use client";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect } from "react";

// type Station = {
//   id: number;
//   title: string;
//   lat: number;
//   lon: number;
//   address?: string;
//   town?: string;
//   postcode?: string;
//   distanceKm?: number;
//   status?: string;
// };

// export function MapAutoCenter({ 
//   position,
//   onStationsUpdate 
// }: { 
//   position: [number, number] | null;
//   onStationsUpdate: (stations: Station[]) => void;
// }) {
//   const map = useMap();

//   // Handle map movement to fetch stations based on viewport
//   useEffect(() => {
//     function handleMoveEnd() {
//       const zoom = map.getZoom();
//       const bounds = map.getBounds();
//       const ne = bounds.getNorthEast();
//       const sw = bounds.getSouthWest();
      
//       if (zoom <= 4) {
//         fetch(
//           `/api/stations/global?minLat=${sw.lat}&minLon=${sw.lng}&maxLat=${ne.lat}&maxLon=${ne.lng}&maxresults=500`
//         )
//           .then((r) => r.json())
//           .then((data) => {
//             onStationsUpdate(data.stations ?? []);
//           })
//           .catch((err) => {
//             console.error("Failed to fetch stations:", err);
//           });
//       }
//     }
    
//     map.on("moveend", handleMoveEnd);
//     return () => {
//       map.off("moveend", handleMoveEnd);
//     };
//   }, [map, onStationsUpdate]);

//   // Center map on user position
//   useEffect(() => {
//     if (position) {
//       map.setView(position, 14);
//     }
//   }, [position, map]);

//   return null;
// }

// // Define different icons
// const userIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   iconSize: [30, 50],
//   iconAnchor: [15, 50],
//   popupAnchor: [0, -50],
// });

// const nearestIcon = L.icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [30, 50],
//   iconAnchor: [15, 50],
//   shadowAnchor: [15, 50],
//   popupAnchor: [0, -50],
// });

// const stationIcon = L.icon({
//   iconUrl:
//     "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//   iconSize: [34, 54],
//   iconAnchor: [17, 54],
//   shadowAnchor: [17, 54],
//   popupAnchor: [0, -54],
// });

// export default function MapView({
//   userPos,
//   stations,
//   onStationsUpdate,
// }: {
//   userPos: [number, number] | null;
//   stations: Station[];
//   onStationsUpdate?: (stations: Station[]) => void;
// }) {
//   const center = userPos ?? [20.5937, 78.9629]; // India fallback
//   const nearestStation = stations[0]; // already sorted by distance in API

//   // Default handler if not provided
// //  const handleStationsUpdate = onStationsUpdate || (() => {});

//   return (
//     <MapContainer
//       center={center}
//       zoom={13}
//       style={{ height: "100%", width: "100%" }}
//       scrollWheelZoom={true}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//       />
      
//       <MapAutoCenter 
//         position={userPos} 
//         onStationsUpdate={onStationsUpdate}
//       />

//       {/* Your position marker */}
//       {userPos && (
//         <Marker position={userPos} icon={userIcon}>
//           <Popup>You are here</Popup>
//         </Marker>
//       )}

//       {/* EV station markers */}
//       {stations.map((s, index) =>
//         s.lat && s.lon ? (
//           <Marker
//             key={s.id}
//             position={[s.lat, s.lon]}
//             icon={index === 0 ? nearestIcon : stationIcon}
//           >
//             <Popup>
//               <strong>{s.title}</strong>
//               <br />
//               {s.address}, {s.town} {s.postcode}
//               <br />
//               {s.distanceKm != null && (
//                 <>
//                   {s.distanceKm.toFixed(2)} km away
//                   <br />
//                 </>
//               )}
//               {s.status && <>Status: {s.status}</>}
//             </Popup>
//           </Marker>
//         ) : null
//       )}
//     </MapContainer>
//   );
// }


"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

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

export function MapAutoCenter({ 
  position,
  onStationsUpdate 
}: { 
  position: [number, number] | null;
  onStationsUpdate: (stations: Station[]) => void;
}) {
  const map = useMap();

  // Handle map movement to fetch stations based on viewport
  useEffect(() => {
    function handleMoveEnd() {
      const zoom = map.getZoom();
      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      
      if (zoom <= 4) {
        fetch(
          `/api/stations/global?minLat=${sw.lat}&minLon=${sw.lng}&maxLat=${ne.lat}&maxLon=${ne.lng}&maxresults=500`
        )
          .then((r) => r.json())
          .then((data) => {
            onStationsUpdate(data.stations ?? []);
          })
          .catch((err) => {
            console.error("Failed to fetch stations:", err);
          });
      }
    }
    
    map.on("moveend", handleMoveEnd);
    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map, onStationsUpdate]);

  // Center map on user position
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);

  return null;
}

// Define different icons
const userIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
});

const nearestIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  shadowAnchor: [15, 50],
  popupAnchor: [0, -50],
});

const stationIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [34, 54],
  iconAnchor: [17, 54],
  shadowAnchor: [17, 54],
  popupAnchor: [0, -54],
});

export default function MapView({
  userPos,
  stations,
  onStationsUpdate,
}: {
  userPos: [number, number] | null;
  stations: Station[];
  onStationsUpdate: (stations: Station[]) => void; // Made required, not optional
}) {
  const center = userPos ?? [20.5937, 78.9629]; // India fallback

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      
      <MapAutoCenter 
        position={userPos} 
        onStationsUpdate={onStationsUpdate}
      />

      {/* Your position marker */}
      {userPos && (
        <Marker position={userPos} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {/* EV station markers */}
      {stations.map((s, index) =>
        s.lat && s.lon ? (
          <Marker
            key={s.id}
            position={[s.lat, s.lon]}
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