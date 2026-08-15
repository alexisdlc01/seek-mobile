import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";

export type ScrollDotsProps = {
  total: number;
  value: number;
  activeColor?: string;
  inactiveColor?: string;
};

export function ScrollDots({
  total,
  value,
  activeColor = "#FFFFFF",
  inactiveColor = "#9CA3AF",
}: ScrollDotsProps) {
  if (total <= 1) {
    return null;
  }

  return (
    <HStack className="gap-3 items-center justify-center w-full">
      {Array.from({ length: total }).map((_, i) => (
        <Box
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: i === value ? activeColor : inactiveColor }}
        />
      ))}
    </HStack>
  );
}
