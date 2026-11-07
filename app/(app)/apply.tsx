import { AdviceCard } from "@/components/seek/advice-card";
import { getApplicationLink } from "@/components/links";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import {
  Avatar,
  Badge,
  Card,
  Divider,
  ProgressBar,
  SeekButton,
  SeekScreen,
  SectionTitle,
} from "@/components/seek/ui";
import { formatViewing, offeredSlots, ViewingSlots } from "@/components/seek/viewing-slots";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import {
  getApplicationControllerGetAllMyApplicationsQueryKey,
  useApplicationControllerCreateApplication,
  useApplicationControllerGetAllMyApplications,
  useApplicationControllerScheduleViewing,
  useApplicationControllerSendApplication,
} from "@/src/api/seek-api/application";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import {
  useConversationControllerGetConversation,
  useConversationControllerSendMessage,
} from "@/src/api/seek-api/conversation";
import { useListingsControllerGetById } from "@/src/api/seek-api/listings";
import type { ApplicationDto, PassportDto } from "@/src/api/seek-api/model";
import { useUsersControllerGetPassport } from "@/src/api/seek-api/users";
import { createApplicationInvite } from "@/src/utils/application-invite";
import { formatDate, initialsOf } from "@/src/utils/seek-format";
import { errorMessage, idOf } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2Icon, TriangleAlertIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Share, StyleSheet, Text, View } from "react-native";

const SHARE_DAYS = 14;

const REFERENCE_TYPES = ["LANDLORD_REFERENCE", "AGENT_REFERENCE", "RECOMMENDATION", "CHARACTER_REFERENCE"];

export default function ApplyScreen() {
  const colors = useSeekTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { listingId: listingParam } = useLocalSearchParams<{ listingId?: string }>();
  const listingId = listingParam ?? "";

  const listing = useListingsControllerGetById(listingId, { query: { enabled: Boolean(listingId) } });
  const passport = useUsersControllerGetPassport();
  const mine = useApplicationControllerGetAllMyApplications();
  const { mutateAsync: createApplication } = useApplicationControllerCreateApplication();
  const { mutateAsync: sendApplication } = useApplicationControllerSendApplication();
  const { mutateAsync: scheduleViewing } = useApplicationControllerScheduleViewing();
  const { mutateAsync: sendMessage } = useConversationControllerSendMessage();
  const { data: me } = useAuthControllerCurrentUser();

  // The draft is only created when the student invites someone or sends, so
  // opening this screen never leaves anything behind.
  const [created, setCreated] = useState<ApplicationDto | undefined>();
  const existing = mine.data?.find((application) => idOf(application.listing) === listingId);
  const application = created ?? existing;
  const alreadySent = application ? application.stage !== "NOT_SENT" : false;

  const conversationId = idOf(application?.conversation) ?? "";
  const conversation = useConversationControllerGetConversation(conversationId, {
    query: { enabled: Boolean(conversationId) },
  });

  const [busy, setBusy] = useState<"invite" | "send" | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [nudged, setNudged] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const ensureApplication = async (): Promise<ApplicationDto> => {
    if (application) return application;
    const draft = await createApplication({ data: { listingId } });
    setCreated(draft);
    return draft;
  };

  const invite = async () => {
    setBusy("invite");
    setMessage(null);
    try {
      const draft = await ensureApplication();
      const { inviteToken } = await createApplicationInvite(draft._id);
      await Share.share({
        message: `Join my application on Seek: ${getApplicationLink(draft._id, inviteToken)}`,
        url: getApplicationLink(draft._id, inviteToken),
      });
      void queryClient.invalidateQueries({
        queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
      });
    } catch (error) {
      setMessage(errorMessage(error, "Couldn't create an invite link."));
    } finally {
      setBusy(null);
    }
  };

  // There is no nudge endpoint yet: a message in the household chat does the job.
  const nudge = async (member: { _id: string; name: string }) => {
    if (!conversationId) return;
    setMessage(null);
    try {
      await sendMessage({
        id: conversationId,
        data: {
          message: `Hi ${member.name.split(" ")[0]}, could you finish your Seek Passport? We only join the landlord's qualified queue once everyone's passport is verified.`,
        },
      });
      setNudged((current) => [...current, member._id]);
    } catch (error) {
      setMessage(errorMessage(error, "Couldn't send the nudge."));
    }
  };

  const send = async () => {
    setBusy("send");
    setMessage(null);
    try {
      const draft = await ensureApplication();
      await sendApplication({ id: draft._id });
      void queryClient.invalidateQueries({
        queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
      });
      // The application is in once it is sent; a viewing can only be booked after that.
      let viewingProblem: string | null = null;
      if (slot) {
        try {
          await scheduleViewing({ id: draft._id, data: { viewingAt: slot } });
        } catch (error) {
          viewingProblem = errorMessage(error, "We couldn't book that viewing.");
        }
      }
      if (viewingProblem) {
        Alert.alert(
          "Application sent",
          `${viewingProblem} You can pick another time from the Applied tab.`,
        );
        router.replace("/(app)/(tabs)/applied");
        return;
      }
      router.replace({
        pathname: "/(app)/application-successful",
        params: { listingId },
      });
    } catch (error) {
      setMessage(errorMessage(error, "Couldn't send your application."));
      setBusy(null);
    }
  };

  if (!listingId) {
    return (
      <SeekScreen title="Apply" back>
        <EmptyState title="Pick a home first" body="Open a listing and tap Apply Now." />
      </SeekScreen>
    );
  }
  if (listing.isLoading || passport.isLoading || mine.isLoading) {
    return (
      <SeekScreen title="Apply" back>
        <LoadingState label="Getting your application ready…" />
      </SeekScreen>
    );
  }
  if (listing.isError || passport.isError || mine.isError || !listing.data || !passport.data) {
    return (
      <SeekScreen title="Apply" back>
        <ErrorState
          error={listing.error ?? passport.error ?? mine.error}
          onRetry={() => {
            void listing.refetch();
            void passport.refetch();
            void mine.refetch();
          }}
          title="Couldn't load your application"
        />
      </SeekScreen>
    );
  }
  if (alreadySent) {
    return (
      <SeekScreen title="Apply" back>
        <EmptyState
          title="You've already applied"
          body="The landlord has your application. Replies arrive in your Inbox."
          actionLabel="Open Inbox"
          onAction={() => router.navigate("/(app)/(tabs)/inbox")}
        />
      </SeekScreen>
    );
  }

  const home = listing.data;
  const book = passport.data;
  const members = conversation.data?.users ?? [];
  const sharedItems = book.sections.flatMap((section) =>
    section.items.filter((item) => item.status === "VERIFIED" || item.status === "PENDING"),
  );
  const labelOf = (type: string) =>
    book.sections.flatMap((section) => section.items).find((item) => item.type === type)?.label ??
    type.replace(/_/g, " ").toLowerCase();
  // The server says which documents this home needs; any one of an entry's types satisfies it.
  const present = new Set(sharedItems.map((item) => item.type as string));
  const missingDocs = home.requiredDocuments
    ? home.requiredDocuments.filter((doc) => !doc.types.some((type) => present.has(type))).map((doc) => doc.label)
    : book.missingRequired.map((item) => labelOf(item));
  const nextExpiry = formatDate(new Date(Date.now() + SHARE_DAYS * 86_400_000).toISOString());

  const people = Math.max(1, home.numOfPeople || 1);
  const rentEach = Math.round(home.monthlyRent / people);
  // Tenant Fees Act: a holding deposit is at most one week's rent, here per person.
  const weeklyCap = Math.round((home.monthlyRent * 12) / 52 / people);
  const holdingSet = home.holdingDeposit != null && home.holdingDeposit > 0;
  const holding = holdingSet ? Math.min(home.holdingDeposit ?? 0, weeklyCap) : weeklyCap;
  const offered = offeredSlots(home);

  const criteria = home.criteria;
  const householdSize = Math.max(1, members.length);
  // Everyone in the household, with their passport when the server shares it
  // (drafts don't return other members' passports yet, so those show as pending).
  const household: { id: string; name: string; mine: boolean; passport?: PassportDto }[] = (
    members.length > 0 ? members : [{ _id: me?._id ?? "me", name: me?.name ?? "You" }]
  ).map((member) => {
    const mine = member._id === me?._id || members.length === 0;
    return {
      id: member._id,
      name: member.name,
      mine,
      passport: mine ? book : application?.members?.find((entry) => entry.user === member._id)?.passport,
    };
  });
  const hasVerified = (passport: PassportDto | undefined, types: string[]) =>
    !!passport?.sections.some((section) =>
      section.items.some((item) => types.includes(item.type) && item.status === "VERIFIED"),
    );
  const countOf = (test: (passport: PassportDto | undefined) => boolean) =>
    household.filter((person) => test(person.passport)).length;
  const memberStatus = (person: (typeof household)[number]) => {
    if (!person.passport) return { label: "Pending", tone: "warning" as const, note: "Joined · their passport joins as soon as it's verified" };
    if (person.passport.ready) return { label: "Ready", tone: "success" as const, note: "Passport ready" };
    if (criteria?.guarantor && criteria.guarantor !== "NONE" && !hasVerified(person.passport, ["GUARANTOR_AGREEMENT"]))
      return { label: "Guarantor missing", tone: "warning" as const, note: "Passport not ready · guarantor missing" };
    return { label: "Not ready", tone: "warning" as const, note: "Passport not ready" };
  };
  const checks: { key: string; label: string; ok: boolean; detail: string }[] = [];
  const addCheck = (key: string, label: string, test: (passport: PassportDto | undefined) => boolean) => {
    const count = countOf(test);
    checks.push({ key, label, ok: count === household.length, detail: `${count} of ${household.length}` });
  };
  addCheck("passport", "Seek Passport ready", (passport) => !!passport?.ready);
  if (criteria?.guarantor && criteria.guarantor !== "NONE") {
    addCheck(
      "guarantor",
      criteria.guarantor === "UK_ONLY" ? "UK guarantor" : "UK guarantor or guarantor service",
      (passport) => hasVerified(passport, ["GUARANTOR_AGREEMENT"]),
    );
  }
  if (criteria?.referencesRequired) {
    addCheck("references", "A reference", (passport) => hasVerified(passport, REFERENCE_TYPES));
  }
  if (criteria?.maxHousehold) {
    checks.push({
      key: "max",
      label: `At most ${criteria.maxHousehold} people`,
      ok: householdSize <= criteria.maxHousehold,
      detail: `${householdSize} applying`,
    });
  }
  if (home.availableFrom) {
    checks.push({ key: "movein", label: "Move-in", ok: true, detail: `Free from ${formatDate(home.availableFrom)}` });
  }
  // The server's verdict decides the queue, so it wins once the draft exists.
  const serverChecks = application?.criteria?.length
    ? application.criteria.map((criterion) => ({
        key: criterion.key,
        label: criterion.label,
        ok: criterion.passed,
        detail: criterion.detail,
      }))
    : null;
  const shownChecks = serverChecks ?? checks;
  const readyCount = countOf((passport) => !!passport?.ready);
  const waiting = household.filter((person) => !person.passport?.ready);
  const waitingNames = waiting.map((person) => (person.mine ? "Your" : `${person.name.split(" ")[0]}'s`));

  return (
    <SeekScreen
      title="Apply as a household"
      subtitle={`${home.propertyTitle} · £${rentEach} pcm each`}
      back
      footer={
        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.line }]}>
          {message ? <Text style={[styles.error, { color: colors.danger }]}>{message}</Text> : null}
          <SeekButton
            label={busy === "send" ? "Sending…" : "Send application"}
            disabled={busy !== null || missingDocs.length > 0}
            onPress={() => void send()}
          />
          <Text style={[styles.footerNote, { color: colors.mutedText }]}>
            {waiting.length === 0
              ? "Every passport is ready, so you join the landlord's qualified queue. The first qualified household gets the offer. There is no bidding."
              : `Sends now for ${readyCount}. ${waitingNames.join(", ")} passport${waiting.length === 1 ? "" : "s"} join${waiting.length === 1 ? "s" : ""} as soon as ${waiting.length === 1 ? "it's" : "they're"} verified, and you only join the qualified queue then. There is no bidding.`}
          </Text>
        </View>
      }
    >
      <Card tone="hero">
        <View style={styles.row}>
          <Text style={[styles.heroTitle, { color: colors.onHero }]}>Your Seek Passport</Text>
          <Badge label={book.ready ? "Ready" : "Not ready"} tone={book.ready ? "success" : "warning"} />
        </View>
        <ProgressBar value={book.percent / 100} />
        <Text style={[styles.heroBody, { color: colors.heroMuted }]}>
          {book.completed} of {book.total} items verified
        </Text>
        {missingDocs.length > 0 ? (
          <View style={styles.missing}>
            {missingDocs.map((label) => (
              <View key={label} style={styles.reason}>
                <TriangleAlertIcon color={colors.warning} size={16} />
                <Text style={[styles.heroBody, { color: colors.onHero }]}>
                  Missing: {label}
                </Text>
              </View>
            ))}
            <SeekButton
              label="Complete your passport"
              variant="light"
              compact
              onPress={() => router.navigate("/(app)/(tabs)/passport")}
            />
          </View>
        ) : null}
      </Card>

      <View style={styles.section}>
        <SectionTitle hint={`This home fits ${home.numOfPeople}`}>Household</SectionTitle>
        <Card>
          {household.map((person, index) => {
            const status = memberStatus(person);
            return (
              <View key={person.id}>
                {index > 0 ? <Divider /> : null}
                <View style={styles.memberRow}>
                  <Avatar initials={initialsOf(person.name)} size={40} />
                  <View style={styles.flex}>
                    <Text numberOfLines={1} style={[styles.memberName, { color: colors.text }]}>
                      {person.mine ? "You" : person.name}
                    </Text>
                    <Text style={[styles.note, { color: colors.mutedText }]}>{status.note}</Text>
                  </View>
                  <Badge label={status.label} tone={status.tone} />
                  {!person.mine && status.label !== "Ready" ? (
                    <SeekButton
                      label={nudged.includes(person.id) ? "Nudged" : "Nudge"}
                      variant="tint"
                      compact
                      disabled={nudged.includes(person.id) || !conversationId}
                      onPress={() => void nudge({ _id: person.id, name: person.name })}
                    />
                  ) : null}
                </View>
              </View>
            );
          })}
          <SeekButton
            label={busy === "invite" ? "Creating link…" : "Invite a housemate"}
            variant="tint"
            compact
            disabled={busy !== null}
            onPress={() => void invite()}
          />
          <Text style={[styles.note, { color: colors.mutedText }]}>
            Housemates join with a private link. Each one&apos;s Seek Passport is shared when they are in the group.
            The landlord counts your household as qualified once everyone&apos;s passport is verified.
          </Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionTitle>Landlord&apos;s criteria, checked for you</SectionTitle>
        <Card style={styles.shared}>
          {shownChecks.map((check) => (
            <View key={check.key} style={styles.reason}>
              {check.ok ? (
                <CheckCircle2Icon color={colors.success} size={18} />
              ) : (
                <TriangleAlertIcon color={colors.warning} size={18} />
              )}
              <View style={styles.flex}>
                <Text style={[styles.sharedLabel, { color: colors.text }]}>{check.label}</Text>
                <Text style={[styles.note, { color: colors.mutedText }]}>{check.detail}</Text>
              </View>
            </View>
          ))}
          <Text style={[styles.note, { color: colors.mutedText }]}>
            {serverChecks
              ? "Checked by Seek across your whole household."
              : household.every((person) => person.passport)
              ? "Counted across your whole household."
              : "Housemates whose passport isn't shared yet count as not ready."}
          </Text>
        </Card>
      </View>

      {application ? (
        <View style={styles.section}>
          <AdviceCard topic="application" applicationId={application._id} heading="Seek AI · your household" />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionTitle hint={slot ? formatViewing(slot) : "Optional"}>Pick a viewing</SectionTitle>
        <Card>
          <ViewingSlots value={slot} onChange={setSlot} offered={offered} availability={home.viewingSlotAvailability} />
          <Text style={[styles.note, { color: colors.mutedText }]}>
            {offered.length > 0
              ? "These are the times the landlord offers. We book yours as soon as the application is sent."
              : "The landlord hasn't set times, so pick what suits you. We book it as soon as the application is sent."}
          </Text>
        </Card>
      </View>

      <Card tone="tint">
        <Text style={[styles.noteTitle, { color: colors.onTint }]}>If you&apos;re offered the home</Text>
        <Text style={[styles.noteBody, { color: colors.onTint }]}>
          {`The holding deposit is ${holdingSet ? "" : "at most "}£${holding} each (never more than one week's rent). It is refundable, it goes towards your first rent, and the landlord must decide within 15 days. Sending this application costs you nothing.`}
        </Text>
        <Text style={[styles.noteBody, { color: colors.onTint }]}>
          {`Rent is £${rentEach} a month each (£${home.monthlyRent} for the home, split ${people} ${people === 1 ? "way" : "ways"}).`}
        </Text>
      </Card>

      <View style={styles.section}>
        <SectionTitle hint={`${SHARE_DAYS} days`}>What the landlord can see</SectionTitle>
        <Card style={styles.shared}>
          {sharedItems.length === 0 ? (
            <Text style={[styles.note, { color: colors.mutedText }]}>
              No documents uploaded yet. Add them in your Seek Passport.
            </Text>
          ) : (
            sharedItems.map((item) => (
              <View key={item.type} style={styles.reason}>
                <CheckCircle2Icon color={colors.success} size={18} />
                <Text style={[styles.sharedLabel, { color: colors.text }]}>{item.label}</Text>
                <Text style={[styles.note, { color: colors.mutedText }]}>
                  {item.status === "VERIFIED" ? "Verified" : "Pending"}
                </Text>
              </View>
            ))
          )}
        </Card>
        <Card tone="tint">
          <Text style={[styles.noteTitle, { color: colors.onTint }]}>You stay in control</Text>
          <Text style={[styles.noteBody, { color: colors.onTint }]}>
            Sending shares these documents until {nextExpiry}. You can stop sharing any time from your Profile.
          </Text>
        </Card>
      </View>
    </SeekScreen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  heroTitle: { fontSize: 17, fontWeight: "700" },
  heroBody: { fontSize: 13, lineHeight: 18 },
  missing: { gap: 8 },
  section: { gap: 8 },
  flex: { flex: 1 },
  memberRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 4 },
  memberName: { fontSize: 14, fontWeight: "600" },
  note: { fontSize: 12.5, lineHeight: 18 },
  shared: { gap: 12 },
  reason: { flexDirection: "row", alignItems: "center", gap: 8 },
  sharedLabel: { flex: 1, fontSize: 14 },
  noteTitle: { fontSize: 14.5, fontWeight: "700" },
  noteBody: { fontSize: 13, lineHeight: 19 },
  footer: { padding: 16, gap: 8, borderTopWidth: 1 },
  footerNote: { fontSize: 12, textAlign: "center", lineHeight: 17 },
  error: { fontSize: 13, textAlign: "center" },
});
