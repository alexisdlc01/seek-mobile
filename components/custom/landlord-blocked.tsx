import { queryClient } from "@/app/_layout";
import type { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { useAuthControllerLogout } from "@/src/api/seek-api/auth";
import { useAuth } from "@/src/store/auth-store";
import { useRouter } from "expo-router";
import { MonitorIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function LandlordBlockedScreen() {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const router = useRouter();
  const localLogout = useAuth((state) => state.logout);
  const { mutate: remoteLogout, isPending } = useAuthControllerLogout();

  const signOut = () =>
    remoteLogout(undefined, {
      onSettled: () => {
        localLogout();
        queryClient.clear();
        router.replace("/(app)/(tabs)/map");
      },
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MonitorIcon color={colors.accent} size={38} strokeWidth={2} />
        </View>
        <Text accessibilityRole="header" style={styles.title}>
          Landlords use the web dashboard
        </Text>
        <Text style={styles.description}>
          The Seek app is for students. Sign in on the Seek website to manage
          your listings, applications and rent.
        </Text>
        <Pressable
          accessibilityRole="button"
          disabled={isPending}
          onPress={signOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      paddingHorizontal: 28,
    },
    iconContainer: {
      width: 78,
      height: 78,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 39,
      backgroundColor: colors.tint,
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
    button: {
      width: "100%",
      maxWidth: 360,
      minHeight: 54,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 999,
      backgroundColor: colors.primary,
    },
    buttonText: { color: colors.onPrimary, fontSize: 17, fontWeight: "700" },
  });
