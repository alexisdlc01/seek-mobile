import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { ErrorState, LoadingState } from "@/components/seek/states";
import {
  Avatar,
  Badge,
  Card,
  Divider,
  ListRow,
  ProgressBar,
  SeekButton,
  SeekScreen,
  SectionTitle,
} from "@/components/seek/ui";
import { ProfilePrimaryButton, ProfileTextField } from "@/components/custom/profile-screen";
import { resolveAdviceLink } from "@/components/seek/advice-card";
import { VerifiedStudentBadge } from "@/components/custom/student-verification";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { aiControllerAdvice } from "@/src/api/seek-api/ai";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { useConnectorsControllerOverview } from "@/src/api/seek-api/connectors";
import {
  RequestReferenceDtoType,
  type AddDocumentDtoDocumentType,
  type PassportItemDto,
} from "@/src/api/seek-api/model";
import {
  getUsersControllerDocumentTypesQueryKey,
  getUsersControllerGetPassportQueryKey,
  getUsersControllerListSharesQueryKey,
  useUsersControllerAddDocument,
  useUsersControllerGetPassport,
  useUsersControllerListShares,
  useUsersControllerRequestReference,
  useUsersControllerRevokeShare,
} from "@/src/api/seek-api/users";
import { useAuth } from "@/src/store/auth-store";
import { formatDate, initialsOf } from "@/src/utils/seek-format";
import { errorMessage } from "@/src/utils/tenancy-view";
import { uploadFile } from "@/src/utils/upload-file";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import {
  BookmarkIcon,
  GraduationCapIcon,
  IdCardIcon,
  MailIcon,
  SettingsIcon,
  SparklesIcon,
  UserRoundIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react-native";
import React, { useState, type ReactElement } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BadgeTone = "success" | "warning" | "danger" | "neutral";

function sectionIcon(key: string, color: string): ReactElement {
  switch (key) {
    case "studies":
      return <GraduationCapIcon color={color} size={20} />;
    case "money":
      return <WalletIcon color={color} size={20} />;
    case "references":
      return <UsersIcon color={color} size={20} />;
    default:
      return <IdCardIcon color={color} size={20} />;
  }
}

/** Short guarantor guidance under the guarantor row (POST /ai/advice, topic guarantor). */
function GuarantorTip() {
  const colors = useSeekTheme();
  const router = useRouter();
  const query = useQuery({
    queryKey: ["ai-advice", "guarantor"],
    queryFn: () => aiControllerAdvice({ topic: "guarantor" }),
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
  if (query.isError) return null;
  const links = (query.data?.actions ?? []).flatMap((action) => {
    const target = resolveAdviceLink(action.link);
    return target ? [{ ...action, target }] : [];
  });
  return (
    <View style={[styles.tip, { backgroundColor: colors.tint }]}>
      <View style={styles.tipHead}>
        <SparklesIcon color={colors.onTint} size={14} />
        <Text style={[styles.tipTitle, { color: colors.onTint }]}>
          {query.data?.title ?? "Seek AI"}
        </Text>
      </View>
      <Text style={[styles.tipBody, { color: colors.onTint }]}>
        {query.isLoading ? "Checking what your saved homes ask for…" : query.data?.advice}
      </Text>
      {links.length > 0 ? (
        <View style={styles.tipActions}>
          {links.map((action) => (
            <SeekButton
              key={action.link}
              label={action.label}
              variant="secondary"
              compact
              onPress={() =>
                action.target.kind === "web"
                  ? void WebBrowser.openBrowserAsync(action.target.url)
                  : router.push(action.target.href)
              }
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function statusBadge(item: PassportItemDto): { label: string; tone: BadgeTone } {
  switch (item.status) {
    case "VERIFIED":
      return { label: "Verified", tone: "success" };
    case "PENDING":
      return { label: "Pending", tone: "warning" };
    case "EXPIRED":
      return { label: "Expired", tone: "danger" };
    case "REJECTED":
      return { label: "Rejected", tone: "danger" };
    default:
      return item.required
        ? { label: "Missing", tone: "danger" }
        : { label: "Add", tone: "neutral" };
  }
}

function itemDetail(item: PassportItemDto): string | undefined {
  if (item.source === "university email") return `${item.detail ?? "University email"} confirmed`;
  if (item.status === "VERIFIED" && item.expiresAt) {
    return `Valid until ${formatDate(item.expiresAt)}`;
  }
  if (item.status === "EXPIRED" && item.expiresAt) {
    return `Expired ${formatDate(item.expiresAt)}`;
  }
  if (item.status === "PENDING" && item.source === "request") {
    return item.type === "GUARANTOR_AGREEMENT" ? "Invite sent · Pending" : "Requested · Pending";
  }
  if (item.status === "PENDING") return "Waiting for verification";
  if (item.status === "REJECTED") return "Upload a clearer copy";
  if (item.status === "MISSING") return item.required ? "Required to apply" : "Optional";
  return undefined;
}

export default function PassportScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your Seek Passport"
      description="Keep your documents in one place and apply to homes in one tap."
    >
      <Profile />
    </AuthRequiredScreen>
  );
}

function Profile() {
  const colors = useSeekTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const accessToken = useAuth((state) => state.accessToken);
  const { data: user } = useAuthControllerCurrentUser();
  const passport = useUsersControllerGetPassport();
  const shares = useUsersControllerListShares();
  const connectors = useConnectorsControllerOverview();
  const addDocument = useUsersControllerAddDocument();
  const revokeShare = useUsersControllerRevokeShare();
  const requestReference = useUsersControllerRequestReference();
  const [asking, setAsking] = useState<RequestReferenceDtoType | null>(null);
  const [refName, setRefName] = useState("");
  const [refEmail, setRefEmail] = useState("");
  const [uploading, setUploading] = useState<AddDocumentDtoDocumentType | null>(null);
  const [picking, setPicking] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);

  const upload = async (item: PassportItemDto) => {
    if (!user || uploading) return;
    setNotice(null);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.canceled) return;
      const asset = result.assets[0];
      setUploading(item.type);
      const uploaded = await uploadFile({
        uri: asset.uri,
        mimeType: asset.mimeType ?? "application/pdf",
        name: `${user._id}-${item.type}`,
        folder: "private",
        access_token: accessToken,
      });
      await addDocument.mutateAsync({
        data: { documentType: item.type, url: uploaded.fileUrl, key: uploaded.key },
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getUsersControllerGetPassportQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getUsersControllerDocumentTypesQueryKey() }),
      ]);
      setPicking(false);
      setNotice({ text: `${item.label} uploaded.` });
    } catch (error) {
      setNotice({ text: errorMessage(error, "We couldn't upload that file. Please try again."), error: true });
    } finally {
      setUploading(null);
    }
  };

  // Seek emails the referee; the reply is filed through the connected inbox.
  const sendRequest = (type: RequestReferenceDtoType) => {
    setNotice(null);
    setFormError(null);
    requestReference.mutate(
      { data: { type, name: refName.trim(), email: refEmail.trim() } },
      {
        onSuccess() {
          void queryClient.invalidateQueries({ queryKey: getUsersControllerGetPassportQueryKey() });
          setAsking(null);
          setRefName("");
          setRefEmail("");
          setNotice({ text: "Sent. Their reply will be filed to your passport." });
        },
        onError(error) {
          setFormError(errorMessage(error, "We couldn't send that. Please try again."));
        },
      },
    );
  };

  const stopSharing = (id: string) => {
    setNotice(null);
    revokeShare.mutate(
      { id },
      {
        onSuccess() {
          void queryClient.invalidateQueries({ queryKey: getUsersControllerListSharesQueryKey() });
          setNotice({ text: "Sharing stopped. The landlord can no longer open your documents." });
        },
        onError(error) {
          setNotice({ text: errorMessage(error, "We couldn't stop sharing. Please try again."), error: true });
        },
      },
    );
  };

  const data = passport.data;
  const allItems = data?.sections.flatMap((section) => section.items) ?? [];
  const activeShares = (shares.data ?? []).filter((share) => share.active);
  const connected = (connectors.data?.connections ?? []).filter((c) => c.status === "CONNECTED");

  return (
    <SeekScreen
      title="Profile"
      headerRight={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Account and settings"
          onPress={() => router.push("/(app)/profile")}
          hitSlop={8}
        >
          <SettingsIcon color={colors.text} size={22} />
        </Pressable>
      }
    >
      <Card tone="hero">
        <View style={styles.heroTop}>
          <Avatar initials={initialsOf(user?.name)} size={52} tone="alt" />
          <View style={styles.flex}>
            <Text style={[styles.heroName, { color: colors.onHero }]}>{user?.name ?? "Your profile"}</Text>
            {user?.studentVerified ? (
              <VerifiedStudentBadge university={user.university} />
            ) : user?.universityDetails ? (
              <Text style={[styles.heroSub, { color: colors.heroMuted }]}>{user.universityDetails}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.heroRow}>
          <Text style={[styles.heroLabel, { color: colors.onHero }]}>Seek Passport</Text>
          <Text style={[styles.heroLabel, { color: colors.onHero }]}>
            {data ? `${data.completed} of ${data.total} ready` : "Loading…"}
          </Text>
        </View>
        <ProgressBar value={data ? data.percent / 100 : 0} />
        <Text style={[styles.heroSub, { color: colors.heroMuted }]}>
          {!data
            ? " "
            : data.ready
              ? "You can already apply in one tap."
              : `Add ${data.missingRequired.length} more required ${data.missingRequired.length === 1 ? "item" : "items"} to apply in one tap.`}
        </Text>
      </Card>

      {notice ? (
        <Text
          accessibilityRole="alert"
          style={[styles.notice, { color: notice.error ? colors.danger : colors.success }]}
        >
          {notice.text}
        </Text>
      ) : null}

      {passport.isLoading ? (
        <LoadingState label="Loading your passport…" />
      ) : passport.isError || !data ? (
        <ErrorState
          error={passport.error}
          onRetry={() => void passport.refetch()}
          title="Couldn't load your passport"
        />
      ) : (
        data.sections.map((section) => (
          <View key={section.key} style={styles.section}>
            <SectionTitle>{section.label}</SectionTitle>
            <Card style={styles.list}>
              {section.items.map((item, index) => {
                const badge = uploading === item.type
                  ? { label: "Uploading…", tone: "neutral" as BadgeTone }
                  : statusBadge(item);
                const needsUpload = item.status !== "VERIFIED" && item.status !== "PENDING";
                const requestable = (Object.values(RequestReferenceDtoType) as string[]).includes(item.type)
                  ? (item.type as RequestReferenceDtoType)
                  : null;
                const canAsk = requestable && item.status === "MISSING";
                return (
                  <View key={item.type}>
                    {index > 0 ? <Divider /> : null}
                    <ListRow
                      icon={sectionIcon(section.key, colors.accent)}
                      title={item.label}
                      subtitle={itemDetail(item)}
                      right={
                        canAsk ? (
                          <SeekButton
                            label={requestable === "GUARANTOR_AGREEMENT" ? "Invite" : "Request"}
                            variant="tint"
                            compact
                            onPress={() => {
                              setFormError(null);
                              setAsking(asking === requestable ? null : requestable);
                            }}
                          />
                        ) : (
                          <Badge label={badge.label} tone={badge.tone} />
                        )
                      }
                      onPress={
                        item.type === "STUDENT_STATUS" && !user?.studentVerified && needsUpload
                          ? () => router.push("/(app)/profile")
                          : needsUpload
                            ? () => void upload(item)
                            : undefined
                      }
                    />
                    {canAsk && asking === requestable ? (
                      <View style={styles.askForm}>
                        <ProfileTextField label="Their name" value={refName} onChangeText={setRefName} autoCapitalize="words" />
                        <ProfileTextField
                          label="Their email"
                          value={refEmail}
                          onChangeText={setRefEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                        {formError ? (
                          <Text accessibilityRole="alert" style={[styles.notice, { color: colors.danger }]}>
                            {formError}
                          </Text>
                        ) : null}
                        <ProfilePrimaryButton
                          title="Send"
                          onPress={() => sendRequest(requestable)}
                          disabled={!refName.trim() || !refEmail.trim()}
                          loading={requestReference.isPending}
                        />
                      </View>
                    ) : null}
                    {item.type === "GUARANTOR_AGREEMENT" &&
                    (item.status === "PENDING" || item.status === "MISSING") ? (
                      <GuarantorTip />
                    ) : null}
                  </View>
                );
              })}
            </Card>
          </View>
        ))
      )}

      <View style={styles.section}>
        <SectionTitle hint="Documents are shared for 14 days">Who can see this</SectionTitle>
        {shares.isLoading ? (
          <LoadingState label="Loading shares…" />
        ) : shares.isError ? (
          <ErrorState error={shares.error} onRetry={() => void shares.refetch()} title="Couldn't load shares" />
        ) : activeShares.length === 0 ? (
          <Card>
            <Text style={[styles.empty, { color: colors.mutedText }]}>
              Nobody can see your documents right now. They are shared for 14 days when you send an application.
            </Text>
          </Card>
        ) : (
          <Card style={styles.list}>
            {activeShares.map((share, index) => {
              const who = share.viewer.companyName ?? share.viewer.name ?? "A landlord";
              const place = share.listing?.propertyTitle ?? share.listing?.streetAddress;
              return (
                <View key={share._id}>
                  {index > 0 ? <Divider /> : null}
                  <ListRow
                    icon={<UserRoundIcon color={colors.accent} size={20} />}
                    title={place ? `${place} · ${who}` : who}
                    subtitle={`Until ${formatDate(share.expiresAt)}`}
                    right={
                      <SeekButton
                        label="Stop sharing"
                        compact
                        variant="secondary"
                        disabled={revokeShare.isPending}
                        onPress={() => stopSharing(share._id)}
                      />
                    }
                  />
                </View>
              );
            })}
          </Card>
        )}
      </View>

      <Card style={styles.list}>
        <ListRow
          icon={<MailIcon color={colors.accent} size={20} />}
          title={connected.length > 0 ? "Email connected" : "Connect your email"}
          subtitle={connected.length > 0 ? connected.map((c) => c.emailAddress).join(", ") : "Bring housing emails into Seek"}
          chevron
          onPress={() => router.push("/(app)/connected-email")}
        />
        <Divider />
        <ListRow
          icon={<BookmarkIcon color={colors.accent} size={20} />}
          title="Saved listings"
          chevron
          onPress={() => router.push("/(app)/(tabs)/saved-listings")}
        />
        <Divider />
        <ListRow
          icon={<SettingsIcon color={colors.accent} size={20} />}
          title="Account and settings"
          chevron
          onPress={() => router.push("/(app)/profile")}
        />
      </Card>

      {picking ? (
        <View style={styles.section}>
          <SectionTitle hint="PDF or photo">Choose a document</SectionTitle>
          <Card style={styles.list}>
            {allItems.map((item, index) => (
              <View key={item.type}>
                {index > 0 ? <Divider /> : null}
                <ListRow
                  title={item.label}
                  subtitle={item.status === "MISSING" ? "Not added yet" : "Replace with a new file"}
                  chevron
                  onPress={() => void upload(item)}
                />
              </View>
            ))}
          </Card>
        </View>
      ) : null}
      <SeekButton
        label={picking ? "Cancel" : "+ Add a document"}
        variant="secondary"
        onPress={() => setPicking((value) => !value)}
        style={[styles.add, { borderColor: colors.lineStrong }]}
      />
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  askForm: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  flex: { flex: 1 },
  heroTop: { flexDirection: "row", alignItems: "center", gap: 12 },
  heroName: { fontSize: 19, fontWeight: "700" },
  heroSub: { fontSize: 13, lineHeight: 18 },
  heroRow: { flexDirection: "row", justifyContent: "space-between" },
  heroLabel: { fontSize: 13, fontWeight: "700" },
  section: { gap: 8 },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  add: { borderStyle: "dashed" },
  notice: { fontSize: 13, lineHeight: 18 },
  empty: { fontSize: 13.5, lineHeight: 19 },
  tip: { marginHorizontal: 14, marginBottom: 12, padding: 12, borderRadius: 12, gap: 6 },
  tipHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  tipTitle: { fontSize: 13, fontWeight: "700" },
  tipBody: { fontSize: 12.5, lineHeight: 18 },
  tipActions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
