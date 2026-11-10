import type { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { Href, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftIcon, ArrowRightIcon, ChevronRightIcon } from "lucide-react-native";
import React, { ReactNode } from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Small building blocks for the Seek redesign screens (cards, pills, buttons,
 * rows). Everything reads the palette from `useSeekTheme()`, so light and dark
 * come for free.
 */

type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export function toneColors(colors: SeekColors, tone: Tone) {
  switch (tone) {
    case "success":
      return { bg: colors.successBg, fg: colors.success };
    case "warning":
      return { bg: colors.warningBg, fg: colors.warning };
    case "danger":
      return { bg: colors.dangerBg, fg: colors.danger };
    case "info":
      return { bg: colors.tint, fg: colors.onTint };
    default:
      return { bg: colors.surfaceAlt, fg: colors.mutedText };
  }
}

type SeekScreenProps = {
  title?: string;
  subtitle?: string;
  /** Back arrow in the header. Tabs hide it. */
  back?: boolean;
  fallbackHref?: Href;
  headerRight?: ReactNode;
  headerLeft?: ReactNode;
  children: ReactNode;
  /** Pinned below the content (composer, primary action). */
  footer?: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  scrollRef?: React.Ref<ScrollView>;
};

export function SeekScreen({
  title,
  subtitle,
  back = false,
  fallbackHref = "/(app)/(tabs)/map",
  headerRight,
  headerLeft,
  children,
  footer,
  scroll = true,
  contentStyle,
  scrollRef,
}: SeekScreenProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const router = useRouter();
  // Tab screens never show a back arrow, even when they reuse a stack screen.
  const inTabs = (useSegments() as string[]).includes("(tabs)");

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.navigate(fallbackHref);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <StatusBar style={colors.isDark ? "light" : "dark"} />
      {title ? (
        <View style={styles.header}>
          {back && !inTabs ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={goBack}
              hitSlop={8}
              style={styles.backButton}
            >
              <ArrowLeftIcon color={colors.text} size={22} strokeWidth={2.2} />
            </Pressable>
          ) : null}
          {headerLeft}
          <View style={styles.headerText}>
            <Text numberOfLines={1} style={styles.headerTitle}>
              {title}
            </Text>
            {subtitle ? (
              <Text numberOfLines={1} style={styles.headerSubtitle}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          {headerRight}
        </View>
      ) : null}
      {scroll ? (
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, styles.content, contentStyle]}>
          {children}
        </View>
      )}
      {footer}
    </SafeAreaView>
  );
}

export function Card({
  children,
  style,
  tone = "surface",
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  tone?: "surface" | "hero" | "tint";
}) {
  const styles = useThemedStyles(createStyles);
  return (
    <View
      style={[
        styles.card,
        tone === "hero" && styles.cardHero,
        tone === "tint" && styles.cardTint,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function SectionTitle({
  children,
  hint,
  onHero = false,
}: {
  children: ReactNode;
  hint?: string;
  onHero?: boolean;
}) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={[styles.sectionTitle, onHero && styles.onHeroText]}>
        {children}
      </Text>
      {hint ? <Text style={styles.sectionHint}>{hint}</Text> : null}
    </View>
  );
}

export function Badge({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const t = toneColors(colors, tone);
  return (
    <View style={[styles.badge, { backgroundColor: t.bg }]}>
      <Text style={[styles.badgeText, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

type ButtonVariant = "primary" | "secondary" | "tint" | "light" | "outlineOnHero";

export function SeekButton({
  label,
  onPress,
  variant = "primary",
  compact = false,
  style,
  accessibilityLabel,
  disabled = false,
}: {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  disabled?: boolean;
}) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const palette = {
    primary: { bg: colors.primary, fg: colors.onPrimary, border: colors.primary },
    secondary: { bg: colors.surface, fg: colors.text, border: colors.lineStrong },
    tint: { bg: colors.tint, fg: colors.onTint, border: colors.tint },
    light: { bg: colors.heroChip, fg: colors.onHeroChip, border: colors.heroChip },
    outlineOnHero: { bg: "transparent", fg: colors.onHero, border: colors.lineStrong },
  }[variant];

  return (
    // TouchableOpacity, not Pressable: NativeWind drops a function `style` on iOS (no bg/border/centering).
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        compact && styles.buttonCompact,
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          compact && styles.buttonTextCompact,
          { color: palette.fg },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function IconTile({ children }: { children: ReactNode }) {
  const styles = useThemedStyles(createStyles);
  return <View style={styles.iconTile}>{children}</View>;
}

export function Divider() {
  const styles = useThemedStyles(createStyles);
  return <View style={styles.divider} />;
}

/** Icon, title, subtitle and a trailing badge, button or chevron. */
export function ListRow({
  icon,
  title,
  subtitle,
  right,
  onPress,
  chevron = false,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onPress?: () => void;
  chevron?: boolean;
}) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const body = (
    <>
      {icon ? <IconTile>{icon}</IconTile> : null}
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      {right}
      {chevron ? (
        <ChevronRightIcon color={colors.mutedText} size={20} strokeWidth={2} />
      ) : null}
    </>
  );
  if (!onPress) return <View style={styles.row}>{body}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={styles.row}
    >
      {body}
    </Pressable>
  );
}

export function Avatar({
  initials,
  size = 44,
  tone = "primary",
  dashed = false,
}: {
  initials: string;
  size?: number;
  tone?: "primary" | "alt" | "alt2" | "empty";
  dashed?: boolean;
}) {
  const colors = useSeekTheme();
  const bg =
    tone === "alt"
      ? colors.avatar
      : tone === "alt2"
        ? colors.avatarAlt
        : tone === "empty"
          ? colors.surfaceAlt
          : colors.isDark
            ? colors.avatar
            : colors.accent;
  const fg = tone === "empty" ? colors.text : "#FFFFFF";
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: dashed ? 2 : 0,
        borderStyle: dashed ? "dashed" : "solid",
        borderColor: colors.warningFill,
      }}
    >
      <Text style={{ color: fg, fontWeight: "600", fontSize: size * 0.4 }}>
        {initials}
      </Text>
    </View>
  );
}

export function ProgressBar({
  value,
  tone = "hero",
}: {
  value: number;
  tone?: "hero" | "warning" | "danger" | "accent";
}) {
  const colors = useSeekTheme();
  const fill = { hero: colors.heroChip, warning: colors.warningFill, danger: colors.danger, accent: colors.accent }[tone];
  return (
    <View
      style={{
        height: 8,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: tone === "hero" ? "rgba(255,255,255,0.18)" : colors.line,
      }}
    >
      <View
        style={{
          width: `${Math.max(0, Math.min(1, value)) * 100}%`,
          height: 8,
          borderRadius: 4,
          backgroundColor: fill,
        }}
      />
    </View>
  );
}

export function RadioDot({ selected }: { selected: boolean }) {
  const colors = useSeekTheme();
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: selected ? 7 : 2,
        borderColor: selected ? colors.accent : colors.lineStrong,
      }}
    />
  );
}

/** Pinned message field with a send button (Seek AI, deposit help, threads). */
export function Composer({
  placeholder,
  value,
  onChangeText,
  onSend,
  label,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  label: string;
}) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  return (
    <View style={styles.composer}>
      <TextInput
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        returnKeyType="send"
        selectionColor={colors.accent}
        style={styles.composerInput}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send"
        onPress={onSend}
        style={styles.composerSend}
      >
        <ArrowRightIcon color={colors.onHeroChip} size={20} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
}

export function ChatBubble({
  children,
  mine = false,
}: {
  children: ReactNode;
  mine?: boolean;
}) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
      {typeof children === "string" ? (
        <Text style={[styles.bubbleText, mine && styles.onHeroText]}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    flex: { flex: 1 },
    screen: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 12,
      backgroundColor: colors.surface,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.line,
    },
    backButton: {
      width: 40,
      height: 40,
      marginLeft: -8,
      alignItems: "center",
      justifyContent: "center",
    },
    headerText: { flex: 1 },
    headerTitle: {
      color: colors.text,
      fontSize: 19,
      lineHeight: 24,
      fontWeight: "700",
    },
    headerSubtitle: { color: colors.mutedText, fontSize: 12.5, lineHeight: 17 },
    content: { padding: 16, gap: 14, paddingBottom: 32 },
    card: {
      gap: 12,
      padding: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.line,
      backgroundColor: colors.surface,
    },
    cardHero: {
      borderRadius: 20,
      borderColor: colors.isDark ? colors.line : colors.hero,
      backgroundColor: colors.hero,
    },
    cardTint: { borderWidth: 0, backgroundColor: colors.tint },
    sectionTitleRow: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 8,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 20,
      fontWeight: "700",
    },
    onHeroText: { color: colors.onHero },
    sectionHint: { color: colors.mutedText, fontSize: 12, lineHeight: 16 },
    badge: {
      alignSelf: "flex-start",
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    badgeText: { fontSize: 11.5, lineHeight: 15, fontWeight: "700" },
    button: {
      minHeight: 46,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
    },
    buttonCompact: { minHeight: 36, paddingHorizontal: 12, borderRadius: 10 },
    buttonText: { fontSize: 14.5, lineHeight: 19, fontWeight: "700" },
    buttonTextCompact: { fontSize: 13, lineHeight: 17 },
    iconTile: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.tint,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.line,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 8,
    },
    rowText: { flex: 1, gap: 1 },
    rowTitle: {
      color: colors.text,
      fontSize: 14,
      lineHeight: 19,
      fontWeight: "600",
    },
    rowSubtitle: { color: colors.mutedText, fontSize: 12, lineHeight: 16 },
    composer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 12,
      backgroundColor: colors.surface,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.line,
    },
    composerInput: {
      flex: 1,
      minWidth: 0,
      height: 46,
      paddingHorizontal: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.line,
      backgroundColor: colors.input,
      color: colors.text,
      fontSize: 14,
    },
    composerSend: {
      width: 46,
      height: 46,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.heroChip,
    },
    bubble: {
      maxWidth: "88%",
      paddingHorizontal: 14,
      paddingVertical: 11,
    },
    bubbleMine: {
      alignSelf: "flex-end",
      backgroundColor: colors.hero,
      borderRadius: 18,
      borderBottomRightRadius: 4,
    },
    bubbleOther: {
      alignSelf: "flex-start",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
    },
    bubbleText: { color: colors.text, fontSize: 14, lineHeight: 20 },
  });
