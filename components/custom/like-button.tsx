import { HeartIcon } from "lucide-react-native";
import { Pressable } from "../ui/pressable";
import { PROFILE_COLORS } from "@/constants/design";

export type LikeButtonProps = {
  like: () => void | Promise<void>;
  unlike: () => void | Promise<void>;
  liked: boolean;
  size?: number;
  iconColor?: string;
  activeColor?: string;
  containerClassName?: string;
  disabled?: boolean;
};

export function LikeButton({
  like,
  unlike,
  liked,
  size = 35,
  iconColor = PROFILE_COLORS.accent,
  activeColor = PROFILE_COLORS.accent,
  containerClassName = "bg-primary-0",
  disabled = false,
}: LikeButtonProps) {
  return (
    <Pressable
      accessibilityLabel={liked ? "Remove from saved listings" : "Save listing"}
      accessibilityRole="button"
      disabled={disabled}
      onPress={(event) => {
        event.stopPropagation();
        void (liked ? unlike() : like());
      }}
      hitSlop={10}
      className={`items-center justify-center rounded-full p-2 ${containerClassName}`}
    >
      <HeartIcon
        color={iconColor}
        fill={liked ? activeColor : "transparent"}
        strokeWidth={2.5}
        size={size}
      />
    </Pressable>
  );
}
