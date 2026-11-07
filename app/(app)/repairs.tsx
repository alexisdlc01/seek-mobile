import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, Divider, ListRow, SectionTitle, SeekButton, SeekScreen } from "@/components/seek/ui";
import { invalidateHomeQueries, useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useRepairsControllerCreate, useRepairsControllerForTenancy } from "@/src/api/seek-api/repairs";
import { formatDate, formatDay } from "@/src/utils/seek-format";
import { errorMessage, tenancyTitle, type TenancyView } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { WrenchIcon } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function RepairsScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to report a problem"
      description="Repairs you report go straight to your landlord, and you can follow them here."
    >
      <Repairs />
    </AuthRequiredScreen>
  );
}

function Repairs() {
  const router = useRouter();
  const query = useActiveTenancy();
  const tenancy = query.tenancy;
  const shell = { title: "Repairs", back: true, fallbackHref: "/(app)/(tabs)/my-home" } as const;

  if (query.isLoading) {
    return (
      <SeekScreen {...shell}>
        <LoadingState label="Loading your repairs…" />
      </SeekScreen>
    );
  }
  if (query.isError) {
    return (
      <SeekScreen {...shell}>
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      </SeekScreen>
    );
  }
  if (!tenancy) {
    return (
      <SeekScreen {...shell}>
        <EmptyState
          title="No tenancy yet"
          body="You can report a problem once your landlord has set up your tenancy."
          actionLabel="Back to My home"
          onAction={() => router.navigate("/(app)/(tabs)/my-home")}
        />
      </SeekScreen>
    );
  }
  return <RepairsContent tenancy={tenancy} />;
}

function RepairsContent({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const query = useRepairsControllerForTenancy(tenancy._id, { query: { retry: 1 } });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const create = useRepairsControllerCreate({
    mutation: {
      onSuccess: () => {
        setTitle("");
        setDescription("");
        setMessage({ tone: "success", text: "Sent to your landlord. You'll see updates here." });
        invalidateHomeQueries(queryClient);
      },
      onError: (error) => setMessage({ tone: "danger", text: errorMessage(error) }),
    },
  });

  const canSend = title.trim().length > 0 && !create.isPending;
  const repairs = [...(query.data ?? [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const notice = message
    ? message.tone === "success"
      ? { bg: colors.successBg, fg: colors.success }
      : { bg: colors.dangerBg, fg: colors.danger }
    : null;
  const input = [
    styles.input,
    { color: colors.text, backgroundColor: colors.surface, borderColor: colors.lineStrong },
  ];

  return (
    <SeekScreen
      title="Repairs"
      subtitle={tenancyTitle(tenancy)}
      back
      fallbackHref="/(app)/(tabs)/my-home"
    >
      <View style={styles.section}>
        <SectionTitle>Report a problem</SectionTitle>
        <Card>
          <TextInput
            accessibilityLabel="What is the problem?"
            placeholder="What is the problem? e.g. Damp in bedroom 2"
            placeholderTextColor={colors.mutedText}
            value={title}
            onChangeText={(text) => {
              setMessage(null);
              setTitle(text);
            }}
            maxLength={120}
            selectionColor={colors.accent}
            style={input}
          />
          <TextInput
            accessibilityLabel="More detail"
            placeholder="Add detail: where, since when, any photos you can send your landlord by message"
            placeholderTextColor={colors.mutedText}
            value={description}
            onChangeText={setDescription}
            multiline
            maxLength={1000}
            selectionColor={colors.accent}
            style={[...input, styles.multiline]}
          />
          {message && notice ? (
            <Text accessibilityRole="alert" style={[styles.notice, { color: notice.fg }]}>
              {message.text}
            </Text>
          ) : null}
          <SeekButton
            label={create.isPending ? "Sending…" : "Send to my landlord"}
            onPress={
              canSend
                ? () => {
                    setMessage(null);
                    create.mutate({
                      data: {
                        tenancy: tenancy._id,
                        title: title.trim(),
                        ...(description.trim() ? { description: description.trim() } : {}),
                      },
                    });
                  }
                : undefined
            }
          />
        </Card>
      </View>

      <View style={styles.section}>
        <SectionTitle hint={repairs.length > 0 ? String(repairs.length) : undefined}>Your reports</SectionTitle>
        {query.isLoading ? (
          <LoadingState label="Loading your repairs…" />
        ) : query.isError ? (
          <ErrorState error={query.error} onRetry={() => query.refetch()} title="Couldn't load your repairs" />
        ) : repairs.length === 0 ? (
          <Card>
            <Text style={[styles.note, { color: colors.mutedText }]}>Nothing reported yet.</Text>
          </Card>
        ) : (
          <Card style={styles.list}>
            {repairs.map((repair, index) => (
              <View key={repair._id}>
                {index > 0 ? <Divider /> : null}
                <ListRow
                  icon={<WrenchIcon color={colors.accent} size={20} />}
                  title={repair.title}
                  subtitle={
                    repair.status === "FIXED"
                      ? `Fixed${repair.fixedAt ? ` ${formatDate(repair.fixedAt)}` : ""}`
                      : repair.status === "SCHEDULED" && repair.scheduledFor
                        ? `Visit booked ${formatDay(repair.scheduledFor)}`
                        : `Reported ${formatDay(repair.createdAt)}`
                  }
                  right={
                    <Badge
                      label={repair.status === "FIXED" ? "Fixed" : repair.status === "SCHEDULED" ? "Scheduled" : "Open"}
                      tone={repair.status === "FIXED" ? "success" : repair.status === "SCHEDULED" ? "info" : "warning"}
                    />
                  }
                />
              </View>
            ))}
          </Card>
        )}
      </View>
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14.5,
  },
  multiline: { minHeight: 96, textAlignVertical: "top" },
  note: { fontSize: 13.5, lineHeight: 20 },
  notice: { fontSize: 13, lineHeight: 19, fontWeight: "600" },
});
