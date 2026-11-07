import { AdviceCard } from "@/components/seek/advice-card";
import { AuthRequiredScreen } from "@/components/custom/auth-required";
import { EmptyState, ErrorState, LoadingState } from "@/components/seek/states";
import { Badge, Card, Divider, SeekButton, SeekScreen } from "@/components/seek/ui";
import { formatViewing, offeredSlots, ViewingSlots } from "@/components/seek/viewing-slots";
import { useSeekTheme } from "@/hooks/use-seek-theme";
import {
  getApplicationControllerGetAllMyApplicationsQueryKey,
  useApplicationControllerAcceptOffer,
  useApplicationControllerGetAllMyApplications,
  useApplicationControllerScheduleViewing,
} from "@/src/api/seek-api/application";
import type { ApplicationDto, DocumentShareDto, StudentPaymentDto } from "@/src/api/seek-api/model";
import { getPaymentsControllerMineQueryKey, usePaymentsControllerMine } from "@/src/api/seek-api/payments";
import { useUsersControllerListShares } from "@/src/api/seek-api/users";
import { payWithCheckout } from "@/src/utils/checkout";
import { formatDate, formatDay, formatPence } from "@/src/utils/seek-format";
import { errorMessage, idOf } from "@/src/utils/tenancy-view";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppliedScreen() {
  return (
    <AuthRequiredScreen
      title="Sign in to see your applications"
      description="Applications, viewings and shared documents show up here once you apply to a home."
    >
      <Applied />
    </AuthRequiredScreen>
  );
}

function Applied() {
  const router = useRouter();
  const mine = useApplicationControllerGetAllMyApplications();
  const shares = useUsersControllerListShares();
  // Holding deposits have no tenancy yet, so they only show without a tenancy filter.
  const payments = usePaymentsControllerMine();

  if (mine.isLoading) {
    return (
      <SeekScreen title="Applied">
        <LoadingState label="Loading your applications…" />
      </SeekScreen>
    );
  }
  if (mine.isError) {
    return (
      <SeekScreen title="Applied">
        <ErrorState error={mine.error} onRetry={() => void mine.refetch()} title="Couldn't load your applications" />
      </SeekScreen>
    );
  }
  const applications = mine.data ?? [];
  if (applications.length === 0) {
    return (
      <SeekScreen title="Applied">
        <EmptyState
          title="No applications yet"
          body="Apply to a home from the map. You join the landlord's queue in the order you apply, with no bidding."
          actionLabel="Find a home"
          onAction={() => router.navigate("/(app)/(tabs)/map")}
        />
      </SeekScreen>
    );
  }
  return (
    <SeekScreen
      title="Applied"
      subtitle={`${applications.length} ${applications.length === 1 ? "application" : "applications"}`}
    >
      {applications.map((application) => (
        <ApplicationCard
          key={application._id}
          application={application}
          shares={(shares.data ?? []).filter((share) => share.active)}
          holdingDeposit={(payments.data ?? []).find(
            (payment) => payment.kind === "HOLDING_DEPOSIT" && payment.application === application._id,
          )}
        />
      ))}
    </SeekScreen>
  );
}

function stageBadge(application: ApplicationDto) {
  switch (application.stage) {
    case "NOT_SENT":
      return { label: "Draft", tone: "neutral" as const };
    case "OFFERED":
      return { label: "Offer received", tone: "success" as const };
    case "ACCEPTED":
      return { label: "Accepted", tone: "success" as const };
    case "REJECTED":
      return { label: "Not successful", tone: "danger" as const };
    default:
      return application.qualified
        ? { label: "In the qualified queue", tone: "success" as const }
        : { label: "Not qualified yet", tone: "warning" as const };
  }
}

function ApplicationCard({
  application,
  shares,
  holdingDeposit,
}: {
  application: ApplicationDto;
  shares: DocumentShareDto[];
  holdingDeposit?: StudentPaymentDto;
}) {
  const colors = useSeekTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: schedule, isPending } = useApplicationControllerScheduleViewing();
  const accept = useApplicationControllerAcceptOffer();
  const [paying, setPaying] = useState(false);
  const [picking, setPicking] = useState(false);
  const [slot, setSlot] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const listing = application.listing;
  const listingId = idOf(listing) ?? "";
  const conversationId = idOf(application.conversation);
  const badge = stageBadge(application);
  const stage = application.stage;
  const sent = stage !== "NOT_SENT";
  const canBook = stage === "SENT" || stage === "VIEWED";
  const offered = offeredSlots(listing);
  const share = shares.find(
    (item) => item.application === application._id || item.listing?._id === listingId,
  );
  const place = application.queuePosition;
  const offer = stage === "OFFERED";
  const depositOwed = holdingDeposit != null && holdingDeposit.status !== "PAID";
  const rentEach = listing?.numOfPeople
    ? Math.round(listing.monthlyRent / Math.max(1, listing.numOfPeople))
    : listing?.monthlyRent;

  const bookViewing = async () => {
    if (!slot) return;
    setMessage(null);
    try {
      await schedule({ id: application._id, data: { viewingAt: slot } });
      await queryClient.invalidateQueries({
        queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
      });
      setPicking(false);
      setSlot(null);
      setMessage({ text: "Viewing booked. The landlord and your housemates are told." });
    } catch (error) {
      setMessage({ text: errorMessage(error, "We couldn't book that viewing."), error: true });
    }
  };

  const payDeposit = async () => {
    if (!holdingDeposit) return;
    setMessage(null);
    setPaying(true);
    try {
      const outcome = await payWithCheckout(holdingDeposit._id);
      setMessage(
        outcome === "paid"
          ? { text: "Holding deposit paid. It is refundable and goes towards your first rent." }
          : outcome === "cancelled"
            ? { text: "Payment cancelled. Your holding deposit is still due.", error: true }
            : { text: "Your payment hasn't gone through yet. If you were charged, it will show here shortly.", error: true },
      );
    } catch (error) {
      setMessage({ text: errorMessage(error, "We couldn't start that payment."), error: true });
    } finally {
      setPaying(false);
      void queryClient.invalidateQueries({ queryKey: getPaymentsControllerMineQueryKey() });
    }
  };

  const acceptOffer = async () => {
    setMessage(null);
    try {
      await accept.mutateAsync({ id: application._id });
      await queryClient.invalidateQueries({ queryKey: getApplicationControllerGetAllMyApplicationsQueryKey() });
      router.navigate("/(app)/(tabs)/my-home");
    } catch (error) {
      setMessage({ text: errorMessage(error, "We couldn't accept that offer."), error: true });
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.head}>
        <View style={styles.flex}>
          <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
            {listing?.propertyTitle ?? "Home"}
          </Text>
          <Text numberOfLines={1} style={[styles.sub, { color: colors.mutedText }]}>
            {[listing?.streetAddress, rentEach != null ? `£${rentEach} pcm each` : null]
              .filter(Boolean)
              .join(" · ")}
          </Text>
        </View>
        <Badge label={badge.label} tone={badge.tone} />
      </View>
      <Divider />

      <Row
        label="Queue"
        value={
          !sent
            ? "Send your application to join the queue."
            : canBook && !application.qualified
              ? `Not qualified yet${
                  application.readiness != null ? ` (${Math.round(application.readiness)}% ready)` : ""
                }. You join the queue once your whole household meets the criteria.`
            : canBook
              ? `${place != null ? `#${place} of ${application.queueSize ?? place} qualified · ` : ""}Sent ${formatDay(application.sentAt ?? application.createdAt)}. The first qualified household gets the offer.`
              : `Sent ${formatDay(application.sentAt ?? application.createdAt)}.`
        }
      />
      {offer ? (
        <Row
          label="Offer"
          value={`The landlord has offered you this home${
            application.offerExpiresAt ? `. Accept by ${formatDay(application.offerExpiresAt)}` : ""
          }.${
            holdingDeposit
              ? ` Holding deposit ${formatPence(holdingDeposit.amount)} each, ${
                  holdingDeposit.status === "PAID" ? "paid" : "not paid yet"
                }. It is refundable and goes towards your first rent.`
              : application.holdingDeposit
                ? ` Holding deposit £${application.holdingDeposit} each.`
                : ""
          }`}
        />
      ) : null}
      {sent && !application.qualified
        ? (application.criteria ?? [])
            .filter((criterion) => !criterion.passed)
            .map((criterion) => <Row key={criterion.key} label={criterion.label} value={criterion.detail} />)
        : null}
      <Row
        label="Viewing"
        value={application.viewingAt ? formatViewing(application.viewingAt) : "Not booked yet"}
      />
      <Row
        label="Shared documents"
        value={share ? `Visible to the landlord until ${formatDate(share.expiresAt)}` : "Not shared"}
      />

      {sent ? <AdviceCard topic="application" applicationId={application._id} heading="Seek AI · your place" /> : null}

      {message ? (
        <Text
          accessibilityRole="alert"
          style={[styles.note, { color: message.error ? colors.danger : colors.success }]}
        >
          {message.text}
        </Text>
      ) : null}

      {picking ? (
        <View style={styles.picker}>
          <ViewingSlots value={slot} onChange={setSlot} offered={offered} availability={listing.viewingSlotAvailability} />
          {offered.length > 0 && listing.viewingSlotCapacity ? (
            <Text style={[styles.note, { color: colors.mutedText }]}>
              Up to {listing.viewingSlotCapacity} households can book the same time.
            </Text>
          ) : null}
          <View style={styles.actions}>
            <SeekButton
              label={isPending ? "Booking…" : "Confirm viewing"}
              compact
              disabled={!slot || isPending}
              onPress={() => void bookViewing()}
            />
            <SeekButton
              label="Cancel"
              compact
              variant="secondary"
              onPress={() => {
                setPicking(false);
                setSlot(null);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.actions}>
          {application.stage === "NOT_SENT" ? (
            <SeekButton
              label="Finish application"
              compact
              onPress={() => router.push({ pathname: "/(app)/apply", params: { listingId } })}
            />
          ) : null}
          {offer && depositOwed ? (
            <SeekButton
              label={paying ? "Paying…" : `1. Pay holding deposit ${formatPence(holdingDeposit.amount)}`}
              compact
              disabled={paying}
              onPress={() => void payDeposit()}
            />
          ) : null}
          {offer ? (
            <SeekButton
              label={accept.isPending ? "Accepting…" : depositOwed ? "2. Accept offer" : "Accept offer"}
              compact
              variant={depositOwed ? "secondary" : "primary"}
              disabled={accept.isPending}
              onPress={() => void acceptOffer()}
            />
          ) : null}
          {offer && depositOwed ? (
            <Text style={[styles.note, { color: colors.mutedText }]}>
              Pay first: accepting the offer cancels an unpaid holding deposit.
            </Text>
          ) : null}
          {canBook ? (
            <SeekButton
              label={application.viewingAt ? "Move viewing" : "Book viewing"}
              compact
              variant="tint"
              onPress={() => setPicking(true)}
            />
          ) : null}
          {conversationId && sent ? (
            <SeekButton
              label="Open chat"
              compact
              variant="secondary"
              onPress={() => router.push(`/(app)/chat/${conversationId}`)}
            />
          ) : null}
          {share ? (
            <SeekButton
              label="Manage sharing"
              compact
              variant="secondary"
              onPress={() => router.navigate("/(app)/(tabs)/passport")}
            />
          ) : null}
        </View>
      )}
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const colors = useSeekTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.mutedText }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: { gap: 10 },
  head: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  title: { fontSize: 16, fontWeight: "700" },
  sub: { fontSize: 13, marginTop: 2 },
  row: { gap: 2 },
  rowLabel: { fontSize: 12, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.4 },
  rowValue: { fontSize: 13.5, lineHeight: 19 },
  picker: { gap: 12 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  note: { fontSize: 13, lineHeight: 18 },
});
