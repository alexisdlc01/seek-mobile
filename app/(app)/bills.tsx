import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { AdviceCard } from "@/components/seek/advice-card";
import { HomeAdmin } from "@/components/seek/home-admin";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, Divider, ListRow, ProgressBar, SectionTitle, SeekButton, SeekScreen } from "@/components/seek/ui";
import { invalidateHomeQueries, useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import {
  getBillsControllerForTenancyQueryKey,
  useBillsControllerCreate,
  useBillsControllerForTenancy,
  useBillsControllerMarkPaid,
} from "@/src/api/seek-api/bills";
import type { BillViewDto, CreateBillDtoCategory } from "@/src/api/seek-api/model";
import { formatDay, formatPence, pluralise } from "@/src/utils/seek-format";
import { errorMessage, tenancyTitle, type TenancyView } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
  ShieldCheckIcon,
  DropletsIcon,
  FlameIcon,
  LandmarkIcon,
  ReceiptIcon,
  TvIcon,
  WifiIcon,
} from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const CATEGORY_LABEL: Record<string, string> = {
  ENERGY: "Energy",
  WATER: "Water",
  BROADBAND: "Broadband",
  COUNCIL_TAX: "Council tax",
  TV_LICENCE: "TV Licence",
  OTHER: "Other",
};

function categoryIcon(category: string, color: string) {
  switch (category) {
    case "ENERGY":
      return <FlameIcon color={color} size={20} />;
    case "WATER":
      return <DropletsIcon color={color} size={20} />;
    case "BROADBAND":
      return <WifiIcon color={color} size={20} />;
    case "COUNCIL_TAX":
      return <LandmarkIcon color={color} size={20} />;
    case "TV_LICENCE":
      return <TvIcon color={color} size={20} />;
    default:
      return <ReceiptIcon color={color} size={20} />;
  }
}

export default function BillsScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your bills"
      description="Your household bills and your share of each live in your account."
    >
      <Bills />
    </AuthRequiredScreen>
  );
}

function Bills() {
  const router = useRouter();
  const query = useActiveTenancy();
  const tenancy = query.tenancy;
  const shell = { title: "Bills", back: true, fallbackHref: "/(app)/(tabs)/my-home" } as const;

  if (query.isLoading) {
    return (
      <SeekScreen {...shell}>
        <LoadingState label="Loading your bills…" />
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
          body="Your household bills appear here once your landlord has set up your tenancy."
          actionLabel="Back to My home"
          onAction={() => router.navigate("/(app)/(tabs)/my-home")}
        />
      </SeekScreen>
    );
  }
  return <BillsContent tenancy={tenancy} />;
}

function BillsContent({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const query = useBillsControllerForTenancy(tenancy._id, { query: { retry: 1 } });
  const [message, setMessage] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [filing, setFiling] = useState<"councilTax" | "insurance" | null>(null);
  const router = useRouter();
  const { data: me } = useAuthControllerCurrentUser();
  const markPaid = useBillsControllerMarkPaid({
    mutation: {
      onSuccess: () => {
        setMessage({ tone: "success", text: "Your share is marked as paid." });
        invalidateHomeQueries(queryClient);
      },
      onError: (error) => setMessage({ tone: "danger", text: errorMessage(error) }),
      onSettled: () => setPayingId(null),
    },
  });

  const shell = { title: "Bills", subtitle: tenancyTitle(tenancy), back: true, fallbackHref: "/(app)/(tabs)/my-home" } as const;

  if (query.isLoading) {
    return (
      <SeekScreen {...shell}>
        <LoadingState label="Loading your bills…" />
      </SeekScreen>
    );
  }
  if (query.isError) {
    return (
      <SeekScreen {...shell}>
        <ErrorState error={query.error} onRetry={() => query.refetch()} title="Couldn't load your bills" />
      </SeekScreen>
    );
  }

  const bills = query.data ?? [];
  const included = bills.filter((bill) => bill.includedInRent);
  const toPay = bills
    .filter((bill) => !bill.includedInRent && bill.status === "DUE")
    .sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""));
  const paid = bills
    .filter((bill) => !bill.includedInRent && bill.status === "PAID")
    .sort((a, b) => (b.paidAt ?? "").localeCompare(a.paidAt ?? ""));
  const allowanceBill = bills.find((bill) => bill.allowance);
  const allowance = allowanceBill?.allowance;
  const allowanceMonth = formatDay(allowanceBill?.periodEnd ?? allowanceBill?.periodStart ?? allowanceBill?.dueDate).split(" ")[1];
  const councilTaxBill = bills.find((bill) => bill.category === "COUNCIL_TAX");
  const exemptionOnFile = (tenancy.documents ?? []).some((doc) => doc.type === "COUNCIL_TAX_EXEMPTION");
  const councilTax = councilTaxBill?.includedInRent
    ? { badge: "Included in rent", tone: "success" as const, note: "Nothing to pay." }
    : exemptionOnFile
      ? { badge: "Exempt", tone: "success" as const, note: "Student exemption certificate on file." }
      : councilTaxBill
        ? { badge: "Bill", tone: "warning" as const, note: "See your share below." }
        : {
            badge: "Not set up",
            tone: "warning" as const,
            note: "Households of full-time students are usually exempt. Ask your landlord to add the certificate.",
          };

  const notice = message
    ? message.tone === "success"
      ? { bg: colors.successBg, fg: colors.success }
      : { bg: colors.dangerBg, fg: colors.danger }
    : null;

  const nameOf = (userId: string) =>
    userId === me?._id ? "You" : (tenancy.tenants.find((tenant) => tenant._id === userId)?.name ?? "Housemate");

  const billRow = (bill: BillViewDto, action?: React.ReactNode) => {
    const people = bill.splitBetween?.length ?? 1;
    const label = bill.provider || CATEGORY_LABEL[bill.category] || "Bill";
    const subtitle = [
      CATEGORY_LABEL[bill.category],
      bill.status === "PAID"
        ? bill.paidAt
          ? `paid ${formatDay(bill.paidAt)}`
          : "paid"
        : bill.dueDate
          ? `due ${formatDay(bill.dueDate)}`
          : null,
      people > 1 ? `split ${pluralise(people, "way")} · total ${formatPence(bill.amount)}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    const payer = bill.paidBy;
    const oweLine = payer
      ? payer === me?._id
        ? bill.shares
            .filter((share) => !share.paid)
            .map((share) => `${nameOf(share.user)} owes you ${formatPence(share.amount)}`)
            .join(" · ")
        : bill.myShare > 0 && !bill.myPaid
          ? `You owe ${bill.paidByName ?? nameOf(payer)} ${formatPence(bill.myShare)}`
          : null
      : null;
    const shareLine =
      oweLine ||
      (!bill.includedInRent && (bill.shares?.length ?? 0) > 1
        ? bill.shares
            .map((share) => `${nameOf(share.user)} ${formatPence(share.amount)} ${share.paid ? "paid" : "to pay"}`)
            .join(" · ")
        : null);
    return (
      <ListRow
        icon={categoryIcon(bill.category, colors.accent)}
        title={bill.myShare === 0 ? label : `${label} · your share ${formatPence(bill.myShare)}`}
        subtitle={shareLine ? `${subtitle}\n${shareLine}` : subtitle}
        right={action}
      />
    );
  };

  return (
    <SeekScreen {...shell}>
      {message && notice ? (
        <Card style={{ backgroundColor: notice.bg, borderColor: "transparent" }}>
          <Text accessibilityRole="alert" style={[styles.noticeText, { color: notice.fg }]}>
            {message.text}
          </Text>
        </Card>
      ) : null}

      <View style={styles.section}>
        <SectionTitle>Included in your rent</SectionTitle>
        <Card>
          {included.length === 0 ? (
            <Text style={[styles.note, { color: colors.mutedText }]}>
              {tenancy.listing?.billsIncluded
                ? "Your landlord says bills are included. Ask them which ones."
                : "No bills are included in your rent, so you share them with your housemates."}
            </Text>
          ) : (
            <View style={styles.included}>
              {included.map((bill) => (
                <View key={bill._id} style={styles.includedItem}>
                  {categoryIcon(bill.category, colors.accent)}
                  <Text style={[styles.includedText, { color: colors.text }]}>
                    {CATEGORY_LABEL[bill.category] ?? "Other"}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Card>
        {allowance ? (
          <Card>
            <View style={styles.allowanceHead}>
              <Text style={[styles.includedText, { color: colors.text }]}>Energy fair-use allowance</Text>
              <Text style={[styles.note, { color: colors.mutedText }]}>
                {allowance.percentUsed}% used{allowanceMonth ? ` · ${allowanceMonth}` : ""}
              </Text>
            </View>
            <ProgressBar
              value={allowance.percentUsed / 100}
              tone={allowance.percentUsed > 100 ? "danger" : allowance.percentUsed > 80 ? "warning" : "accent"}
            />
            <Text style={[styles.note, { color: colors.mutedText }]}>
              {formatPence(allowance.used)} of {formatPence(allowance.allowance)}
              {allowance.overage > 0 && allowance.overagePerMember.length > 0
                ? ` · ${formatPence(allowance.overage)} over · ${formatPence(allowance.overagePerMember[0].amount)} each between ${allowance.overagePerMember.length}`
                : ""}
            </Text>
          </Card>
        ) : null}
      </View>

      <View style={styles.section}>
        <SectionTitle>To sort out</SectionTitle>
        <Card style={styles.list}>
          <ListRow
            icon={<LandmarkIcon color={colors.accent} size={20} />}
            title="Council tax"
            subtitle={councilTax.note}
            right={
              councilTax.badge === "Exempt" || councilTax.badge === "Included in rent" ? (
                <Badge label={councilTax.badge} tone={councilTax.tone} />
              ) : (
                <SeekButton
                  label="File"
                  variant="tint"
                  compact
                  onPress={() => setFiling(filing === "councilTax" ? null : "councilTax")}
                />
              )
            }
          />
          <Divider />
          <ListRow
            icon={<TvIcon color={colors.accent} size={20} />}
            title="TV Licence"
            subtitle="Only needed if you watch live TV or BBC iPlayer."
            right={
              <SeekButton
                label="Check"
                variant="tint"
                compact
                onPress={() => void WebBrowser.openBrowserAsync("https://www.tvlicensing.co.uk/check-if-you-need-one")}
              />
            }
          />
          <Divider />
          <ListRow
            icon={<ShieldCheckIcon color={colors.accent} size={20} />}
            title="Contents insurance"
            subtitle="Laptop, bike, phone. Your landlord's insurance does not cover them."
            right={
              <SeekButton
                label="Add policy"
                variant="tint"
                compact
                onPress={() => setFiling(filing === "insurance" ? null : "insurance")}
              />
            }
          />
        </Card>
        {filing ? <HomeAdmin tenancy={tenancy} only={filing} /> : null}
      </View>

      <View style={styles.section}>
        <SectionTitle hint={toPay.length > 0 ? pluralise(toPay.length, "bill") : undefined}>To pay</SectionTitle>
        {toPay.length === 0 ? (
          <Card>
            <Text style={[styles.note, { color: colors.mutedText }]}>
              {bills.length === 0 ? "No bills added yet." : "Nothing to pay right now."}
            </Text>
          </Card>
        ) : (
          <>
          <Text style={[styles.note, { color: colors.mutedText }]}>
            Seek only records your own share as paid; money moves between housemates outside the app. The bill is settled when every housemate has marked theirs.
          </Text>
          <Card style={styles.list}>
            {toPay.map((bill, index) => (
              <View key={bill._id}>
                {index > 0 ? <Divider /> : null}
                {billRow(
                  bill,
                  bill.myPaid ? (
                    <Badge label="You paid" tone="success" />
                  ) : bill.myShare === 0 ? (
                    <Badge label="Not in this split" />
                  ) : (
                  <SeekButton
                    label={
                      payingId === bill._id
                        ? "Saving…"
                        : bill.paidBy
                          ? `Settle up ${formatPence(bill.myShare)}`
                          : "I've paid my share"
                    }
                    variant="tint"
                    compact
                    onPress={
                      markPaid.isPending
                        ? undefined
                        : () => {
                            setMessage(null);
                            setPayingId(bill._id);
                            markPaid.mutate({ id: bill._id });
                          }
                    }
                  />
                  ),
                )}
              </View>
            ))}
          </Card>
          </>
        )}
      </View>

      <AddExpense tenancy={tenancy} onDone={(text) => setMessage({ tone: "success", text })} />

      {paid.length > 0 ? (
        <View style={styles.section}>
          <SectionTitle>Paid</SectionTitle>
          <Card style={styles.list}>
            {paid.map((bill, index) => (
              <View key={bill._id}>
                {index > 0 ? <Divider /> : null}
                {billRow(bill, <Badge label="Paid" tone="success" />)}
              </View>
            ))}
          </Card>
        </View>
      ) : null}

      <AdviceCard topic="bills" tenancyId={tenancy._id} heading="Seek AI · keeping bills fair" />
    </SeekScreen>
  );
}

const EXPENSE_CATEGORIES: { value: CreateBillDtoCategory; label: string }[] = [
  { value: "ENERGY", label: "Energy" },
  { value: "WATER", label: "Water" },
  { value: "BROADBAND", label: "Broadband" },
  { value: "OTHER", label: "Other" },
];

/** A cost one housemate paid up front (cleaner, streaming…), split between every tenant. */
function AddExpense({ tenancy, onDone }: { tenancy: TenancyView; onDone: (text: string) => void }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CreateBillDtoCategory>("OTHER");
  const [error, setError] = useState<string | null>(null);
  const create = useBillsControllerCreate();

  const input = [
    styles.input,
    { color: colors.text, backgroundColor: colors.surface, borderColor: colors.lineStrong },
  ];
  const people = Math.max(1, tenancy.tenants.length);

  const submit = () => {
    setError(null);
    const pounds = Number.parseFloat(amount.replace(",", "."));
    if (!provider.trim()) return setError("Say what the expense is for.");
    if (!Number.isFinite(pounds) || pounds <= 0 || pounds > 10000) return setError("Enter the total you paid, in pounds.");
    create.mutate(
      {
        data: {
          tenancy: tenancy._id,
          provider: provider.trim(),
          category,
          amount: Math.round(pounds * 100),
          source: "MANUAL",
        },
      },
      {
        onSuccess() {
          setProvider("");
          setAmount("");
          setCategory("OTHER");
          setOpen(false);
          void queryClient.invalidateQueries({ queryKey: getBillsControllerForTenancyQueryKey(tenancy._id) });
          void invalidateHomeQueries(queryClient);
          onDone(`Expense added and split ${people} ways. Your share is marked paid; the others owe you.`);
        },
        onError: (err) => setError(errorMessage(err, "We couldn't add that expense. Please try again.")),
      },
    );
  };

  return (
    <View style={styles.section}>
      <SectionTitle>Shared extras</SectionTitle>
      <Card style={styles.form}>
        {open ? (
          <>
            <TextInput
              accessibilityLabel="What is it for?"
              placeholder="What is it for? e.g. Cleaner, Netflix"
              placeholderTextColor={colors.mutedText}
              value={provider}
              onChangeText={setProvider}
              maxLength={80}
              selectionColor={colors.accent}
              style={input}
            />
            <TextInput
              accessibilityLabel="Total you paid in pounds"
              placeholder="Total you paid, in £"
              placeholderTextColor={colors.mutedText}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              maxLength={9}
              selectionColor={colors.accent}
              style={input}
            />
            <View style={styles.chips}>
              {EXPENSE_CATEGORIES.map((item) => {
                const selected = item.value === category;
                return (
                  <Pressable
                    key={item.value}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    onPress={() => setCategory(item.value)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: selected ? colors.heroChip : colors.surface,
                        borderColor: selected ? colors.heroChip : colors.lineStrong,
                      },
                    ]}
                  >
                    <Text style={[styles.chipText, { color: selected ? colors.onHeroChip : colors.text }]}>
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={[styles.note, { color: colors.mutedText }]}>
              Split equally between all {people} of you. Each housemate sees their share here.
            </Text>
            {error ? (
              <Text accessibilityRole="alert" style={[styles.noticeText, { color: colors.danger }]}>
                {error}
              </Text>
            ) : null}
            <View style={styles.formActions}>
              <SeekButton label={create.isPending ? "Adding…" : "Add expense"} compact disabled={create.isPending} onPress={submit} />
              <SeekButton label="Cancel" compact variant="secondary" onPress={() => setOpen(false)} />
            </View>
          </>
        ) : (
          <>
            <Text style={[styles.note, { color: colors.mutedText }]}>
              Paid for something the house shares? Add it: your share is marked paid and everyone else sees what they owe you.
            </Text>
            <SeekButton label="Add a shared expense" variant="tint" compact onPress={() => setOpen(true)} style={styles.self} />
          </>
        )}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  included: { flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap", gap: 12 },
  includedItem: { alignItems: "center", gap: 4 },
  includedText: { fontSize: 13, fontWeight: "600" },
  allowanceHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  note: { fontSize: 13.5, lineHeight: 20 },
  noticeText: { fontSize: 13, lineHeight: 19, fontWeight: "600" },
  form: { gap: 10 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14.5 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  chipText: { fontSize: 13, fontWeight: "600" },
  formActions: { flexDirection: "row", gap: 8 },
  self: { alignSelf: "flex-start" },
});
