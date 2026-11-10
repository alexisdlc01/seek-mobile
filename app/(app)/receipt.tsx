import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { ErrorState, LoadingState, EmptyState } from "@/components/seek/states";
import { Card, Divider, ListRow, SeekScreen } from "@/components/seek/ui";
import { usePaymentsControllerMine } from "@/src/api/seek-api/payments";
import { formatDate, formatPence } from "@/src/utils/seek-format";
import type { TenancyView } from "@/src/utils/tenancy-view";
import { tenancyTitle } from "@/src/utils/tenancy-view";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { KIND_LABEL } from "./receipts";

export default function ReceiptScreen() {
  return (
    <AuthRequiredScreen title="Sign in to see your receipt" description="Your receipts live in your account.">
      <Receipt />
    </AuthRequiredScreen>
  );
}

function Receipt() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useSeekTheme();
  const payments = usePaymentsControllerMine();
  const payment = payments.data?.find((item) => item._id === id);
  // The API populates `tenancy` (with its listing) although the generated type says string.
  const tenancy = payment?.tenancy as unknown as TenancyView | null | undefined;
  const rows: [string, string][] = payment
    ? [
        ["Paid on", formatDate(payment.paidAt ?? payment.dueDate)],
        ["For", `${KIND_LABEL[payment.kind] ?? payment.kind} due ${formatDate(payment.dueDate)}`],
        ...(payment.holdingDepositCredit
          ? ([["Holding deposit credited", formatPence(payment.holdingDepositCredit)]] as [string, string][])
          : []),
        ...(tenancy?.listing ? ([["Property", tenancyTitle(tenancy)]] as [string, string][]) : []),
        ["Reference", payment._id],
      ]
    : [];

  return (
    <SeekScreen title="Receipt" back fallbackHref="/(app)/receipts">
      {payments.isLoading ? (
        <LoadingState label="Loading your receipt…" />
      ) : payments.isError ? (
        <ErrorState error={payments.error} onRetry={() => payments.refetch()} />
      ) : !payment ? (
        <EmptyState title="Receipt not found" />
      ) : (
        <Card>
          <Text style={{ color: colors.text, fontSize: 32, fontWeight: "700", marginBottom: 8 }}>
            {formatPence(payment.amount)}
          </Text>
          {rows.map(([label, value]) => (
            <View key={label}>
              <Divider />
              <ListRow title={label} subtitle={value} />
            </View>
          ))}
        </Card>
      )}
    </SeekScreen>
  );
}
