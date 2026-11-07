import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { ErrorState, LoadingState } from "@/components/seek/states";
import {
  Badge,
  Card,
  Divider,
  ListRow,
  SeekButton,
  SeekScreen,
  SectionTitle,
} from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import {
  connectorsControllerAuthUrl,
  connectorsControllerConfirm,
  getConnectorsControllerOverviewQueryKey,
  useConnectorsControllerConnectDemo,
  useConnectorsControllerConnectImap,
  useConnectorsControllerDisconnect,
  useConnectorsControllerOverview,
  useConnectorsControllerSync,
  useConnectorsControllerUpdateSettings,
} from "@/src/api/seek-api/connectors";
import type {
  ConnectorSettingsDto,
  ConnectorsOverviewDto,
  EmailConnectionViewDto,
  ProviderAvailabilityDto,
  SyncResultDto,
} from "@/src/api/seek-api/model";
import { getInboxControllerThreadsQueryKey } from "@/src/api/seek-api/inbox";
import { useInboxPrefs } from "@/src/store/inbox-prefs-store";
import { formatDate, pluralise } from "@/src/utils/seek-format";
import { errorMessage } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { MailIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, Switch, Text, TextInput, View } from "react-native";

// The backend sends mobile OAuth back to this address (MOBILE_CONNECTORS_REDIRECT_URL).
const RETURN_URL = "seekapp://connectors";

export default function ConnectedEmailScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to connect your email"
      description="Bring landlord emails and housing documents into Seek."
    >
      <ConnectedEmail />
    </AuthRequiredScreen>
  );
}

const REASONS: Record<string, string> = {
  denied: "You didn't allow access to your mailbox.",
  missing_code: "The sign-in didn't finish. Please try again.",
  invalid_state: "That sign-in session expired. Please try again.",
  unavailable: "This email provider isn't available right now.",
  exchange_failed: "We couldn't finish connecting your mailbox. Please try again.",
};

/** Reads seekapp://connectors?status=connected|pending|error&reason=...&nonce=... sent back by the backend. */
function readOAuthReturn(url: string): { ok: boolean; nonce?: string; reason?: string } {
  const params = Linking.parse(url).queryParams ?? {};
  const first = (value: unknown) => (Array.isArray(value) ? value[0] : value);
  const status = first(params.status);
  const reason = first(params.reason);
  if (status === "connected") return { ok: true };
  // The backend holds the tokens until this signed-in user confirms the nonce.
  const nonce = first(params.nonce);
  if (status === "pending" && typeof nonce === "string") return { ok: true, nonce };
  return {
    ok: false,
    reason: typeof reason === "string" ? (REASONS[reason] ?? reason.replace(/_/g, " ")) : undefined,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  LANDLORD: "landlord",
  TENANT: "tenant",
  APPLICANT: "applicant",
  BILLS: "bills",
  DEPOSIT: "deposit",
  HOUSEHOLD: "household",
  UNIVERSITY: "university",
  OTHER: "other",
};
const categoryLabel = (category: string) => CATEGORY_LABELS[category] ?? category.toLowerCase();

function describe(connection: EmailConnectionViewDto): string {
  const parts = [
    connection.emailAddress,
    `${pluralise(connection.emailCount, "email")} from ${pluralise(connection.contactCount, "contact")}`,
    connection.lastSyncAt ? `synced ${formatDate(connection.lastSyncAt)}` : "not synced yet",
  ];
  return parts.join(" · ");
}

function ConnectedEmail() {
  const colors = useSeekTheme();
  const queryClient = useQueryClient();
  const overview = useConnectorsControllerOverview();
  const demo = useConnectorsControllerConnectDemo();
  const sync = useConnectorsControllerSync();
  const disconnect = useConnectorsControllerDisconnect();
  const connectImap = useConnectorsControllerConnectImap();
  const updateSettings = useConnectorsControllerUpdateSettings();
  const [imapOpen, setImapOpen] = useState(false);
  const [imap, setImap] = useState({ host: "", port: "993", username: "", appPassword: "" });
  const [busy, setBusy] = useState<string | null>(null);
  const hiddenCategories = useInboxPrefs((state) => state.hiddenEmailCategories);
  const toggleCategory = useInboxPrefs((state) => state.toggleEmailCategory);
  const [notice, setNotice] = useState<{ text: string; error?: boolean } | null>(null);

  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getConnectorsControllerOverviewQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getInboxControllerThreadsQueryKey() }),
    ]);
  };

  const fail = (error: unknown, fallback: string) =>
    setNotice({ text: errorMessage(error, fallback), error: true });

  const connect = async (provider: ProviderAvailabilityDto) => {
    setNotice(null);
    setBusy(provider.provider);
    try {
      if (provider.provider === "DEMO") {
        await demo.mutateAsync();
        setNotice({ text: "Demo mailbox connected with sample housing emails." });
      } else {
        const slug = provider.provider === "GMAIL" ? "gmail" : "outlook";
        const { url } = await connectorsControllerAuthUrl(slug, { client: "mobile" });
        const result = await WebBrowser.openAuthSessionAsync(url, RETURN_URL);
        if (result.type === "success") {
          const outcome = readOAuthReturn(result.url);
          if (outcome.nonce) await connectorsControllerConfirm(slug, { nonce: outcome.nonce });
          setNotice(
            outcome.ok
              ? { text: `${provider.label} connected.` }
              : {
                  text: `We couldn't connect ${provider.label}. ${outcome.reason ?? "Please try again."}`,
                  error: true,
                },
          );
        }
      }
      await refresh();
    } catch (error) {
      fail(error, `We couldn't connect ${provider.label}. Please try again.`);
    } finally {
      setBusy(null);
    }
  };

  const syncNow = async (connection: EmailConnectionViewDto) => {
    setNotice(null);
    setBusy(connection.id);
    try {
      const result: SyncResultDto = await sync.mutateAsync({ id: connection.id });
      setNotice({
        text: `Checked ${pluralise(result.scanned, "email")}: ${result.imported} housing, ${result.filed} ${result.filed === 1 ? "file" : "files"} filed, ${result.skipped} skipped.`,
      });
      await refresh();
    } catch (error) {
      fail(error, "We couldn't sync that mailbox. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const submitImap = async () => {
    setNotice(null);
    setBusy("IMAP");
    try {
      const result = await connectImap.mutateAsync({
        data: {
          host: imap.host.trim(),
          port: Number(imap.port) || 993,
          username: imap.username.trim(),
          appPassword: imap.appPassword,
        },
      });
      setImap((current) => ({ ...current, appPassword: "" }));
      setImapOpen(false);
      setNotice({ text: result.notice ?? `${result.connection.label} connected.` });
      await refresh();
    } catch (error) {
      fail(error, "We couldn't connect that mailbox. Check the server and app password.");
    } finally {
      setBusy(null);
    }
  };

  const setSetting = async (patch: Partial<ConnectorSettingsDto>) => {
    setNotice(null);
    const key = getConnectorsControllerOverviewQueryKey();
    const previous = queryClient.getQueryData<ConnectorsOverviewDto>(key);
    if (previous) queryClient.setQueryData(key, { ...previous, settings: { ...previous.settings, ...patch } });
    try {
      await updateSettings.mutateAsync({ data: patch });
    } catch (error) {
      queryClient.setQueryData(key, previous);
      fail(error, "We couldn't save that setting. Please try again.");
    }
  };

  const disconnectNow = (connection: EmailConnectionViewDto) => {
    const title = `Disconnect ${connection.label}?`;
    const message = `Seek deletes the ${pluralise(connection.emailCount, "housing email")} it imported. Your mailbox is not touched.`;
    const run = async () => {
      setNotice(null);
      setBusy(connection.id);
      try {
        const result = await disconnect.mutateAsync({ id: connection.id });
        setNotice({
          text: `${connection.label} disconnected. ${pluralise(result.removedEmails, "imported email")} deleted.`,
        });
        await refresh();
      } catch (error) {
        fail(error, "We couldn't disconnect that mailbox. Please try again.");
      } finally {
        setBusy(null);
      }
    };
    // React Native Web's Alert shows no buttons, so confirm with the browser dialog there.
    if (Platform.OS === "web") {
      if (window.confirm(`${title}\n\n${message}`)) void run();
      return;
    }
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      { text: "Disconnect", style: "destructive", onPress: run },
    ]);
  };

  const data = overview.data;
  const active = (data?.connections ?? []).filter((c) => c.status !== "DISCONNECTED");
  const byProvider = (provider: string) => active.find((c) => c.provider === provider);
  // The demo mailbox is only offered where the server allows it (not production).
  const providers = (data?.providers ?? []).filter(
    (p) => p.provider !== "DEMO" || p.available || byProvider("DEMO"),
  );
  const imapConnections = active.filter((c) => c.provider === "IMAP");
  const contacts = Array.from(
    new Map(
      active.flatMap((c) => c.matchedContacts).map((m) => [m.email || m.name, m] as const),
    ).values(),
  );
  const categories = Array.from(new Set(contacts.map((m) => m.category)));

  return (
    <SeekScreen
      title="Connect your email"
      subtitle="Landlord emails and housing documents, in one place"
      back
      fallbackHref="/(app)/(tabs)/inbox"
    >
      {overview.isLoading ? (
        <LoadingState label="Loading your email connections…" />
      ) : overview.isError || !data ? (
        <ErrorState
          error={overview.error}
          onRetry={() => void overview.refetch()}
          title="Couldn't load your email connections"
        />
      ) : (
        <>
          {notice ? (
            <Text
              accessibilityRole="alert"
              style={[styles.muted, { color: notice.error ? colors.danger : colors.success }]}
            >
              {notice.text}
            </Text>
          ) : null}

          <Card style={styles.list}>
            {providers.map((provider, index) => {
              const connection = byProvider(provider.provider);
              return (
                <View key={provider.provider}>
                  {index > 0 ? <Divider /> : null}
                  <ListRow
                    icon={<MailIcon color={colors.accent} size={20} />}
                    title={provider.label}
                    subtitle={
                      connection
                        ? connection.status === "ERROR"
                          ? (connection.lastError ?? "Reconnect to keep syncing")
                          : describe(connection)
                        : provider.available
                          ? undefined
                          : provider.reason
                    }
                    right={
                      connection ? (
                        <Badge
                          label={connection.status === "ERROR" ? "Needs attention" : "Connected"}
                          tone={connection.status === "ERROR" ? "warning" : "success"}
                        />
                      ) : (
                        <SeekButton
                          label={busy === provider.provider ? "Connecting…" : "Connect"}
                          variant="tint"
                          compact
                          disabled={!provider.available || busy !== null}
                          onPress={() => void connect(provider)}
                        />
                      )
                    }
                  />
                  {connection ? (
                    <View style={styles.actions}>
                      <SeekButton
                        label={busy === connection.id ? "Working…" : "Sync now"}
                        variant="secondary"
                        compact
                        disabled={busy !== null}
                        onPress={() => void syncNow(connection)}
                      />
                      <SeekButton
                        label={`Disconnect ${connection.label}`}
                        variant="secondary"
                        compact
                        disabled={busy !== null}
                        style={{ borderColor: colors.danger }}
                        onPress={() => disconnectNow(connection)}
                      />
                    </View>
                  ) : null}
                </View>
              );
            })}
            {imapConnections.map((connection) => (
              <View key={connection.id}>
                <Divider />
                <ListRow
                  icon={<MailIcon color={colors.accent} size={20} />}
                  title={connection.label}
                  subtitle={connection.status === "ERROR" ? (connection.lastError ?? "Reconnect to keep syncing") : describe(connection)}
                  right={
                    <Badge
                      label={connection.status === "ERROR" ? "Needs attention" : "Connected"}
                      tone={connection.status === "ERROR" ? "warning" : "success"}
                    />
                  }
                />
                <View style={styles.actions}>
                  <SeekButton
                    label={busy === connection.id ? "Working…" : "Sync now"}
                    variant="secondary"
                    compact
                    disabled={busy !== null}
                    onPress={() => void syncNow(connection)}
                  />
                  <SeekButton
                    label={`Disconnect ${connection.label}`}
                    variant="secondary"
                    compact
                    disabled={busy !== null}
                    style={{ borderColor: colors.danger }}
                    onPress={() => disconnectNow(connection)}
                  />
                </View>
              </View>
            ))}
            <Divider />
            <ListRow
              icon={<MailIcon color={colors.accent} size={20} />}
              title="Other (IMAP)"
              subtitle="Any mailbox, with an app password"
              right={
                <SeekButton
                  label={imapOpen ? "Close" : "Connect"}
                  variant="tint"
                  compact
                  disabled={busy !== null}
                  onPress={() => setImapOpen((open) => !open)}
                />
              }
            />
            {imapOpen ? (
              <View style={styles.form}>
                {(
                  [
                    ["host", "IMAP server (imap.example.com)", "url"],
                    ["port", "Port (993)", "number-pad"],
                    ["username", "Email address", "email-address"],
                    ["appPassword", "App password", "default"],
                  ] as const
                ).map(([key, placeholder, keyboardType]) => (
                  <TextInput
                    key={key}
                    accessibilityLabel={placeholder}
                    placeholder={placeholder}
                    placeholderTextColor={colors.mutedText}
                    value={imap[key]}
                    onChangeText={(text) => setImap((current) => ({ ...current, [key]: text }))}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    secureTextEntry={key === "appPassword"}
                    style={[styles.input, { color: colors.text, borderColor: colors.line }]}
                  />
                ))}
                <SeekButton
                  label={busy === "IMAP" ? "Connecting…" : "Connect mailbox"}
                  compact
                  disabled={busy !== null || !imap.host.trim() || !imap.username.trim() || !imap.appPassword}
                  onPress={() => void submitImap()}
                />
                <Text style={[styles.muted, { color: colors.mutedText }]}>
                  Use an app password from your email provider, not your normal password. Seek stores it encrypted.
                </Text>
              </View>
            ) : null}
          </Card>

          <View style={styles.section}>
            <SectionTitle>What Seek reads</SectionTitle>
            <Card>
              <Text style={[styles.strong, { color: colors.text }]}>Only my housing contacts</Text>
              <Text style={[styles.muted, { color: colors.mutedText }]}>
                {contacts.length > 0 ? "Matched so far" : "Connect a mailbox to see matched contacts."}
              </Text>
              {contacts.length > 0 ? (
                <View style={styles.chips}>
                  {contacts.map((contact) => (
                    <View
                      key={contact.email || contact.name}
                      style={[styles.chip, { backgroundColor: colors.tint }]}
                    >
                      <Text style={[styles.chipText, { color: colors.onTint }]}>
                        {contact.name} · {categoryLabel(contact.category)}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
              <Divider />
              {(
                [
                  ["autoFileAttachments", "File contracts and certificates in My home"],
                  ["addReferencesToProfile", "Add references to my profile"],
                  ["readUtilityBills", "Read utility bills to split them"],
                ] as const
              ).map(([key, label]) => (
                <View key={key} style={styles.switchRow}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>{label}</Text>
                  <Switch
                    accessibilityLabel={label}
                    value={data.settings[key]}
                    onValueChange={(value) => void setSetting({ [key]: value })}
                    trackColor={{ true: colors.accent, false: colors.lineStrong }}
                  />
                </View>
              ))}
              {categories.length > 0 ? (
                <>
                  <Divider />
                  <Text style={[styles.muted, { color: colors.mutedText }]}>
                    Display filter on this device: show these emails in my Seek inbox
                  </Text>
                  {categories.map((category) => (
                    <View key={category} style={styles.switchRow}>
                      <Text style={[styles.switchLabel, { color: colors.text }]}>
                        {categoryLabel(category).replace(/^./, (c) => c.toUpperCase())}
                      </Text>
                      <Switch
                        accessibilityLabel={`Show ${categoryLabel(category)} emails in my inbox`}
                        value={!hiddenCategories.includes(category)}
                        onValueChange={() => toggleCategory(category)}
                        trackColor={{ true: colors.accent, false: colors.lineStrong }}
                      />
                    </View>
                  ))}
                </>
              ) : null}
            </Card>
          </View>

          <Text style={[styles.muted, { color: colors.mutedText }]}>
            Only housing emails are synced; other emails are never stored. Replies you send from
            Seek go out from your own address. Disconnect any time.
          </Text>
        </>
      )}
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8 },
  list: { padding: 0, gap: 0, overflow: "hidden" },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 14, paddingBottom: 12 },
  strong: { fontSize: 14.5, fontWeight: "700" },
  muted: { fontSize: 12.5, lineHeight: 18 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  switchLabel: { flex: 1, fontSize: 14, fontWeight: "600" },
  form: { gap: 10, paddingHorizontal: 14, paddingBottom: 14 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14.5 },
  chipText: { fontSize: 12.5, fontWeight: "600" },
});
