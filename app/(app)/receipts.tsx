import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, Divider, ListRow, SeekScreen } from "@/components/seek/ui";
import { usePaymentsControllerMine } from "@/src/api/seek-api/payments";
import { formatDate, formatPence } from "@/src/utils/seek-format";
import { useRouter } from "expo-router";
import { ReceiptIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export const KIND_LABEL: Record<string, string> = { RENT: "Rent", HOLDING_DEPOSIT: "Holding deposit" };

export default function ReceiptsScreen() {
  return (
    <AuthRequiredScreen title="Sign in to see your receipts" description="Your receipts live in your account.">
      <Receipts />
    </AuthRequiredScreen>
  );
}

function Receipts() {
  const router = useRouter();
  const query = usePaymentsControllerMine();
  // All tenancies on purpose: the Rent tab only shows the active one.
  const paid = (query.data ?? [])
    .filter((item) => item.status === "PAID")
    .sort((a, b) => (b.paidAt ?? b.dueDate).localeCompare(a.paidAt ?? a.dueDate));

  return (
    <SeekScreen title="Receipts" back fallbackHref="/(app)/(tabs)/my-home">
      {query.isLoading ? (
        <LoadingState label="Loading your receipts…" />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : paid.length === 0 ? (
        <EmptyState title="No receipts yet" body="Paid payments will appear here." />
      ) : (
        <Card>
          {paid.map((item, index) => (
            <View key={item._id}>
              {index > 0 ? <Divider /> : null}
              <ListRow
                icon={<ReceiptIcon size={20} color="#888" />}
                title={`${KIND_LABEL[item.kind] ?? item.kind} · ${formatPence(item.amount)}`}
                subtitle={`Paid ${formatDate(item.paidAt ?? item.dueDate)}`}
                right={<Badge label="Paid" tone="success" />}
                chevron
                onPress={() => router.push({ pathname: "/(app)/receipt", params: { id: item._id } })}
              />
            </View>
          ))}
        </Card>
      )}
    </SeekScreen>
  );
}
