import { HeartIcon } from "lucide-react-native";
import { Pressable } from "../ui/pressable";
import { useSeekTheme } from "@/hooks/use-seek-theme";

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
  iconColor,
  activeColor,
  containerClassName = "bg-primary-0",
  disabled = false,
}: LikeButtonProps) {
  const colors = useSeekTheme();
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
        color={iconColor ?? colors.accent}
        fill={liked ? (activeColor ?? colors.accent) : "transparent"}
        strokeWidth={2.5}
        size={size}
      />
    </Pressable>
  );
}
