import type { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { useAuth } from "@/src/store/auth-store";
import { useRouter } from "expo-router";
import { LockKeyholeIcon } from "lucide-react-native";
import { PropsWithChildren, useCallback } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SIGN_UP_ROUTE = "/(auth)/signup" as const;
const LOGIN_ROUTE = "/(auth)/login" as const;
const BROWSE_ROUTE = "/(app)/(tabs)/map" as const;

export function useIsAuthenticated() {
  return useAuth(
    (state) => Boolean(state.accessToken) && Boolean(state.refreshToken),
  );
}

export function useAuthRequiredAction(action: string) {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const hasHydrated = useAuth((state) => state._hasHydrated);

  return useCallback(() => {
    if (hasHydrated && isAuthenticated) return true;
    if (!hasHydrated) return false;

    Alert.alert(
      "Create an account to continue",
      `Sign up or log in to ${action}.`,
      [
        { text: "Not now", style: "cancel" },
        { text: "Log in", onPress: () => router.push(LOGIN_ROUTE) },
        { text: "Sign up", onPress: () => router.push(SIGN_UP_ROUTE) },
      ],
    );
    return false;
  }, [action, hasHydrated, isAuthenticated, router]);
}

type AuthRequiredScreenProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export function AuthRequiredScreen({
  children,
  title = "Create an account to continue",
  description = "Sign up to use this feature, or log in if you already have an account.",
}: AuthRequiredScreenProps) {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const router = useRouter();
  const hasHydrated = useAuth((state) => state._hasHydrated);
  const isAuthenticated = useIsAuthenticated();

  if (!hasHydrated) return null;
  if (isAuthenticated) return children;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LockKeyholeIcon color={colors.accent} size={38} strokeWidth={2} />
        </View>
        <View style={styles.copy}>
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(SIGN_UP_ROUTE)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Sign up</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push(LOGIN_ROUTE)}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Log in</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace(BROWSE_ROUTE)}
            style={styles.browseButton}
          >
            <Text style={styles.browseButtonText}>Continue browsing</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      paddingHorizontal: 28,
      paddingBottom: 24,
    },
    iconContainer: {
      width: 78,
      height: 78,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 39,
      backgroundColor: colors.tint,
    },
    copy: {
      maxWidth: 360,
      gap: 10,
    },
    title: {
      color: colors.accent,
      fontSize: 26,
      lineHeight: 32,
      fontWeight: "700",
      textAlign: "center",
    },
    description: {
      color: colors.mutedText,
      fontSize: 16,
      lineHeight: 23,
      textAlign: "center",
    },
    actions: {
      width: "100%",
      maxWidth: 360,
      gap: 12,
    },
    primaryButton: {
      minHeight: 54,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 999,
      backgroundColor: colors.primary,
    },
    primaryButtonText: {
      color: colors.onPrimary,
      fontSize: 17,
      fontWeight: "700",
    },
    secondaryButton: {
      minHeight: 54,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: colors.accent,
      borderRadius: 999,
      backgroundColor: colors.surface,
    },
    secondaryButtonText: {
      color: colors.accent,
      fontSize: 17,
      fontWeight: "700",
    },
    browseButton: {
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    browseButtonText: {
      color: colors.accent,
      fontSize: 15,
      fontWeight: "600",
      textDecorationLine: "underline",
    },
  });
