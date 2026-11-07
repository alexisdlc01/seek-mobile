import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { AdviceCard } from "@/components/seek/advice-card";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, Divider, ListRow, SectionTitle, SeekButton, SeekScreen } from "@/components/seek/ui";
import { useActiveTenancy } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import type { TenancyDocument } from "@/src/api/seek-api/model";
import { formatDate } from "@/src/utils/seek-format";
import { errorMessage, openStoredFile, tenancyTitle, type TenancyView } from "@/src/utils/tenancy-view";
import { useRouter } from "expo-router";
import { FileTextIcon } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TYPE_LABEL: Record<string, string> = {
  TENANCY_AGREEMENT: "Tenancy agreement",
  DEPOSIT_CERTIFICATE: "Deposit certificate",
  GAS_SAFETY: "Gas safety certificate",
  EPC: "Energy performance certificate",
  EICR: "Electrical safety report",
  INVENTORY: "Inventory",
  COUNCIL_TAX_EXEMPTION: "Council tax exemption",
  HOW_TO_RENT: "How to Rent guide",
  OTHER: "Document",
};

export default function DocumentsScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your documents"
      description="Your contract and tenancy documents live in your account."
    >
      <Documents />
    </AuthRequiredScreen>
  );
}

function Documents() {
  const router = useRouter();
  const query = useActiveTenancy();
  const tenancy = query.tenancy;
  const shell = { title: "Contract & documents", back: true, fallbackHref: "/(app)/(tabs)/my-home" } as const;

  if (query.isLoading) {
    return (
      <SeekScreen {...shell}>
        <LoadingState label="Loading your documents…" />
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
          body="Your contract and documents appear here once your landlord has set up your tenancy."
          actionLabel="Back to My home"
          onAction={() => router.navigate("/(app)/(tabs)/my-home")}
        />
      </SeekScreen>
    );
  }
  return <DocumentsContent tenancy={tenancy} />;
}

function DocumentsContent({ tenancy }: { tenancy: TenancyView }) {
  const colors = useSeekTheme();
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const documents = [...(tenancy.documents ?? [])].sort((a, b) => {
    if (a.type === "TENANCY_AGREEMENT" && b.type !== "TENANCY_AGREEMENT") return -1;
    if (b.type === "TENANCY_AGREEMENT" && a.type !== "TENANCY_AGREEMENT") return 1;
    return b.addedAt.localeCompare(a.addedAt);
  });

  const open = async (doc: TenancyDocument) => {
    setMessage(null);
    setOpeningId(doc._id);
    try {
      // Stored files go through the signed access URL; a plain web link opens as is.
      await openStoredFile(doc);
    } catch (error) {
      setMessage(
        errorMessage(error, "We couldn't open this document right now. Please try again, or ask your landlord to send it."),
      );
    } finally {
      setOpeningId(null);
    }
  };

  return (
    <SeekScreen
      title="Contract & documents"
      subtitle={tenancyTitle(tenancy)}
      back
      fallbackHref="/(app)/(tabs)/my-home"
    >
      {message ? (
        <Card style={{ backgroundColor: colors.dangerBg, borderColor: "transparent" }}>
          <Text accessibilityRole="alert" style={[styles.notice, { color: colors.danger }]}>
            {message}
          </Text>
        </Card>
      ) : null}

      <View style={styles.section}>
        <SectionTitle hint={documents.length > 0 ? String(documents.length) : undefined}>Your documents</SectionTitle>
        {documents.length === 0 ? (
          <Card>
            <Text style={[styles.note, { color: colors.mutedText }]}>
              No documents yet. Your landlord adds your contract, deposit certificate and safety certificates here.
            </Text>
          </Card>
        ) : (
          <Card style={styles.list}>
            {documents.map((doc, index) => (
              <View key={doc._id}>
                {index > 0 ? <Divider /> : null}
                <ListRow
                  icon={<FileTextIcon color={colors.accent} size={20} />}
                  title={doc.title || TYPE_LABEL[doc.type] || "Document"}
                  subtitle={`${TYPE_LABEL[doc.type] ?? "Document"} · added ${formatDate(doc.addedAt)}`}
                  right={
                    <View style={styles.actions}>
                      {doc.source === "SEEK" ? <Badge label="Seek" tone="info" /> : null}
                      <SeekButton
                        label={openingId === doc._id ? "Opening…" : "Open"}
                        variant="tint"
                        compact
                        onPress={openingId ? undefined : () => open(doc)}
                      />
                    </View>
                  }
                />
              </View>
            ))}
          </Card>
        )}
      </View>

      <AdviceCard topic="contract" tenancyId={tenancy._id} heading="Seek AI · your contract in plain English" />
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  actions: { flexDirection: "row", alignItems: "center", gap: 6 },
  note: { fontSize: 13.5, lineHeight: 20 },
  notice: { fontSize: 13, lineHeight: 19, fontWeight: "600" },
});
