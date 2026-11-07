import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { AdviceCard } from "@/components/seek/advice-card";
import { ErrorState, LoadingState } from "@/components/seek/states";
import {
  Avatar,
  ChatBubble,
  Composer,
  SeekButton,
  SeekScreen,
} from "@/components/seek/ui";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import { useConnectorsControllerOverview } from "@/src/api/seek-api/connectors";
import {
  getInboxControllerThreadQueryKey,
  getInboxControllerThreadsQueryKey,
  useInboxControllerReply,
  useInboxControllerThread,
} from "@/src/api/seek-api/inbox";
import type { InboxAttachmentDto, InboxMessageDto } from "@/src/api/seek-api/model";
import { initialsOf } from "@/src/utils/seek-format";
import { errorMessage, isWebUrl, openStoredFile } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FileTextIcon, MailIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Attachment({ file }: { file: InboxAttachmentDto }) {
  const colors = useSeekTheme();
  const [opening, setOpening] = useState(false);
  const [failed, setFailed] = useState(false);
  const canOpen = Boolean(file.key || isWebUrl(file.url));

  const open = async () => {
    if (!canOpen || opening) return;
    setFailed(false);
    setOpening(true);
    try {
      // Stored files go through the signed access URL; a plain link opens as is.
      await openStoredFile(file);
    } catch {
      setFailed(true);
    } finally {
      setOpening(false);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${file.name}`}
      disabled={!canOpen}
      onPress={() => void open()}
      style={[styles.attachment, { backgroundColor: colors.surfaceAlt }]}
    >
      <FileTextIcon color={colors.accent} size={20} />
      <View style={styles.flex}>
        <Text style={[styles.attachmentName, { color: colors.text }]}>{file.name}</Text>
        {file.filedAs ? (
          <Text style={[styles.attachmentFiled, { color: colors.success }]}>Filed in {file.filedAs}</Text>
        ) : null}
        {failed ? (
          <Text style={[styles.attachmentFiled, { color: colors.danger }]}>Couldn&apos;t open this file</Text>
        ) : !canOpen ? (
          <Text style={[styles.attachmentFiled, { color: colors.mutedText }]}>File not stored</Text>
        ) : opening ? (
          <Text style={[styles.attachmentFiled, { color: colors.mutedText }]}>Opening…</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

function EmailBubble({
  message,
  mine,
  provider,
}: {
  message: InboxMessageDto;
  mine: boolean;
  provider: string | null;
}) {
  const colors = useSeekTheme();
  return (
    <ChatBubble mine={mine}>
      <View style={styles.emailBody}>
        <View style={styles.emailMeta}>
          <Text style={[styles.emailSubject, { color: colors.mutedText }]} numberOfLines={1}>
            {provider ? `via ${provider}` : "Email"}
            {message.subject ? ` · ${message.subject}` : ""}
          </Text>
        </View>
        {message.text ? (
          <Text style={[styles.text, { color: colors.text }]}>{message.text}</Text>
        ) : null}
        {message.attachments.map((file, index) => (
          <Attachment key={`${file.name}-${index}`} file={file} />
        ))}
      </View>
    </ChatBubble>
  );
}

export default function ThreadScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to read your messages"
      description="Conversations with landlords and your household live here."
    >
      <Thread />
    </AuthRequiredScreen>
  );
}

function Thread() {
  const colors = useSeekTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const threadId = id ?? "";
  const thread = useInboxControllerThread(threadId, { query: { enabled: Boolean(id) } });
  const connectors = useConnectorsControllerOverview();
  const reply = useInboxControllerReply();
  const [mode, setMode] = useState<"seek" | "email" | null>(null);
  const [draft, setDraft] = useState("");
  const [sendError, setSendError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const prefilled = useRef<string | null>(null);

  const data = thread.data;
  // Default to Seek when allowed, otherwise email (email-only threads).
  const activeMode =
    mode ?? (data?.canReplyBySeek ? "seek" : data?.canReplyByEmail ? "email" : null);
  const connected = (connectors.data?.connections ?? []).filter((c) => c.status === "CONNECTED");
  // Messages don't say which mailbox they came from: use the one replies leave from,
  // or the only connected one.
  const mailbox =
    connected.find((c) => c.emailAddress.toLowerCase() === data?.replyFrom?.toLowerCase()) ??
    (connected.length === 1 ? connected[0] : undefined);
  const providerName =
    mailbox?.provider === "GMAIL" ? "Gmail" : mailbox?.provider === "OUTLOOK" ? "Outlook" : null;

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, [data?.messages.length]);

  // Seek AI's suggested reply goes in the composer once per thread; the user edits and sends it.
  const suggestedReply = data?.suggestedReply;
  useEffect(() => {
    if (suggestedReply && prefilled.current !== threadId) {
      prefilled.current = threadId;
      setDraft((current) => current || suggestedReply);
    }
  }, [suggestedReply, threadId]);

  const send = () => {
    const text = draft.trim();
    if (!text || !activeMode || reply.isPending) return;
    setSendError(null);
    reply.mutate(
      { id: threadId, data: { text, via: activeMode } },
      {
        onSuccess(updated) {
          setDraft("");
          queryClient.setQueryData(getInboxControllerThreadQueryKey(threadId), updated);
          void queryClient.invalidateQueries({ queryKey: getInboxControllerThreadsQueryKey() });
        },
        onError(error) {
          setSendError(errorMessage(error, "Your message wasn't sent. Please try again."));
        },
      },
    );
  };

  const firstName = data?.name.split(" ")[0] ?? "them";
  const canChoose = Boolean(data?.canReplyBySeek && data?.canReplyByEmail);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SeekScreen
        title={data?.name ?? "Conversation"}
        subtitle={data?.sub}
        back
        fallbackHref="/(app)/(tabs)/inbox"
        scroll={false}
        contentStyle={styles.noPadding}
        headerLeft={data ? <Avatar initials={initialsOf(data.name)} size={38} tone="alt" /> : undefined}
        footer={
          data && activeMode ? (
            <View style={[styles.footer, { backgroundColor: colors.surface }]}>
              {canChoose ? (
                <View style={styles.modes}>
                  <SeekButton
                    label="Seek message"
                    compact
                    variant={activeMode === "seek" ? "primary" : "secondary"}
                    onPress={() => setMode("seek")}
                    style={styles.pill}
                  />
                  <SeekButton
                    label="Reply by email"
                    compact
                    variant={activeMode === "email" ? "primary" : "secondary"}
                    onPress={() => setMode("email")}
                    style={styles.pill}
                  />
                </View>
              ) : null}
              {activeMode === "email" && data.replyFrom ? (
                <Text style={[styles.replyFrom, { color: colors.mutedText }]}>
                  Sent from {data.replyFrom}
                </Text>
              ) : null}
              {sendError ? (
                <Text style={[styles.replyFrom, { color: colors.danger }]}>{sendError}</Text>
              ) : null}
              <Composer
                label={`Message ${firstName}`}
                placeholder={reply.isPending ? "Sending…" : `Message ${firstName}…`}
                value={draft}
                onChangeText={setDraft}
                onSend={send}
              />
            </View>
          ) : undefined
        }
      >
        {thread.isLoading ? (
          <LoadingState label="Loading conversation…" />
        ) : thread.isError || !data ? (
          <ErrorState
            error={thread.error}
            onRetry={() => void thread.refetch()}
            title="Couldn't load this conversation"
          />
        ) : (
          <ScrollView
            ref={scrollRef}
            style={styles.flex}
            contentContainerStyle={styles.messages}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <AdviceCard topic="inbox" threadId={threadId} />
            {data.rent ? (
              <Text style={[styles.day, { color: colors.mutedText }]}>
                This month&apos;s rent: {data.rent.paid} of {data.rent.total} tenants paid
              </Text>
            ) : null}
            {data.kind === "email" ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push("/(app)/connected-email")}
                style={[styles.banner, { backgroundColor: colors.tint }]}
              >
                <MailIcon color={colors.onTint} size={16} />
                <Text style={[styles.bannerText, { color: colors.onTint }]}>
                  {connected.length > 0
                    ? `${connected.map((c) => c.label).join(" and ")} connected. Replies go from your own address.`
                    : "Email connection needed to reply."}
                </Text>
                <Text style={[styles.bannerAction, { color: colors.onTint }]}>Manage</Text>
              </Pressable>
            ) : null}

            {data.messages.length === 0 ? (
              <Text style={[styles.day, { color: colors.mutedText }]}>No messages yet.</Text>
            ) : null}
            {data.messages.map((message, index) => {
              const previous = data.messages[index - 1];
              const showDay = !previous || previous.timeLabel !== message.timeLabel;
              return (
                <React.Fragment key={message.id}>
                  {showDay ? (
                    <Text style={[styles.day, { color: colors.mutedText }]}>
                      {message.timeLabel}
                    </Text>
                  ) : null}
                  {message.via === "Email" ? (
                    <EmailBubble message={message} mine={message.me} provider={providerName} />
                  ) : (
                    <ChatBubble mine={message.me}>{message.text}</ChatBubble>
                  )}
                </React.Fragment>
              );
            })}
            {!data.canReplyBySeek && !data.canReplyByEmail ? (
              <Text style={[styles.day, { color: colors.mutedText }]}>
                Connect your email to reply to this conversation.
              </Text>
            ) : null}
          </ScrollView>
        )}
      </SeekScreen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  noPadding: { padding: 0, gap: 0, paddingBottom: 0 },
  messages: { padding: 16, gap: 14, paddingBottom: 24 },
  replyFrom: { fontSize: 12, paddingHorizontal: 16, paddingTop: 6 },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  bannerText: { flex: 1, fontSize: 12.5 },
  bannerAction: { fontSize: 12.5, fontWeight: "700" },
  day: { textAlign: "center", fontSize: 12 },
  text: { fontSize: 13.5, lineHeight: 19 },
  emailBody: { gap: 8 },
  emailMeta: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  emailSubject: { fontSize: 11.5, fontWeight: "600" },
  emailVia: { fontSize: 11.5 },
  attachment: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
  },
  attachmentName: { fontSize: 13, fontWeight: "600" },
  attachmentFiled: { fontSize: 11.5, fontWeight: "600" },
  footer: { paddingTop: 8 },
  modes: { flexDirection: "row", gap: 8, paddingHorizontal: 12 },
  pill: { minHeight: 30, borderRadius: 999 },
});
