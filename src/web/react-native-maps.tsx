// Web stand-in for react-native-maps, which only supports iOS and Android.
// metro.config.js points the web bundle here so the native map screen can still
// be bundled; the web Find tab (map.web.tsx) never renders it.
import React from "react";

export type LatLng = { latitude: number; longitude: number };
export type MarkerPressEvent = unknown;

export const PROVIDER_GOOGLE = "google";

const MapView = React.forwardRef<unknown, { children?: React.ReactNode }>(
  function MapView({ children }, _ref) {
    return <>{children}</>;
  },
);

export function Marker({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export default MapView;
