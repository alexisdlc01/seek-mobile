import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

type SelectBoxOption = {
  label: string;
  value: string;
};

type SelectBoxInputProps = {
  options?: SelectBoxOption[];
  /** @deprecated Use `options`. Kept for compatibility with the example app. */
  opions?: SelectBoxOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function SelectBoxInput({
  options,
  opions,
  value,
  onChange,
  className,
}: SelectBoxInputProps) {
  const resolvedOptions = options ?? opions ?? [];

  return (
    <HStack className={`w-full flex-wrap gap-2 ${className ?? ""}`}>
      {resolvedOptions.map((option) => (
        <Pressable
          key={option.value}
          onPressIn={() => onChange(option.value)}
          className={`h-10 w-[31%] grow-0 items-center justify-center rounded-full border border-primary-500 ${option.value === value ? "bg-primary-500" : "bg-background-card"}`}
        >
          <Text
            numberOfLines={2}
            className={`px-2 text-center text-sm font-semibold leading-4 ${option.value === value ? "text-typography-0" : "text-typography-950"}`}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}
    </HStack>
  );
}
