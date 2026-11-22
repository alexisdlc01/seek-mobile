import { Card, SectionTitle, SeekButton } from "@/components/seek/ui";
import { invalidateHomeQueries } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { customInstance } from "@/src/utils/custom-axios";
import { formatInstantDate } from "@/src/utils/seek-format";
import { errorMessage, idOf, type TenancyView } from "@/src/utils/tenancy-view";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// The generated Tenancy model predates the notice fields, so they are read through this view.
type NoticeView = TenancyView & {
  noticeEndDate?: string | null;
  noticeFrom?: unknown[];
  noticeGivenAt?: string | null;
};

const HELP =
  "Scotland, Wales and Northern Ireland: at least 28 days. England: at least 2 months, ending on a rent day. " +
  "All housemates must give notice for the same date.";

const londonYmd = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date(iso));

/** "Moving out" card: give notice, confirm a housemate's date, or see the notice status. */
export function TenancyNotice({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const { data: user } = useAuthControllerCurrentUser();
  const view = tenancy as NoticeView;
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const give = useMutation({
    mutationFn: (endDate: string) =>
      customInstance<unknown>({
        url: `/tenancies/${tenancy._id}/notice`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { endDate },
      }),
    onSuccess: () => {
      setOpen(false);
      return invalidateHomeQueries(queryClient);
    },
  });

  if (tenancy.status !== "ACTIVE") return null;

  const given = (view.noticeFrom ?? []).map(idOf);
  const mine = !!user && given.includes(user._id);
  const pending = !!view.noticeEndDate && !view.noticeGivenAt;
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date));

  let body: React.ReactNode;
  if (view.noticeGivenAt && tenancy.endDate) {
    body = <Text style={[styles.text, { color: colors.text }]}>Your tenancy ends on {formatInstantDate(tenancy.endDate)}.</Text>;
  } else if (pending && mine) {
    body = (
      <Text style={[styles.text, { color: colors.text }]}>
        Notice given for {formatInstantDate(view.noticeEndDate)}. {given.length} of {tenancy.tenants.length} housemates have given notice.
      </Text>
    );
  } else if (pending) {
    body = (
      <>
        <Text style={[styles.text, { color: colors.text }]}>
          A housemate gave notice for {formatInstantDate(view.noticeEndDate)}. {given.length} of {tenancy.tenants.length} housemates have given notice.
        </Text>
        <SeekButton
          label={`Confirm notice for ${formatInstantDate(view.noticeEndDate)}`}
          disabled={give.isPending}
          onPress={() => give.mutate(londonYmd(view.noticeEndDate as string))}
        />
      </>
    );
  } else if (!open) {
    body = <SeekButton label="Give notice" variant="secondary" onPress={() => setOpen(true)} />;
  } else {
    body = (
      <>
        <Text style={[styles.help, { color: colors.mutedText }]}>{HELP}</Text>
        <Text style={[styles.help, { color: colors.mutedText }]}>
          Enter the first day you no longer rent the home (YYYY-MM-DD).
        </Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="2027-06-30"
          placeholderTextColor={colors.mutedText}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          style={[styles.input, { color: colors.text, borderColor: colors.line }]}
        />
        <View style={styles.row}>
          <SeekButton label="Cancel" variant="secondary" onPress={() => setOpen(false)} />
          <SeekButton label="Confirm notice" disabled={!valid || give.isPending} onPress={() => give.mutate(date)} />
        </View>
      </>
    );
  }

  return (
    <View style={styles.section}>
      <SectionTitle>Moving out</SectionTitle>
      <Card style={styles.card}>
        {body}
        {give.isError ? (
          <Text style={{ color: colors.danger, fontSize: 13 }}>
            {errorMessage(give.error, "We couldn't give notice. Please try again.")}
          </Text>
        ) : null}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  card: { gap: 10 },
  text: { fontSize: 14, lineHeight: 20 },
  help: { fontSize: 12.5, lineHeight: 18 },
  row: { flexDirection: "row", gap: 8 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
});
