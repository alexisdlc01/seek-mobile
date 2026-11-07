import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { AdviceCard } from "@/components/seek/advice-card";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, SeekButton, SeekScreen } from "@/components/seek/ui";
import { invalidateHomeQueries, useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import {
  getContractsControllerForTenancyQueryKey,
  useContractsControllerForTenancy,
  useContractsControllerSign,
} from "@/src/api/seek-api/contracts";
import type { Contract } from "@/src/api/seek-api/model";
import { formatDate } from "@/src/utils/seek-format";
import { errorMessage, openStoredFile, tenancyTitle, type TenancyView } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ContractScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your contract"
      description="Your tenancy agreement and its signatures live in your account."
    >
      <ContractGate />
    </AuthRequiredScreen>
  );
}

function ContractGate() {
  const router = useRouter();
  const query = useActiveTenancy();
  const shell = { title: "Contract", back: true, fallbackHref: "/(app)/(tabs)/my-home" } as const;

  if (query.isLoading) {
    return (
      <SeekScreen {...shell}>
        <LoadingState label="Loading your contract…" />
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
  if (!query.tenancy) {
    return (
      <SeekScreen {...shell}>
        <EmptyState
          title="No tenancy yet"
          body="Your contract appears here once your landlord has set up your tenancy."
          actionLabel="Back to My home"
          onAction={() => router.navigate("/(app)/(tabs)/my-home")}
        />
      </SeekScreen>
    );
  }
  return <ContractContent tenancy={query.tenancy} />;
}

function ContractContent({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const router = useRouter();
  const contracts = useContractsControllerForTenancy(tenancy._id, { query: { retry: 1 } });
  const shell = {
    title: "Contract",
    subtitle: tenancyTitle(tenancy),
    back: true,
    fallbackHref: "/(app)/(tabs)/my-home",
  } as const;

  // A draft is still the landlord's to finish.
  const visible = (contracts.data ?? []).filter((contract) => contract.status !== "DRAFT");

  return (
    <SeekScreen {...shell}>
      {contracts.isLoading ? (
        <LoadingState label="Loading your contract…" />
      ) : contracts.isError ? (
        <ErrorState error={contracts.error} onRetry={() => contracts.refetch()} title="Couldn't load your contract" />
      ) : visible.length === 0 ? (
        <EmptyState
          title="Nothing to sign yet"
          body="When your landlord sends your tenancy agreement, it shows up here and in your Inbox. Your other tenancy documents are in Documents."
          actionLabel="Open documents"
          onAction={() => router.push("/(app)/documents")}
        />
      ) : (
        visible.map((contract) => (
          <ContractCard key={contract._id} contract={contract} tenancy={tenancy} />
        ))
      )}

      {tenancy.listing?.nation === "ENGLAND" ? (
        <Card tone="tint">
          <Text style={[styles.noteTitle, { color: colors.onTint }]}>Before you sign</Text>
          <Text style={[styles.noteBody, { color: colors.onTint }]}>
            In England a landlord can ask for no more than one month&apos;s rent in advance, a deposit of no more than
            5 weeks&apos; rent, and a holding deposit of no more than 1 week&apos;s rent. The deposit must be protected
            within 30 days.
          </Text>
        </Card>
      ) : null}

      <AdviceCard topic="contract" tenancyId={tenancy._id} heading="Seek AI · your contract" />
    </SeekScreen>
  );
}

function ContractCard({ contract, tenancy }: { contract: Contract; tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const { data: user } = useAuthControllerCurrentUser();
  const { mutate: sign, isPending } = useContractsControllerSign();
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const total = Math.max(1, tenancy.tenants.length);
  const signedBy = new Set(contract.signatures.map((signature) => signature.user));
  const iSigned = user ? signedBy.has(user._id) : false;
  const signed = contract.status === "SIGNED";

  const onRead = async () => {
    setMessage(null);
    try {
      // Uploaded contracts sit in the private bucket and need a signed link; Seek ones carry a signed url.
      await openStoredFile(contract);
    } catch (error) {
      setMessage({ text: errorMessage(error, "We couldn't open this contract right now. Please try again."), error: true });
    }
  };

  const onSign = () => {
    setMessage(null);
    sign(
      { id: contract._id },
      {
        onSuccess() {
          setConfirming(false);
          setMessage({ text: "Signed. The landlord is told once everyone has signed." });
          void queryClient.invalidateQueries({
            queryKey: getContractsControllerForTenancyQueryKey(tenancy._id),
          });
          void invalidateHomeQueries(queryClient);
        },
        onError(error) {
          setMessage({ text: errorMessage(error, "We couldn't sign this contract. Please try again."), error: true });
        },
      },
    );
  };

  return (
    <Card style={styles.card}>
      <View style={styles.head}>
        <Text style={[styles.title, { color: colors.text }]}>{contract.title}</Text>
        <Badge
          label={signed ? "Signed" : iSigned ? "Waiting for housemates" : "Ready to sign"}
          tone={signed ? "success" : iSigned ? "neutral" : "warning"}
        />
      </View>
      <Text style={[styles.meta, { color: colors.mutedText }]}>
        {signed
          ? `Everyone signed on ${formatDate(contract.signedAt)}.`
          : `${signedBy.size} of ${total} tenants have signed${contract.sentAt ? ` · sent ${formatDate(contract.sentAt)}` : ""}.`}
      </Text>

      {message ? (
        <Text
          accessibilityRole="alert"
          style={[styles.meta, { color: message.error ? colors.danger : colors.success }]}
        >
          {message.text}
        </Text>
      ) : null}

      {contract.inventory && contract.inventory.items.length > 0 ? (
        <View style={styles.confirm}>
          <Text style={[styles.title, { color: colors.text, fontSize: 14 }]}>
            Check-in inventory · {formatDate(contract.inventory.recordedAt)}
          </Text>
          {contract.inventory.items.map((item, index) => (
            <Text key={`${item.room}-${item.item}-${index}`} style={[styles.meta, { color: colors.mutedText }]}>
              {item.room} · {item.item}: {item.condition}
            </Text>
          ))}
          <Text style={[styles.meta, { color: colors.mutedText }]}>
            Check it against the home and tell your landlord about anything missing.
          </Text>
        </View>
      ) : null}

      {confirming ? (
        <View style={styles.confirm}>
          <Text style={[styles.meta, { color: colors.text }]}>
            Signing is your agreement to the terms in this document. Read it first.
          </Text>
          <View style={styles.actions}>
            <SeekButton
              label={isPending ? "Signing…" : "Confirm and sign"}
              compact
              disabled={isPending}
              onPress={onSign}
            />
            <SeekButton label="Cancel" compact variant="secondary" onPress={() => setConfirming(false)} />
          </View>
        </View>
      ) : (
        <View style={styles.actions}>
          <SeekButton
            label="Read contract"
            compact
            variant="secondary"
            onPress={() => void onRead()}
          />
          {contract.prescribedInformationUrl ? (
            <SeekButton
              label="Deposit information"
              compact
              variant="secondary"
              onPress={() => void WebBrowser.openBrowserAsync(contract.prescribedInformationUrl ?? "")}
            />
          ) : null}
          {contract.status === "SENT" && !iSigned ? (
            <SeekButton label="Sign contract" compact onPress={() => setConfirming(true)} />
          ) : null}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10 },
  head: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  title: { flex: 1, fontSize: 16, fontWeight: "700" },
  meta: { fontSize: 13.5, lineHeight: 19 },
  confirm: { gap: 10 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  noteTitle: { fontSize: 14.5, fontWeight: "700" },
  noteBody: { fontSize: 13, lineHeight: 19 },
});
