import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { AdviceCard } from "@/components/seek/advice-card";
import { HomeAdmin } from "@/components/seek/home-admin";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Card, SectionTitle, SeekButton, SeekScreen } from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { useTenanciesControllerAccept } from "@/src/api/seek-api/tenancies";
import { invalidateHomeQueries, useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useBillsControllerForTenancy } from "@/src/api/seek-api/bills";
import {
  useNotificationsControllerList,
  useNotificationsControllerMarkRead,
} from "@/src/api/seek-api/notifications";
import {
  usePaymentsControllerGetPlan,
  usePaymentsControllerMine,
} from "@/src/api/seek-api/payments";
import { useRepairsControllerForTenancy } from "@/src/api/seek-api/repairs";
import { routeForNotification } from "@/src/utils/notification-route";
import { formatDay, formatPence, pluralise } from "@/src/utils/seek-format";
import {
  errorMessage,
  frequencyLabel,
  idOf,
  nextPayment,
  tenancyTitle,
  type TenancyView,
} from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  BellIcon,
  FileTextIcon,
  PiggyBankIcon,
  ReceiptIcon,
  TriangleAlertIcon,
  WrenchIcon,
  ZapIcon,
} from "lucide-react-native";
import React, { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function MyHomeScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your home"
      description="Your rent, deposit, bills and documents live here once you have a tenancy."
    >
      <MyHome />
    </AuthRequiredScreen>
  );
}

function MyHome() {
  const router = useRouter();
  const { tenancy, isLoading, isError, error, refetch } = useActiveTenancy();

  if (isLoading) {
    return (
      <SeekScreen title="My home">
        <LoadingState label="Loading your home…" />
      </SeekScreen>
    );
  }
  if (isError) {
    return (
      <SeekScreen title="My home">
        <ErrorState error={error} onRetry={() => refetch()} title="Couldn't load your home" />
      </SeekScreen>
    );
  }
  if (!tenancy) {
    return (
      <SeekScreen title="My home">
        <EmptyState
          title="No home yet"
          body="When a landlord accepts your application and sets up your tenancy, your rent, deposit, bills and contract show up here."
          actionLabel="Find a home"
          onAction={() => router.navigate("/(app)/(tabs)/map")}
        />
      </SeekScreen>
    );
  }
  if (tenancy.status === "PENDING_ACCEPTANCE") return <PendingTenancy tenancy={tenancy} />;
  return <HomeContent tenancy={tenancy} />;
}

/** A landlord-created tenancy waiting for this student: rent, deposit and bills stay hidden until it is ACTIVE. */
function PendingTenancy({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const { data: user } = useAuthControllerCurrentUser();
  const accept = useTenanciesControllerAccept({ mutation: { onSuccess: () => invalidateHomeQueries(queryClient) } });
  const canAccept = (tenancy.pendingTenants ?? []).some((item) => idOf(item) === user?._id);
  return (
    <SeekScreen title="My home">
      <Card>
        <Text style={[styles.noticeTitle, { color: colors.text }]}>Accept your tenancy</Text>
        <Text style={[styles.tileDetail, { color: colors.mutedText }]}>
          {tenancyTitle(tenancy)}
          {tenancy.listing?.streetAddress ? ` · ${tenancy.listing.streetAddress}` : ""}
        </Text>
        <Text style={[styles.tileDetail, { color: colors.mutedText }]}>
          {formatPence(tenancy.monthlyRent)} per person a month · starts {formatDay(tenancy.startDate)}
        </Text>
        {canAccept ? (
          <SeekButton
            label={accept.isPending ? "Accepting…" : "Accept"}
            disabled={accept.isPending}
            onPress={() => accept.mutate({ id: tenancy._id })}
          />
        ) : (
          <Text style={[styles.tileDetail, { color: colors.mutedText }]}>
            You have accepted. Rent starts once everyone in the household has.
          </Text>
        )}
        {accept.isError ? (
          <Text style={[styles.noticeBody, { color: colors.warning }]}>
            {errorMessage(accept.error, "We couldn't accept this tenancy. Please try again.")}
          </Text>
        ) : null}
      </Card>
    </SeekScreen>
  );
}

function HomeContent({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const tenancyId = tenancy._id;

  const payments = usePaymentsControllerMine({ tenancy: tenancyId }, { query: { retry: 1 } });
  const plan = usePaymentsControllerGetPlan(tenancyId, { query: { retry: 1 } });
  const bills = useBillsControllerForTenancy(tenancyId, { query: { retry: 1 } });
  const repairs = useRepairsControllerForTenancy(tenancyId, { query: { retry: 1 } });
  const notifications = useNotificationsControllerList({ query: { retry: 1 } });
  const markRead = useNotificationsControllerMarkRead({
    mutation: { onSuccess: () => invalidateHomeQueries(queryClient) },
  });

  const planView = plan.data;
  const next = payments.data ? nextPayment(payments.data) : undefined;
  const late = next?.status === "LATE";
  const paidCount = (payments.data ?? []).filter((item) => item.status === "PAID").length;

  const allBills = bills.data ?? [];
  const owedBills = allBills.filter((bill) => !bill.includedInRent && bill.status === "DUE" && !bill.myPaid);
  const owedTotal = owedBills.reduce((sum, bill) => sum + bill.myShare, 0);
  const includedCount = allBills.filter((bill) => bill.includedInRent).length;

  const openRepairs = (repairs.data ?? []).filter((item) => item.status !== "FIXED");
  const agreement = tenancy.documents.find((doc) => doc.type === "TENANCY_AGREEMENT");
  const unread = (notifications.data ?? []).filter((item) => !item.readAt);
  const contractDetail = agreement
    ? agreement.title
    : "Read and sign your agreement";

  const deposit = tenancy.depositAmount;
  const depositDetail =
    deposit === 0
      ? "No deposit"
      : tenancy.depositProtectedAt
        ? `${formatPence(deposit)} protected · ${tenancy.depositScheme ?? "scheme"}`
        : `${formatPence(deposit)} · not protected yet`;

  const billsDetail = bills.isError
    ? "Couldn't load"
    : bills.isLoading
      ? "Loading…"
      : owedBills.length > 0
        ? `${pluralise(owedBills.length, "bill")} to pay · ${formatPence(owedTotal)}`
        : includedCount > 0
          ? `${includedCount} included in rent`
          : "Nothing to pay";

  const repairsDetail = repairs.isError
    ? "Couldn't load"
    : repairs.isLoading
      ? "Loading…"
      : openRepairs.length > 0
        ? `${openRepairs.length} open · ${openRepairs[0].title}`
        : "Nothing open · report a problem";

  const scrollRef = useRef<ScrollView>(null);
  const notificationsY = useRef(0);
  const tiles = [
    {
      key: "contract",
      icon: FileTextIcon,
      title: "Contract",
      detail: contractDetail,
      onPress: () => router.push("/(app)/contract"),
    },
    {
      key: "deposit",
      icon: PiggyBankIcon,
      title: "Deposit",
      detail: depositDetail,
      onPress: () => router.push("/(app)/deposit"),
    },
    {
      key: "bills",
      icon: ZapIcon,
      title: "Bills",
      detail: billsDetail,
      onPress: () => router.push("/(app)/bills"),
    },
    {
      key: "repairs",
      icon: WrenchIcon,
      title: "Repairs",
      detail: repairsDetail,
      onPress: () => router.push("/(app)/repairs"),
    },
    {
      key: "receipts",
      icon: ReceiptIcon,
      title: "Rent history",
      detail: payments.isLoading ? "Loading…" : `${pluralise(paidCount, "payment")} made`,
      onPress: () => router.push("/(app)/rent-plan"),
    },
    {
      key: "notifications",
      icon: BellIcon,
      title: "Updates",
      detail: unread.length > 0 ? `${unread.length} new` : "All caught up",
      onPress: () => scrollRef.current?.scrollTo({ y: notificationsY.current, animated: true }),
    },
  ];

  const warnings = tenancy.compliance.filter(
    (item) =>
      item.kind === "DEPOSIT_UNPROTECTED" || item.kind === "DEPOSIT_NOT_YET_RECEIVED" || item.severity === "high",
  );

  return (
    <SeekScreen
      scrollRef={scrollRef}
      title="My home"
      subtitle={`${tenancyTitle(tenancy)} · since ${formatDay(tenancy.startDate)}`}
    >
      {warnings.length > 0 ? (
        <Card style={{ backgroundColor: colors.warningBg, borderColor: "transparent" }}>
          <View style={styles.row}>
            <TriangleAlertIcon color={colors.warning} size={18} />
            <Text style={[styles.noticeTitle, { color: colors.warning }]}>Worth raising with your landlord</Text>
          </View>
          {warnings.slice(0, 3).map((item) => (
            <Text key={`${item.kind}-${item.message}`} style={[styles.noticeBody, { color: colors.warning }]}>
              {item.message}
            </Text>
          ))}
        </Card>
      ) : null}

      <Card tone="hero">
        {payments.isLoading ? (
          <LoadingState label="Loading your rent…" />
        ) : payments.isError ? (
          <ErrorState error={payments.error} onRetry={() => payments.refetch()} title="Couldn't load your rent" />
        ) : next ? (
          <>
            <Text style={[styles.heroLabel, { color: colors.heroMuted }]}>
              {late ? "Rent overdue" : "Next rent"} · {formatDay(next.dueDate)}
            </Text>
            <Text style={[styles.heroAmount, { color: colors.onHero }]}>{formatPence(next.amount)}</Text>
            <Text style={[styles.heroNote, { color: colors.heroMuted }]}>
              {planView
                ? `${planView.plan.autopay ? "Autopay on" : "Autopay off"} · ${frequencyLabel(planView.plan.frequency)}`
                : "Rent plan"}
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.heroLabel, { color: colors.heroMuted }]}>Rent</Text>
            <Text style={[styles.heroAmount, { color: colors.onHero }]}>All paid up</Text>
            <Text style={[styles.heroNote, { color: colors.heroMuted }]}>
              Nothing due right now.
            </Text>
          </>
        )}
        <View style={styles.heroActions}>
          <SeekButton label="Rent plan" variant="light" compact onPress={() => router.push("/(app)/rent-plan")} />
          <SeekButton
            label="Receipts"
            variant="outlineOnHero"
            compact
            onPress={() => router.push("/(app)/rent-plan")}
            style={styles.receipts}
          />
        </View>
      </Card>

      <View style={styles.grid}>
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Pressable
              key={tile.key}
              accessibilityRole="button"
              accessibilityLabel={tile.title}
              disabled={!tile.onPress}
              onPress={tile.onPress}
              style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.line }]}
            >
              <View style={[styles.tileIcon, { backgroundColor: colors.tint }]}>
                <Icon color={colors.onTint} size={20} />
              </View>
              <Text style={[styles.tileTitle, { color: colors.text }]}>{tile.title}</Text>
              <Text numberOfLines={2} style={[styles.tileDetail, { color: colors.mutedText }]}>
                {tile.detail}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section} onLayout={(event) => (notificationsY.current = event.nativeEvent.layout.y)}>
        <SectionTitle hint={unread.length > 0 ? `${unread.length} new` : undefined}>Notifications</SectionTitle>
        <Card style={styles.list}>
          {notifications.isLoading ? (
            <LoadingState label="Loading notifications…" />
          ) : notifications.isError ? (
            <ErrorState error={notifications.error} onRetry={() => notifications.refetch()} title="Couldn't load notifications" />
          ) : (notifications.data ?? []).length === 0 ? (
            <Text style={[styles.empty, { color: colors.mutedText }]}>No notifications yet.</Text>
          ) : (
            (notifications.data ?? []).slice(0, 4).map((item) => (
              <Pressable
                key={item._id}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                onPress={() => {
                  if (!item.readAt) markRead.mutate({ id: item._id });
                  const href = routeForNotification(item);
                  if (href) router.push(href);
                }}
                style={styles.notification}
              >
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: item.readAt ? "transparent" : colors.accent },
                  ]}
                />
                <View style={styles.flex}>
                  <Text style={[styles.notificationTitle, { color: colors.text }]}>{item.title}</Text>
                  {item.body ? (
                    <Text style={[styles.tileDetail, { color: colors.mutedText }]}>{item.body}</Text>
                  ) : null}
                </View>
                <Text style={[styles.tileDetail, { color: colors.mutedText }]}>{formatDay(item.createdAt)}</Text>
              </Pressable>
            ))
          )}
        </Card>
      </View>

      <HomeAdmin tenancy={tenancy} />

      <AdviceCard topic="contract" tenancyId={tenancyId} heading="Seek AI · your contract" />
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  section: { gap: 8 },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  empty: { fontSize: 13.5, padding: 16 },
  heroLabel: { fontSize: 12.5, fontWeight: "600" },
  heroAmount: { fontSize: 38, lineHeight: 44, fontWeight: "700" },
  heroNote: { fontSize: 13 },
  heroActions: { flexDirection: "row", gap: 8, marginTop: 4 },
  receipts: { minWidth: 96 },
  noticeTitle: { flex: 1, fontSize: 14, fontWeight: "700" },
  noticeBody: { fontSize: 13, lineHeight: 19 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  tile: {
    width: "48.5%",
    flexGrow: 1,
    minHeight: 128,
    padding: 14,
    gap: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  tileIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  tileTitle: { fontSize: 15, fontWeight: "700" },
  tileDetail: { fontSize: 12.5, lineHeight: 17 },
  notification: { flexDirection: "row", alignItems: "flex-start", gap: 10, padding: 14 },
  notificationTitle: { fontSize: 14, fontWeight: "600" },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
});
