import { HStack } from "@/components/ui/hstack";
import { Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";

type PeopleInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export function PeopleInput({ value, onChange }: PeopleInputProps) {
  const selected = value;

  function PeopleButton({ label, value }: { label: string; value: number }) {
    const isSelected = value === selected;

    return (
      <Pressable
        accessibilityLabel={`${label} ${label === "1" ? "person" : "people"}`}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        onPress={() => onChange(value)}
        className={`h-12 min-w-12 flex-1 items-center justify-center rounded-full border ${
          isSelected
            ? "border-primary-500 bg-primary-500"
            : "border-primary-200 bg-background-card"
        }`}
      >
        <Text
          size="lg"
          className={`text-center font-semibold ${isSelected ? "text-typography-0" : "text-typography-950"}`}
        >
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <Box className="gap-3">
      <Text size="lg" className="font-semibold text-primary-500">
        Number of people
      </Text>
      <HStack className="gap-2">
        <PeopleButton label="1" value={1} />
        <PeopleButton label="2" value={2} />
        <PeopleButton label="3" value={3} />
        <PeopleButton label="4" value={4} />
        <PeopleButton label="5+" value={5} />
      </HStack>
    </Box>
  );
}
