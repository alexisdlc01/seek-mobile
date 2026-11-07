import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import {
  Badge,
  Card,
  Divider,
  RadioDot,
  SectionTitle,
  SeekButton,
  SeekScreen,
} from "@/components/seek/ui";
import { invalidateHomeQueries, useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import {
  usePaymentsControllerGetPlan,
  usePaymentsControllerMine,
  usePaymentsControllerUpdatePlan,
} from "@/src/api/seek-api/payments";
import type { RentPlanFrequency, UpdateRentPlanDtoFrequency } from "@/src/api/seek-api/model";
import { payWithCheckout } from "@/src/utils/checkout";
import { formatDate, formatDay, formatPence } from "@/src/utils/seek-format";
import {
  errorMessage,
  frequencyLabel,
  nextPayment,
  tenancyTitle,
} from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { LockIcon, MinusIcon, PlusIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

type Draft = {
  frequency: RentPlanFrequency;
  autopay: boolean;
  notifyEveryPayment: boolean;
  remindDaysBefore: number;
};

const PLAN_COPY: Record<RentPlanFrequency, { title: string; months: number; unit: string }> = {
  MONTHLY: { title: "Monthly", months: 1, unit: "/month" },
  SIX_MONTHS: { title: "Half-year", months: 6, unit: "every 6 months" },
  YEARLY: { title: "Full year", months: 12, unit: "once a year" },
};
const PLAN_ORDER: RentPlanFrequency[] = ["MONTHLY", "SIX_MONTHS", "YEARLY"];

export default function RentPlanScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to manage your rent"
      description="Your rent plan, autopay and payment history live in your account."
    >
      <RentPlan />
    </AuthRequiredScreen>
  );
}

function RentPlan() {
  const router = useRouter();
  const tenancyQuery = useActiveTenancy();
  const tenancy = tenancyQuery.tenancy;

  if (tenancyQuery.isLoading) {
    return (
      <SeekScreen title="Rent plan" back fallbackHref="/(app)/(tabs)/my-home">
        <LoadingState label="Loading your rent plan…" />
      </SeekScreen>
    );
  }
  if (tenancyQuery.isError) {
    return (
      <SeekScreen title="Rent plan" back fallbackHref="/(app)/(tabs)/my-home">
        <ErrorState error={tenancyQuery.error} onRetry={() => tenancyQuery.refetch()} />
      </SeekScreen>
    );
  }
  if (!tenancy) {
    return (
      <SeekScreen title="Rent plan" back fallbackHref="/(app)/(tabs)/my-home">
        <EmptyState
          title="No tenancy yet"
          body="You can choose a rent plan once your landlord has set up your tenancy."
          actionLabel="Back to My home"
          onAction={() => router.navigate("/(app)/(tabs)/my-home")}
        />
      </SeekScreen>
    );
  }
  return <RentPlanContent tenancyId={tenancy._id} title={tenancyTitle(tenancy)} />;
}

function RentPlanContent({ tenancyId, title }: { tenancyId: string; title: string }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const planQuery = usePaymentsControllerGetPlan(tenancyId, { query: { retry: 1 } });
  const paymentsQuery = usePaymentsControllerMine({ tenancy: tenancyId }, { query: { retry: 1 } });
  const [draft, setDraft] = useState<Draft | null>(null);
  const [message, setMessage] = useState<{ tone: "success" | "warning" | "danger"; text: string } | null>(null);

  const refresh = () => invalidateHomeQueries(queryClient);
  const updatePlan = usePaymentsControllerUpdatePlan({
    mutation: {
      onSuccess: () => {
        setDraft(null);
        setMessage({ tone: "success", text: "Rent plan saved." });
        refresh();
      },
      onError: (error) => setMessage({ tone: "danger", text: errorMessage(error) }),
    },
  });
  const [paying, setPaying] = useState(false);
  const payNow = async (paymentId: string) => {
    setMessage(null);
    setPaying(true);
    try {
      const outcome = await payWithCheckout(paymentId);
      setMessage(
        outcome === "paid"
          ? { tone: "success", text: "Payment received. Your receipt is in your notifications." }
          : outcome === "cancelled"
            ? { tone: "warning", text: "Payment cancelled. Your rent is still due." }
            : { tone: "warning", text: "Your payment hasn't gone through yet. If you were charged, it will show here shortly." },
      );
    } catch (error) {
      setMessage({ tone: "danger", text: errorMessage(error) });
    } finally {
      setPaying(false);
      refresh();
    }
  };

  const plan = planQuery.data;

  if (planQuery.isLoading) {
    return (
      <SeekScreen title="Choose your rent plan" back fallbackHref="/(app)/(tabs)/my-home">
        <LoadingState label="Loading your rent plan…" />
      </SeekScreen>
    );
  }
  if (planQuery.isError || !plan) {
    return (
      <SeekScreen title="Choose your rent plan" back fallbackHref="/(app)/(tabs)/my-home">
        <ErrorState error={planQuery.error} onRetry={() => planQuery.refetch()} title="Couldn't load your rent plan" />
      </SeekScreen>
    );
  }

  const saved: Draft = {
    frequency: plan.plan.frequency,
    autopay: plan.plan.autopay,
    notifyEveryPayment: plan.plan.notifyEveryPayment,
    remindDaysBefore: plan.plan.remindDaysBefore,
  };
  const current = draft ?? saved;
  const dirty = JSON.stringify(current) !== JSON.stringify(saved);
  const change = (patch: Partial<Draft>) => {
    setMessage(null);
    setDraft({ ...current, ...patch });
  };
  const restricted = plan.allowedFrequencies.length < PLAN_ORDER.length;

  const payments = paymentsQuery.data ?? [];
  const next = nextPayment(payments);
  const history = payments
    .filter((item) => item.status === "PAID")
    .sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  const canPay = plan.mode !== "unavailable";
  const noticeColors = message
    ? message.tone === "success"
      ? { bg: colors.successBg, fg: colors.success }
      : message.tone === "warning"
        ? { bg: colors.warningBg, fg: colors.warning }
        : { bg: colors.dangerBg, fg: colors.danger }
    : null;

  return (
    <SeekScreen
      title="Choose your rent plan"
      subtitle={`${title} · your share ${formatPence(plan.monthlyRent)} a month`}
      back
      fallbackHref="/(app)/(tabs)/my-home"
      footer={
        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.line }]}>
          <SeekButton
            label={
              updatePlan.isPending
                ? "Saving…"
                : dirty
                  ? `Confirm ${PLAN_COPY[current.frequency].title.toLowerCase()} plan${current.autopay ? " with autopay" : ""}`
                  : "Plan up to date"
            }
            variant={dirty ? "primary" : "secondary"}
            onPress={
              dirty && !updatePlan.isPending
                ? () => updatePlan.mutate({ tenancyId, data: { ...current, frequency: current.frequency as UpdateRentPlanDtoFrequency } })
                : undefined
            }
          />
          <Text style={[styles.footerNote, { color: colors.mutedText }]}>
            Seek never charges you a fee. Change your plan any time.
          </Text>
        </View>
      }
    >
      {message && noticeColors ? (
        <Card style={{ backgroundColor: noticeColors.bg, borderColor: "transparent" }}>
          <Text accessibilityRole="alert" style={[styles.noticeText, { color: noticeColors.fg }]}>
            {message.text}
          </Text>
        </Card>
      ) : null}

      <Card
        style={{
          backgroundColor: restricted ? colors.warningBg : colors.successBg,
          borderColor: "transparent",
        }}
      >
        <Text style={[styles.noticeText, { color: restricted ? colors.warning : colors.success }]}>
          {restricted
            ? (plan.restrictionReason ??
              "Rent can be taken at most one month in advance here, so only monthly is offered.")
            : "This home lets you pay ahead, so every plan is open."}
        </Text>
      </Card>

      <View style={styles.section}>
        {PLAN_ORDER.map((frequency) => {
          const copy = PLAN_COPY[frequency];
          const locked = !plan.allowedFrequencies.includes(frequency);
          const selected = current.frequency === frequency;
          return (
            <Pressable
              key={frequency}
              accessibilityRole="radio"
              accessibilityLabel={`${copy.title} plan`}
              accessibilityState={{ selected, disabled: locked }}
              disabled={locked}
              onPress={() => change({ frequency })}
              style={[
                styles.plan,
                {
                  backgroundColor: colors.surface,
                  borderColor: selected ? colors.accent : colors.line,
                  opacity: locked ? 0.55 : 1,
                },
              ]}
            >
              {locked ? <LockIcon color={colors.mutedText} size={20} /> : <RadioDot selected={selected} />}
              <View style={styles.flex}>
                <Text style={[styles.planTitle, { color: colors.text }]}>{copy.title}</Text>
                <Text style={[styles.planUnit, { color: colors.mutedText }]}>
                  {locked ? "Not allowed for this home" : copy.unit}
                </Text>
              </View>
              <Text style={[styles.planPrice, { color: colors.text }]}>
                {formatPence(plan.monthlyRent * copy.months)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section}>
        <SectionTitle>How you pay</SectionTitle>
        <View style={styles.modes}>
          {[
            { value: true, title: "Autopay", note: "Charged on the due date. Receipt in the app." },
            { value: false, title: "Remind me", note: "You pay each time, one tap." },
          ].map((mode) => (
            <Pressable
              key={mode.title}
              accessibilityRole="radio"
              accessibilityLabel={mode.title}
              accessibilityState={{ selected: current.autopay === mode.value }}
              onPress={() => change({ autopay: mode.value })}
              style={[
                styles.mode,
                {
                  backgroundColor: current.autopay === mode.value ? colors.tint : colors.surface,
                  borderColor: current.autopay === mode.value ? colors.accent : colors.line,
                },
              ]}
            >
              <Text style={[styles.planTitle, { color: colors.text }]}>{mode.title}</Text>
              <Text style={[styles.planUnit, { color: colors.mutedText }]}>{mode.note}</Text>
            </Pressable>
          ))}
        </View>
        <Card style={styles.settings}>
          <View style={styles.settingRow}>
            <View style={styles.flex}>
              <Text style={[styles.planTitle, { color: colors.text }]}>Notify me every payment</Text>
              <Text style={[styles.planUnit, { color: colors.mutedText }]}>A message each time rent is taken or paid.</Text>
            </View>
            <Switch
              accessibilityLabel="Notify me every payment"
              value={current.notifyEveryPayment}
              onValueChange={(value) => change({ notifyEveryPayment: value })}
              trackColor={{ true: colors.accent, false: colors.lineStrong }}
            />
          </View>
          <Divider />
          <View style={styles.settingRow}>
            <View style={styles.flex}>
              <Text style={[styles.planTitle, { color: colors.text }]}>Remind me before it&apos;s due</Text>
              <Text style={[styles.planUnit, { color: colors.mutedText }]}>
                {current.remindDaysBefore === 0
                  ? "On the day"
                  : `${current.remindDaysBefore} ${current.remindDaysBefore === 1 ? "day" : "days"} before`}
              </Text>
            </View>
            <View style={styles.stepper}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fewer days"
                hitSlop={8}
                onPress={() => change({ remindDaysBefore: Math.max(0, current.remindDaysBefore - 1) })}
                style={[styles.stepButton, { borderColor: colors.lineStrong }]}
              >
                <MinusIcon color={colors.text} size={16} />
              </Pressable>
              <Text style={[styles.stepValue, { color: colors.text }]}>{current.remindDaysBefore}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="More days"
                hitSlop={8}
                onPress={() => change({ remindDaysBefore: Math.min(14, current.remindDaysBefore + 1) })}
                style={[styles.stepButton, { borderColor: colors.lineStrong }]}
              >
                <PlusIcon color={colors.text} size={16} />
              </Pressable>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionTitle hint={plan.mode === "simulated" ? "Test mode · no real money" : undefined}>Upcoming</SectionTitle>
        <Card style={styles.list}>
          {plan.upcoming.length === 0 ? (
            <Text style={[styles.empty, { color: colors.mutedText }]}>Nothing scheduled.</Text>
          ) : (
            plan.upcoming.map((item, index) => (
              <View key={item._id}>
                {index > 0 ? <Divider /> : null}
                <View style={styles.scheduleRow}>
                  <View style={styles.flex}>
                    <Text style={[styles.planTitle, { color: colors.text }]}>{formatDay(item.dueDate)}</Text>
                    {item.status === "LATE" || item.status === "FAILED" ? (
                      <Text style={[styles.planUnit, { color: colors.danger }]}>
                        {item.status === "LATE" ? "Overdue" : "Last attempt failed"}
                      </Text>
                    ) : null}
                  </View>
                  <Text style={[styles.planPrice, { color: colors.text }]}>{formatPence(item.amount)}</Text>
                  {next?._id === item._id ? (
                    <SeekButton
                      label={paying ? "Paying…" : "Pay now"}
                      compact
                      onPress={canPay && !paying ? () => payNow(item._id) : undefined}
                    />
                  ) : null}
                </View>
              </View>
            ))
          )}
        </Card>
        {!canPay ? (
          <Text style={[styles.planUnit, { color: colors.mutedText }]}>
            Rent payments are paused for now. Please try again later.
          </Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <SectionTitle hint={frequencyLabel(saved.frequency)}>Payment history</SectionTitle>
        <Card style={styles.list}>
          {paymentsQuery.isLoading ? (
            <LoadingState label="Loading payments…" />
          ) : paymentsQuery.isError ? (
            <ErrorState error={paymentsQuery.error} onRetry={() => paymentsQuery.refetch()} title="Couldn't load your payments" />
          ) : history.length === 0 ? (
            <Text style={[styles.empty, { color: colors.mutedText }]}>No payments yet.</Text>
          ) : (
            history.map((item, index) => (
              <View key={item._id}>
                {index > 0 ? <Divider /> : null}
                <View style={styles.scheduleRow}>
                  <View style={styles.flex}>
                    <Text style={[styles.planTitle, { color: colors.text }]}>{formatDate(item.dueDate)}</Text>
                    <Text style={[styles.planUnit, { color: colors.mutedText }]}>
                      {item.paidAt ? `Paid ${formatDay(item.paidAt)}` : "Paid"}
                    </Text>
                  </View>
                  <Text style={[styles.planPrice, { color: colors.text }]}>{formatPence(item.amount)}</Text>
                  <Badge label="Paid" tone="success" />
                </View>
              </View>
            ))
          )}
        </Card>
      </View>
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  noticeText: { fontSize: 13, lineHeight: 19, fontWeight: "600" },
  section: { gap: 8 },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  planTitle: { fontSize: 15, fontWeight: "700" },
  planUnit: { fontSize: 12.5, lineHeight: 17 },
  planPrice: { fontSize: 17, fontWeight: "700" },
  modes: { flexDirection: "row", gap: 10 },
  mode: {
    flex: 1,
    gap: 2,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  settings: { padding: 0, gap: 0, overflow: "hidden" },
  settingRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14 },
  stepper: { flexDirection: "row", alignItems: "center", gap: 10 },
  stepButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stepValue: { minWidth: 18, fontSize: 16, fontWeight: "700", textAlign: "center" },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  empty: { fontSize: 13.5, padding: 16 },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  footer: { padding: 16, gap: 8, borderTopWidth: 1 },
  footerNote: { fontSize: 12, textAlign: "center" },
});
