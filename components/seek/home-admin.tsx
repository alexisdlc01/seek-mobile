import { Badge, Card, SectionTitle, SeekButton } from "@/components/seek/ui";
import { invalidateHomeQueries } from "@/hooks/use-active-tenancy";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import type { AddTenancyDocumentDtoType } from "@/src/api/seek-api/model";
import { useTenanciesControllerAddDocument } from "@/src/api/seek-api/tenancies";
import { useAuth } from "@/src/store/auth-store";
import { formatDate } from "@/src/utils/seek-format";
import { errorMessage, type TenancyView } from "@/src/utils/tenancy-view";
import { uploadFile } from "@/src/utils/upload-file";
import { useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CHECK_IN = "Check-in photo";
const INSURANCE = "Contents insurance";

type Kind = "photos" | "insurance" | "councilTax";

/**
 * Move-in admin on My home: check-in photos (kept as tenancy documents so a
 * deposit dispute has evidence), contents insurance and the council tax
 * exemption. Everything is filed on the tenancy with the existing document
 * endpoint; nothing here is sent to a third party.
 */
/** `only` shows a single card (used by Bills to file a certificate or policy in place). */
export function HomeAdmin({ tenancy, only }: { tenancy: TenancyView; only?: Exclude<Kind, "photos"> }) {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const accessToken = useAuth((state) => state.accessToken);
  const { data: user } = useAuthControllerCurrentUser();
  const addDocument = useTenanciesControllerAddDocument();
  const [busy, setBusy] = useState<Kind | null>(null);
  const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);

  const docs = tenancy.documents ?? [];
  const photos = docs.filter((doc) => doc.type === "INVENTORY" && doc.title.startsWith(CHECK_IN));
  const insurance = docs.find((doc) => doc.title.startsWith(INSURANCE));
  const councilTax = docs.find((doc) => doc.type === "COUNCIL_TAX_EXEMPTION");

  const add = async (kind: Kind) => {
    if (!user || busy) return;
    setNotice(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: kind === "photos" ? ["image/*"] : ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
        multiple: kind === "photos",
      });
      if (result.canceled) return;
      setBusy(kind);
      const type: AddTenancyDocumentDtoType =
        kind === "photos" ? "INVENTORY" : kind === "councilTax" ? "COUNCIL_TAX_EXEMPTION" : "OTHER";
      const title = kind === "photos" ? CHECK_IN : kind === "insurance" ? INSURANCE : "Council tax exemption";
      for (const [index, asset] of result.assets.entries()) {
        const uploaded = await uploadFile({
          uri: asset.uri,
          mimeType: asset.mimeType ?? "application/pdf",
          name: `${tenancy._id}-${type}-${Date.now()}-${index}`,
          folder: "private",
          access_token: accessToken,
        });
        await addDocument.mutateAsync({
          id: tenancy._id,
          data: {
            type,
            title: kind === "photos" ? `${CHECK_IN} ${photos.length + index + 1}` : title,
            url: uploaded.fileUrl,
            key: uploaded.key,
            source: "UPLOAD",
          },
        });
      }
      await invalidateHomeQueries(queryClient);
      setNotice({ text: kind === "photos" ? "Photos saved to your tenancy." : "Saved to your tenancy documents." });
    } catch (error) {
      setNotice({ text: errorMessage(error, "We couldn't upload that file. Please try again."), error: true });
    } finally {
      setBusy(null);
    }
  };

  const action = (kind: Kind, label: string) => (
    <SeekButton
      label={busy === kind ? "Uploading…" : label}
      compact
      variant="tint"
      disabled={busy !== null}
      onPress={() => void add(kind)}
      style={styles.self}
    />
  );

  return (
    <View style={styles.section}>
      {only ? null : <SectionTitle>Move-in checklist</SectionTitle>}
      {notice ? (
        <Text
          accessibilityRole="alert"
          style={[styles.body, { color: notice.error ? colors.danger : colors.success }]}
        >
          {notice.text}
        </Text>
      ) : null}

      {only ? null : (
      <Card style={styles.card}>
        <View style={styles.head}>
          <Text style={[styles.title, { color: colors.text }]}>Check-in photos</Text>
          <Badge label={photos.length > 0 ? `${photos.length} saved` : "None yet"} tone={photos.length > 0 ? "success" : "neutral"} />
        </View>
        <Text style={[styles.body, { color: colors.mutedText }]}>
          Photograph every room and any damage in your first days. Dated photos are your best evidence if the landlord
          later tries to take money from your deposit.
        </Text>
        {action("photos", photos.length > 0 ? "Add more photos" : "Add photos")}
      </Card>
      )}

      {only && only !== "insurance" ? null : (
      <Card style={styles.card}>
        <View style={styles.head}>
          <Text style={[styles.title, { color: colors.text }]}>Contents insurance</Text>
          <Badge label={insurance ? "On file" : "Not added"} tone={insurance ? "success" : "warning"} />
        </View>
        <Text style={[styles.body, { color: colors.mutedText }]}>
          {insurance
            ? `Policy added ${formatDate(insurance.addedAt)}.`
            : "Your landlord's insurance covers the building, not your belongings. Keep your own policy document here so your housemates and you can find it when you need to claim."}
        </Text>
        {action("insurance", insurance ? "Replace policy" : "Add policy")}
      </Card>
      )}

      {only && only !== "councilTax" ? null : (
      <Card style={styles.card}>
        <View style={styles.head}>
          <Text style={[styles.title, { color: colors.text }]}>Council tax</Text>
          <Badge label={councilTax ? "Certificate on file" : "Check exemption"} tone={councilTax ? "success" : "info"} />
        </View>
        <Text style={[styles.body, { color: colors.mutedText }]}>
          {councilTax
            ? `Exemption certificate added ${formatDate(councilTax.addedAt)}. Send it to your council if they ask.`
            : "A house where every tenant is a full-time student is usually exempt from council tax. Get a certificate from your university, add it here and send it to your council."}
        </Text>
        {action("councilTax", councilTax ? "Replace certificate" : "Add certificate")}
      </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  card: { gap: 10 },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  title: { flex: 1, fontSize: 15, fontWeight: "700" },
  body: { fontSize: 13.5, lineHeight: 20 },
  self: { alignSelf: "flex-start" },
});
