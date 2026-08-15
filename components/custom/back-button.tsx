import { ArrowLeftIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Href, useRouter } from "expo-router";
import { Text } from "../ui/text";
import { PROFILE_COLORS } from "@/constants/design";

type BackButtonProps = {
  title?: string;
  fallbackHref?: Href;
  showBack?: boolean;
  alwaysReturnToFallback?: boolean;
};

export function BackButton({
  title,
  fallbackHref = "/(app)/(tabs)/home",
  showBack = true,
  alwaysReturnToFallback = false,
}: BackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (alwaysReturnToFallback) {
      router.dismissTo(fallbackHref);
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.navigate(fallbackHref);
  };

  return (
    <View className="relative h-12 w-full items-center justify-center">
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={goBack}
          hitSlop={10}
          className="absolute left-0 h-12 w-12 items-start justify-center"
        >
          <ArrowLeftIcon
            color={PROFILE_COLORS.accent}
            size={28}
            strokeWidth={2.25}
          />
        </Pressable>
      ) : null}
      {title && (
        <Text
          numberOfLines={1}
          style={{
            paddingHorizontal: 48,
            color: PROFILE_COLORS.accent,
            fontSize: title.length > 20 ? 20 : 24,
            lineHeight: title.length > 20 ? 26 : 30,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
}
