import { useMemo } from "react";
import { DARK, LIGHT, type SeekColors } from "@/constants/seek-theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

/** Seek colour map for the current system colour scheme (light by default). */
export function useSeekTheme(): SeekColors {
  return useColorScheme() === "dark" ? DARK : LIGHT;
}

/** Builds a StyleSheet from the current palette; recomputed only when the scheme flips. */
export function useThemedStyles<T>(factory: (colors: SeekColors) => T): T {
  const colors = useSeekTheme();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory(colors), [colors]);
}
