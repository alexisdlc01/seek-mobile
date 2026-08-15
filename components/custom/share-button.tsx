import { Share2Icon } from "lucide-react-native";
import { Pressable } from "../ui/pressable";
import { PROFILE_COLORS } from "@/constants/design";

export type ShareButtonProps = {
  share: () => void | Promise<void>;
  size?: number;
  iconColor?: string;
  containerClassName?: string;
};

export function ShareButton({
  size = 35,
  share,
  iconColor = PROFILE_COLORS.accent,
  containerClassName = "bg-primary-0",
}: ShareButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Share listing"
      accessibilityRole="button"
      onPress={(event) => {
        event.stopPropagation();
        void share();
      }}
      hitSlop={10}
      className={`items-center justify-center rounded-full p-2 ${containerClassName}`}
    >
      <Share2Icon color={iconColor} size={size} />
    </Pressable>
  );
}
