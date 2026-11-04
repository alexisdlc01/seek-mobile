import { useIsAuthenticated } from "@/components/custom/auth-required";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { UserIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { RoundIconButton } from "./round-icon-button";

/** Opens the profile; shows the user's photo when they have one. */
export function ProfileButton() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const { data: user } = useAuthControllerCurrentUser({
    query: { enabled: isAuthenticated },
  });
  const photoUrl = isAuthenticated ? user?.profilePicUrl : undefined;

  function openProfile() {
    router.push("/(app)/profile");
  }

  if (!photoUrl) {
    return (
      <RoundIconButton
        icon={UserIcon}
        accessibilityLabel="Open profile"
        onPress={openProfile}
      />
    );
  }

  return (
    <Pressable
      accessibilityLabel="Open profile"
      accessibilityRole="button"
      className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary-500/90"
      hitSlop={8}
      onPress={openProfile}
    >
      <Image
        source={{ uri: photoUrl }}
        contentFit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </Pressable>
  );
}
