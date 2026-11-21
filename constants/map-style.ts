import type { MapStyleElement } from "react-native-maps";

// Soft, muted Google Maps look (Android only; Apple Maps ignores it).
export const MUTED_MAP_STYLE: MapStyleElement[] = [
  { elementType: "geometry", stylers: [{ color: "#f3f1ec" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b6b6b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f7f6f2" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ visibility: "on" }, { color: "#dfe8d3" }] },
  { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e4e2dc" }] },
  { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#fffdf8" }] },
  { featureType: "transit", elementType: "labels", stylers: [{ visibility: "on" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e7e4dd" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#cfe3ee" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#8aa4b3" }] },
];
