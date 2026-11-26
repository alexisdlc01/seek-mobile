import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { AdviceCard } from "@/components/seek/advice-card";
import { HomeAdmin } from "@/components/seek/home-admin";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, Divider, SectionTitle, SeekButton, SeekScreen } from "@/components/seek/ui";
import { useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import {
  getContractsControllerForTenancyQueryKey,
  useContractsControllerForTenancy,
  useContractsControllerRespondToDeductions,
} from "@/src/api/seek-api/contracts";
import { aiControllerAdvice } from "@/src/api/seek-api/ai";
import { formatDate, formatPence } from "@/src/utils/seek-format";
import { asTenancyView, depositCapCheck, depositDaysLeft, depositDeadline, depositProtectionDays, errorMessage, openStoredFile, tenancyTitle, type TenancyView } from "@/src/utils/tenancy-view";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const SCHEME_NAMES: Record<string, string> = {
  DPS: "DPS (Deposit Protection Service)",
  TDS: "TDS (Tenancy Deposit Scheme)",
  MYDEPOSITS: "mydeposits",
  SAFEDEPOSITS_SCOTLAND: "SafeDeposits Scotland",
  LPS_SCOTLAND: "Letting Protection Service Scotland",
  MYDEPOSITS_SCOTLAND: "mydeposits Scotland",
};

export default function DepositScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your deposit"
      description="Your deposit and its protection details live in your account."
    >
      <Deposit />
    </AuthRequiredScreen>
  );
}

function Deposit() {
  const router = useRouter();
  const query = useActiveTenancy();
  const { tenancy: tenancyParam } = useLocalSearchParams<{ tenancy?: string }>();
  // A notification can point at a past tenancy; fall back to the active one when it is not among the student's.
  const requested = tenancyParam ? (query.data ?? []).map(asTenancyView).find((item) => item._id === tenancyParam) : undefined;
  const tenancy = requested ?? query.tenancy;
  const shell = { title: "Deposit", back: true, fallbackHref: "/(app)/(tabs)/my-home" } as const;

  if (query.isLoading) {
    return (
      <SeekScreen {...shell}>
        <LoadingState label="Loading your deposit…" />
      </SeekScreen>
    );
  }
  if (query.isError && !query.data) {
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
          body="Your deposit details appear here once your landlord has set up your tenancy."
          actionLabel="Back to My home"
          onAction={() => router.navigate("/(app)/(tabs)/my-home")}
        />
      </SeekScreen>
    );
  }
  return <DepositContent tenancy={tenancy} />;
}

function DepositContent({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const router = useRouter();
  const hasDeposit = tenancy.depositAmount > 0;
  const protectedOn = tenancy.depositProtectedAt;
  const scotland = tenancy.listing?.nation === "SCOTLAND";
  const check = depositCapCheck(tenancy, tenancy.listing?.nation);
  const limit = scotland ? "30 working days" : `${depositProtectionDays(tenancy.listing?.nation)} days`;
  const receivedOn = tenancy.depositReceivedAt;
  const dayMs = 86_400_000;
  // Protection is due 30 days after receipt (England/Wales, 28 in Northern Ireland) or 30 working days after the tenancy starts (Scotland).
  const daysTaken = receivedOn && protectedOn ? Math.max(0, Math.round((Date.parse(protectedOn) - Date.parse(receivedOn)) / dayMs)) : null;
  const daysLeft = protectedOn ? null : depositDaysLeft(tenancy, tenancy.listing?.nation);
  const deadline = protectedOn ? null : depositDeadline(tenancy, tenancy.listing?.nation)?.toISOString() ?? null;
  const households = Math.max(1, tenancy.tenants.length);
  const certificate = (tenancy.documents ?? []).find((doc) => doc.type === "DEPOSIT_CERTIFICATE");
  const [certMessage, setCertMessage] = useState<string | null>(null);
  const openCertificate = async () => {
    if (!certificate) return router.push("/(app)/documents");
    setCertMessage(null);
    try {
      await openStoredFile(certificate);
    } catch (error) {
      setCertMessage(errorMessage(error, "We couldn't open the certificate right now. Please try again."));
    }
  };

  const details = [
    { label: "Scheme", value: tenancy.depositScheme ? (SCHEME_NAMES[tenancy.depositScheme] ?? tenancy.depositScheme) : "Not registered yet" },
    { label: "Reference", value: tenancy.depositReference || "Not issued yet" },
    { label: "Deposit received", value: receivedOn ? formatDate(receivedOn) : "Not recorded yet" },
    {
      label: "Protected on",
      value: protectedOn
        ? `${formatDate(protectedOn)}${daysTaken != null ? ` · ${daysTaken} ${daysTaken === 1 ? "day" : "days"} after payment` : ""}`
        : daysLeft != null
          ? daysLeft >= 0
            ? `Not yet · due by ${formatDate(deadline)} (${daysLeft} ${daysLeft === 1 ? "day" : "days"} left)`
            : `Overdue since ${formatDate(deadline)} (${-daysLeft} ${daysLeft === -1 ? "day" : "days"} late)`
          : "Not protected yet",
    },
    { label: "Household total", value: `${formatPence(tenancy.depositAmount * households)} joint` },
    { label: "Monthly rent (your share)", value: formatPence(tenancy.monthlyRent) },
    { label: `Legal maximum (${check.label})`, value: formatPence(check.cap) },
  ];

  return (
    <SeekScreen
      title="Deposit"
      subtitle={tenancyTitle(tenancy)}
      back
      fallbackHref="/(app)/(tabs)/my-home"
    >
      <Card>
        <View style={styles.amountRow}>
          <View>
            <Text style={[styles.label, { color: colors.mutedText }]}>Your share</Text>
            <Text style={[styles.amount, { color: colors.text }]}>{formatPence(tenancy.depositAmount)}</Text>
          </View>
          {hasDeposit ? (
            <Badge label={protectedOn ? "Protected" : "Not protected yet"} tone={protectedOn ? "success" : "danger"} />
          ) : (
            <Badge label="No deposit" tone="neutral" />
          )}
        </View>
        {hasDeposit
          ? details.map((item) => (
              <View key={item.label}>
                <Divider />
                <View style={styles.detail}>
                  <Text style={[styles.label, { color: colors.mutedText }]}>{item.label}</Text>
                  <Text style={[styles.value, { color: colors.text }]}>{item.value}</Text>
                </View>
              </View>
            ))
          : null}
        {hasDeposit ? (
          <SeekButton
            label={certificate ? "Open protection certificate" : "Protection certificate and documents"}
            variant="tint"
            compact
            onPress={() => void openCertificate()}
          />
        ) : null}
        {certMessage ? (
          <Text accessibilityRole="alert" style={[styles.notice, { color: colors.danger }]}>
            {certMessage}
          </Text>
        ) : null}
      </Card>

      {hasDeposit && !protectedOn ? (
        <Card style={{ backgroundColor: colors.dangerBg, borderColor: "transparent" }}>
          <Text accessibilityRole="alert" style={[styles.notice, { color: colors.danger }]}>
            Your landlord must protect your deposit in a government-approved scheme within {limit}{scotland ? " of your tenancy starting" : ""} and give you the
            details. Ask them for the scheme and reference, or see the tips below.
          </Text>
        </Card>
      ) : null}

      {hasDeposit && check.overCap ? (
        <Card style={{ backgroundColor: colors.warningBg, borderColor: "transparent" }}>
          <Text accessibilityRole="alert" style={[styles.notice, { color: colors.warning }]}>
            This deposit is about {check.weeks.toFixed(1)} weeks of rent. The legal maximum is {check.label} (
            {formatPence(check.cap)}), so the part above it may be recoverable. See the tips below on how to raise it.
          </Text>
        </Card>
      ) : null}

      {hasDeposit && !check.overCap ? (
        <Text style={[styles.body, { color: colors.mutedText }]}>
          Within the {check.label} legal limit ({check.weeks.toFixed(1)} weeks of rent).
        </Text>
      ) : null}

      <AdviceCard topic="deposit" tenancyId={tenancy._id} heading="Seek AI · getting your deposit back" />

      {hasDeposit ? <Deductions tenancy={tenancy} /> : null}

      <AskAboutDeposit tenancy={tenancy} />

      <View style={styles.section}>
        <SectionTitle>At move-out</SectionTitle>
        <Text style={[styles.body, { color: colors.mutedText }]}>
          Any deductions must be agreed with you. If you disagree, the scheme&apos;s free dispute service decides.
        </Text>
      </View>

      <HomeAdmin tenancy={tenancy} only="photos" photoStage="CHECK_OUT" />
    </SeekScreen>
  );
}

/** What the landlord proposes to keep at move-out; each tenant accepts or disputes it. */
function Deductions({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const { data: me } = useAuthControllerCurrentUser();
  const contracts = useContractsControllerForTenancy(tenancy._id, { query: { retry: 1 } });
  const respond = useContractsControllerRespondToDeductions();
  const [state, setState] = useState<{ text: string; error?: boolean } | null>(null);

  const contract = (contracts.data ?? []).find((item) => item.status !== "DRAFT" && item.deductions);
  const deductions = contract?.deductions;
  if (!contract || !deductions) return null;

  const mine = deductions.responses.find((response) => response.user === me?._id);
  const answer = (accept: boolean) => {
    setState(null);
    respond.mutate(
      { id: contract._id, data: { accept } },
      {
        onSuccess() {
          setState({ text: accept ? "You agreed to the deductions." : "You disputed the deductions. The scheme's free dispute service can decide." });
          void queryClient.invalidateQueries({ queryKey: getContractsControllerForTenancyQueryKey(tenancy._id) });
        },
        onError(error) {
          setState({ text: errorMessage(error, "We couldn't save your answer."), error: true });
        },
      },
    );
  };
  const tone = deductions.status === "ACCEPTED" ? "success" : deductions.status === "DISPUTED" ? "danger" : "warning";

  return (
    <View style={styles.section}>
      <SectionTitle>Proposed deductions</SectionTitle>
      <Card>
        <View style={styles.amountRow}>
          <Text style={[styles.value, { color: colors.text, textAlign: "left" }]}>
            Total {formatPence(deductions.total)} of {formatPence(tenancy.depositAmount * Math.max(1, tenancy.tenants.length))}
          </Text>
          <Badge
            label={deductions.status === "ACCEPTED" ? "Agreed" : deductions.status === "DISPUTED" ? "Disputed" : mine ? "Waiting for housemates" : "Waiting for you"}
            tone={tone}
          />
        </View>
        {deductions.items.map((item, index) => (
          <View key={`${item.description}-${index}`}>
            <Divider />
            <View style={styles.detail}>
              <Text style={[styles.body, { color: colors.text, flex: 1 }]}>{item.description}</Text>
              <Text style={[styles.value, { color: colors.text, flex: 0 }]}>{formatPence(item.amount)}</Text>
            </View>
          </View>
        ))}
        {deductions.status === "PROPOSED" && !mine ? (
          <View style={styles.actions}>
            <SeekButton label={respond.isPending ? "Saving…" : "Agree"} compact disabled={respond.isPending} onPress={() => answer(true)} />
            <SeekButton label="Dispute" compact variant="secondary" disabled={respond.isPending} onPress={() => answer(false)} />
          </View>
        ) : null}
        {mine && !state ? (
          <Text style={[styles.notice, { color: mine.accepted ? colors.success : colors.warning }]}>{mine.accepted ? "You agreed to the deductions." : "You disputed the deductions."}</Text>
        ) : null}
        {state ? (
          <Text accessibilityRole="alert" style={[styles.notice, { color: state.error ? colors.danger : colors.success }]}>
            {state.text}
          </Text>
        ) : null}
      </Card>
    </View>
  );
}

/** Canonical questions; each one is routed to its topic by depositAnswer (scripts/deposit-questions.test.mjs). */
const DEPOSIT_QUESTIONS = [
  "Which scheme is my deposit in?",
  "What if my deposit was not protected?",
  "What can my landlord deduct?",
  "When do I get my deposit back?",
  "What if we disagree about the deposit?",
  "Where is my deposit certificate?",
  "What is the maximum deposit?",
];

/** Fixed questions about the deposit, answered from the tenancy's facts. */
function AskAboutDeposit({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const ask = useMutation({
    mutationFn: (question: string) => aiControllerAdvice({ topic: "deposit", tenancyId: tenancy._id, question }),
  });

  return (
    <View style={styles.section}>
      <SectionTitle>Ask about your deposit</SectionTitle>
      <Text style={[styles.body, { color: colors.mutedText }]}>
        Pick a question. Answers come from your tenancy and the deposit rules.
      </Text>
      <View style={styles.chips}>
        {DEPOSIT_QUESTIONS.map((question) => {
          const on = ask.variables === question;
          return (
            <Pressable
              key={question}
              accessibilityRole="button"
              accessibilityState={{ selected: on, disabled: ask.isPending }}
              disabled={ask.isPending}
              onPress={() => ask.mutate(question)}
              style={[
                styles.chip,
                { backgroundColor: on ? colors.primary : colors.surface, borderColor: on ? colors.primary : colors.line },
              ]}
            >
              <Text style={[styles.chipText, { color: on ? colors.onPrimary : colors.text }]}>{question}</Text>
            </Pressable>
          );
        })}
      </View>
      {ask.isPending ? <Text style={[styles.body, { color: colors.mutedText }]}>Thinking…</Text> : null}
      {ask.isError ? (
        <Text accessibilityRole="alert" style={[styles.notice, { color: colors.danger }]}>
          {errorMessage(ask.error, "Couldn't answer just now. Please try again.")}
        </Text>
      ) : ask.data ? (
        <Card>
          <Text style={[styles.body, { color: colors.text, fontWeight: "600" }]}>{ask.variables}</Text>
          <Text style={[styles.body, { color: colors.text }]}>{ask.data.advice}</Text>
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  amountRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  label: { fontSize: 12.5 },
  amount: { fontSize: 34, lineHeight: 40, fontWeight: "700" },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingTop: 12,
  },
  value: { flex: 1, fontSize: 13.5, fontWeight: "600", textAlign: "right" },
  notice: { fontSize: 13, lineHeight: 19, fontWeight: "600" },
  section: { gap: 8 },
  body: { fontSize: 13.5, lineHeight: 20 },
  self: { alignSelf: "flex-start" },
  actions: { flexDirection: "row", gap: 8, paddingTop: 12 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  chipText: { fontSize: 13, fontWeight: "600" },
});
