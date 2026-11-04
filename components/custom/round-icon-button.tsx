import { Pressable } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import type { StyleProp, ViewStyle } from "react-native";

type RoundIconButtonProps = {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Round navy button, matching the back/share/like buttons on the listing page. */
export function RoundIconButton({
  icon: IconComponent,
  accessibilityLabel,
  onPress,
  style,
}: RoundIconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className="h-12 w-12 items-center justify-center rounded-full bg-primary-500/90"
      hitSlop={8}
      onPress={onPress}
      style={style}
    >
      <IconComponent color="white" size={23} />
    </Pressable>
  );
}
