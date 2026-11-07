/**
 * Seek palettes (mobile). Light: navy on grey. Dark: deep navy with pale-blue
 * accents. No turquoise on mobile (that stays on the landlord web app).
 * Read it with `useSeekTheme()`; never import LIGHT/DARK into screens directly.
 */

export type SeekColors = {
  isDark: boolean;
  /** Screen background. */
  background: string;
  /** Cards, sheets, inputs sitting on the background. */
  surface: string;
  /** Slightly recessed fill inside a surface (attachment chip, search field). */
  surfaceAlt: string;
  /** Text input background (in dark the field sits darker than its card). */
  input: string;
  /** Primary text. */
  text: string;
  mutedText: string;
  /** Hairline between rows and around cards. */
  line: string;
  /** Outline of secondary buttons and unselected options. */
  lineStrong: string;
  /** Text, icon and outline accent (navy in light, pale blue in dark). */
  accent: string;
  accentPressed: string;
  /** Filled primary button: background and the text on it. */
  primary: string;
  onPrimary: string;
  /** Soft tinted fill (selected option, info banner, chip). */
  tint: string;
  onTint: string;
  /** Prominent card (next rent, AI advice, passport). */
  hero: string;
  onHero: string;
  heroMuted: string;
  /** Small filled control on a hero card. */
  heroChip: string;
  onHeroChip: string;
  /** Bottom sheet of the Find screen. */
  sheet: string;
  onSheet: string;
  sheetMuted: string;
  sheetHandle: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  warningFill: string;
  danger: string;
  dangerBg: string;
  /** Avatar fills. */
  avatar: string;
  avatarAlt: string;
  /** Map. */
  mapLand: string;
  mapWater: string;
  mapPark: string;
  mapRoad: string;
  mapLabel: string;
  tabBar: string;
  /** Legacy names kept so older screens read the same keys. */
  border: string;
  review: string;
  noAction: string;
};

export const LIGHT: SeekColors = {
  isDark: false,
  background: "#F2F2F2",
  surface: "#FFFFFF",
  surfaceAlt: "#F2F2F2",
  input: "#F2F2F2",
  text: "#151515",
  mutedText: "#626262",
  line: "#E2E2E2",
  lineStrong: "#D4D4D4",
  accent: "#0B2A5B",
  accentPressed: "#071F45",
  primary: "#0B2A5B",
  onPrimary: "#FFFFFF",
  tint: "#EAF3FF",
  onTint: "#0B2A5B",
  hero: "#0B2A5B",
  onHero: "#FFFFFF",
  heroMuted: "#C9D6EA",
  heroChip: "#D9E9FF",
  onHeroChip: "#151515",
  sheet: "#0B2A5B",
  onSheet: "#FFFFFF",
  sheetMuted: "#C9D6EA",
  sheetHandle: "#FFFFFF",
  success: "#238636",
  successBg: "#E6F4EA",
  warning: "#8A5300",
  warningBg: "#FFF4E0",
  warningFill: "#D99A2B",
  danger: "#C62828",
  dangerBg: "#FDECEC",
  avatar: "#52647E",
  avatarAlt: "#626262",
  mapLand: "#ECEEE8",
  mapWater: "#B9D5EE",
  mapPark: "#D5E8CC",
  mapRoad: "#FFFFFF",
  mapLabel: "#7A7F86",
  tabBar: "#FFFFFF",
  border: "#0B2A5B",
  review: "#0B2A5B",
  noAction: "#D32F2F",
};

export const DARK: SeekColors = {
  isDark: true,
  background: "#0F0F23",
  surface: "#16253E",
  surfaceAlt: "#1B2F4A",
  input: "#0F0F23",
  text: "#F8FAFC",
  mutedText: "#9FB0C7",
  line: "rgba(255,255,255,0.12)",
  lineStrong: "rgba(255,255,255,0.24)",
  accent: "#A8C8F5",
  accentPressed: "#D9E9FF",
  primary: "#D9E9FF",
  onPrimary: "#0B2A5B",
  tint: "rgba(168,200,245,0.16)",
  onTint: "#A8C8F5",
  hero: "rgba(168,200,245,0.16)",
  onHero: "#A8C8F5",
  heroMuted: "#DCE8F4",
  heroChip: "#D9E9FF",
  onHeroChip: "#0B2A5B",
  sheet: "#1B2F4A",
  onSheet: "#F8FAFC",
  sheetMuted: "#DCE8F4",
  sheetHandle: "#16253E",
  success: "#34D399",
  successBg: "rgba(52,211,153,0.14)",
  warning: "#FBBF24",
  warningBg: "rgba(251,191,36,0.14)",
  warningFill: "#D99A2B",
  danger: "#F87171",
  dangerBg: "rgba(248,113,113,0.14)",
  avatar: "#2B4C7E",
  avatarAlt: "#52647E",
  mapLand: "#14203A",
  mapWater: "#1E3A5F",
  mapPark: "#17323A",
  mapRoad: "#2A3A57",
  mapLabel: "#7F93B2",
  tabBar: "#16253E",
  border: "#A8C8F5",
  review: "#A8C8F5",
  noAction: "#F87171",
};
