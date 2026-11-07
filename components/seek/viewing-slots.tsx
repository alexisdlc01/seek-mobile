import { useSeekTheme } from "@/hooks/use-seek-theme";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const DAYS = 7;
const HOURS = [10, 12, 14, 16, 18];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Mon 9 Nov, 14:00" in the viewer's time zone. */
export function formatViewing(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}, ${time}`;
}

/** The upcoming viewing times a landlord offers on a listing (`viewingSlots`). */
export function offeredSlots(listing: { viewingSlots?: string[] } | null | undefined): string[] {
  const now = Date.now();
  return (listing?.viewingSlots ?? []).filter((slot) => new Date(slot).getTime() > now).sort();
}

/**
 * Pick a viewing. With `offered` times (the landlord's slots) the student
 * picks one of those; otherwise one of the next seven days, then a time.
 * `onChange` gets an ISO time, or null if the student clears it.
 */
export function ViewingSlots({
  value,
  onChange,
  offered,
  availability,
}: {
  value: string | null;
  onChange: (iso: string | null) => void;
  offered?: string[];
  /** Places left per offered time (`viewingSlotAvailability`); full times can't be picked. */
  availability?: { at: string; remaining: number }[];
}) {
  const colors = useSeekTheme();
  const days = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: DAYS }, (_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index + 1);
      return day;
    });
  }, []);
  const selected = value ? new Date(value) : null;
  const [dayIndex, setDayIndex] = useState<number>(() => {
    if (!selected) return 0;
    const found = days.findIndex((day) => day.toDateString() === selected.toDateString());
    return found >= 0 ? found : 0;
  });

  const pick = (index: number, hour: number) => {
    const when = new Date(days[index]);
    when.setHours(hour, 0, 0, 0);
    setDayIndex(index);
    onChange(selected && selected.getTime() === when.getTime() ? null : when.toISOString());
  };

  const chip = (on: boolean) => ({
    backgroundColor: on ? colors.primary : colors.surface,
    borderColor: on ? colors.primary : colors.line,
  });

  if (offered && offered.length > 0) {
    return (
      <View style={styles.times}>
        {offered.map((slot) => {
          const on = value != null && new Date(value).getTime() === new Date(slot).getTime();
          const left = availability?.find((item) => new Date(item.at).getTime() === new Date(slot).getTime())?.remaining;
          const full = left === 0 && !on;
          return (
            <Pressable
              key={slot}
              accessibilityRole="button"
              accessibilityState={{ selected: on, disabled: full }}
              disabled={full}
              onPress={() => onChange(on ? null : slot)}
              style={[styles.chip, chip(on), full && { opacity: 0.5 }]}
            >
              <Text style={[styles.chipText, { color: on ? colors.onPrimary : colors.text }]}>
                {formatViewing(slot)}
                {left == null ? "" : left === 0 ? " · full" : ` · ${left} left`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {days.map((day, index) => (
          <Pressable
            key={day.toISOString()}
            accessibilityRole="button"
            accessibilityState={{ selected: index === dayIndex }}
            onPress={() => setDayIndex(index)}
            style={[styles.chip, chip(index === dayIndex)]}
          >
            <Text style={[styles.chipText, { color: index === dayIndex ? colors.onPrimary : colors.text }]}>
              {WEEKDAYS[day.getDay()]} {day.getDate()}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.times}>
        {HOURS.map((hour) => {
          const on =
            selected != null &&
            selected.toDateString() === days[dayIndex].toDateString() &&
            selected.getHours() === hour;
          return (
            <Pressable
              key={hour}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => pick(dayIndex, hour)}
              style={[styles.chip, chip(on)]}
            >
              <Text style={[styles.chipText, { color: on ? colors.onPrimary : colors.text }]}>
                {String(hour).padStart(2, "0")}:00
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  row: { gap: 8 },
  times: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 14, height: 36, borderRadius: 18, borderWidth: 1, justifyContent: "center" },
  chipText: { fontSize: 13, fontWeight: "600" },
});
