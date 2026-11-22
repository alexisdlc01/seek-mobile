export type PillInput = { id: string; lng: number; lat: number; price: number | null };

// Pill size on screen, close enough to detect overlaps without measuring views.
const pillWidth = (price: number | null) => (price == null ? 30 : 22 + 8.2 * `£${price}`.length);
const PILL_H = 30;
// MapLibre uses 512px tiles: the world is 512 * 2^zoom points wide.
const project = (lng: number, lat: number, zoom: number) => {
  const size = 512 * 2 ** zoom;
  const sin = Math.sin((lat * Math.PI) / 180);
  return {
    x: ((lng + 180) / 360) * size,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * size,
  };
};

/**
 * Ids of pills that would overlap a kept one and should shrink to dots.
 * The selected pill is kept first, then the cheapest ones (same as the web map).
 */
export function collidingPills(pills: PillInput[], selectedId: string | null, zoom: number): Set<string> {
  const rank = (pill: PillInput) => (pill.id === selectedId ? -Infinity : pill.price ?? Infinity);
  const kept: { x1: number; x2: number; y1: number; y2: number }[] = [];
  const dots = new Set<string>();
  for (const pill of [...pills].sort((a, b) => rank(a) - rank(b))) {
    const p = project(pill.lng, pill.lat, zoom);
    const w = pillWidth(pill.price) / 2;
    const r = { x1: p.x - w, x2: p.x + w, y1: p.y - PILL_H / 2, y2: p.y + PILL_H / 2 };
    if (kept.some((k) => r.x1 < k.x2 && r.x2 > k.x1 && r.y1 < k.y2 && r.y2 > k.y1)) dots.add(pill.id);
    else kept.push(r);
  }
  return dots;
}
