import { ArrowLeftIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../ui/text";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

type BackButtonProps = {
  title?: string;
};

export function BackButton({ title }: BackButtonProps) {
  const router = useRouter();



  return (
    <Pressable
      onPressIn={() => router.canGoBack() ? router.back() : router.navigate("/(app)/(tabs)/home")}
      hitSlop={5}
      className="flex-row gap-3"
    >
      <ArrowLeftIcon className="text-xl" />
      {title && (
        <Text className="text-2xl font-semibold flex-1 text-center line-clamp-1">
          {title}
        </Text>
      )}
      <ArrowLeftIcon className="text-xl" color="transparent" />
    </Pressable>
  );
}
