import { useSeekTheme } from "@/hooks/use-seek-theme";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const DAYS = 7;
const HOURS = [10, 12, 14, 16, 18];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LONDON = "Europe/London";

/** Calendar/clock parts of an instant on the Europe/London wall clock. */
function londonParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day"), hour: get("hour"), minute: get("minute") };
}

/** The UTC instant of a London wall-clock time (DST-safe: one correction pass). */
export function londonInstant(year: number, month: number, day: number, hour: number): Date {
  const wall = Date.UTC(year, month - 1, day, hour);
  const seen = londonParts(new Date(wall));
  const offset = Date.UTC(seen.year, seen.month - 1, seen.day, seen.hour, seen.minute) - wall;
  return new Date(wall - offset);
}

/** "Mon 9 Nov, 14:00" on the Europe/London clock, like the emails and push titles. */
export function formatViewing(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const p = londonParts(date);
  const time = `${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`;
  const weekday = WEEKDAYS[new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay()];
  return `${weekday} ${p.day} ${MONTHS[p.month - 1]}, ${time}`;
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
    const today = londonParts(new Date());
    // Calendar days on the London clock; Date.UTC rolls over month ends.
    return Array.from({ length: DAYS }, (_, index) => {
      const day = new Date(Date.UTC(today.year, today.month - 1, today.day + index + 1));
      return { year: day.getUTCFullYear(), month: day.getUTCMonth() + 1, day: day.getUTCDate(), weekday: day.getUTCDay() };
    });
  }, []);
  const selected = value ? new Date(value) : null;
  const sel = selected && !Number.isNaN(selected.getTime()) ? londonParts(selected) : null;
  const sameDay = (day: (typeof days)[number], p: NonNullable<typeof sel>) =>
    day.year === p.year && day.month === p.month && day.day === p.day;
  const [dayIndex, setDayIndex] = useState<number>(() => {
    if (!selected) return 0;
    const found = sel ? days.findIndex((day) => sameDay(day, sel)) : -1;
    return found >= 0 ? found : 0;
  });

  const pick = (index: number, hour: number) => {
    const day = days[index];
    const when = londonInstant(day.year, day.month, day.day, hour);
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
            key={`${day.year}-${day.month}-${day.day}`}
            accessibilityRole="button"
            accessibilityState={{ selected: index === dayIndex }}
            onPress={() => setDayIndex(index)}
            style={[styles.chip, chip(index === dayIndex)]}
          >
            <Text style={[styles.chipText, { color: index === dayIndex ? colors.onPrimary : colors.text }]}>
              {WEEKDAYS[day.weekday]} {day.day}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.times}>
        {HOURS.map((hour) => {
          const on =
            sel != null && sameDay(days[dayIndex], sel) && sel.hour === hour && sel.minute === 0;
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
