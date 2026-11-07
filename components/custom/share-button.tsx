import { Share2Icon } from "lucide-react-native";
import { Pressable } from "../ui/pressable";
import { useSeekTheme } from "@/hooks/use-seek-theme";

export type ShareButtonProps = {
  share: () => void | Promise<void>;
  size?: number;
  iconColor?: string;
  containerClassName?: string;
};

export function ShareButton({
  size = 35,
  share,
  iconColor,
  containerClassName = "bg-primary-0",
}: ShareButtonProps) {
  const colors = useSeekTheme();
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
      <Share2Icon color={iconColor ?? colors.accent} size={size} />
    </Pressable>
  );
}
