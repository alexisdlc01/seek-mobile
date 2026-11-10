import { queryClient } from "@/app/_layout";
import {
  ProfilePrimaryButton,
  ProfileSectionTitle,
  ProfileTextField,
  useProfileTypography,
} from "@/components/custom/profile-screen";
import { Text } from "@/components/ui/text";
import { PROFILE_LAYOUT } from "@/constants/design";
import type { SeekColors } from "@/constants/seek-theme";
import { useThemedStyles } from "@/hooks/use-seek-theme";
import { getAuthControllerCurrentUserQueryKey } from "@/src/api/seek-api/auth";
import type { UserDto } from "@/src/api/seek-api/model";
import {
  useUsersControllerSendStudentEmailCode,
  useUsersControllerVerifyStudentEmail,
} from "@/src/api/seek-api/users";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export function VerifiedStudentBadge({ university }: { university?: string | null }) {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        Verified student{university ? ` · ${university}` : ""}
      </Text>
    </View>
  );
}

const messageOf = (error: unknown, fallback: string) => {
  const message = (error as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
  return (Array.isArray(message) ? message.join(", ") : message) || fallback;
};

/** Student proves a university address with a 6-digit code to earn the badge. */
export function StudentVerificationCard({ user }: { user: UserDto }) {
  const styles = useThemedStyles(createStyles);
  const typography = useProfileTypography();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");
  const send = useUsersControllerSendStudentEmailCode();
  const verify = useUsersControllerVerifyStudentEmail();

  if (user.studentVerified) return null;

  const sendCode = () =>
    send.mutate(
      { data: { email: email.trim() } },
      {
        onSuccess: () => {
          setError("");
          setCode("");
          setSentTo(email.trim());
        },
        onError: (e) => setError(messageOf(e, "We couldn't send the code.")),
      },
    );

  const checkCode = () =>
    verify.mutate(
      { data: { code } },
      {
        onSuccess: () => {
          setError("");
          queryClient.invalidateQueries({ queryKey: getAuthControllerCurrentUserQueryKey() });
        },
        onError: (e) => setError(messageOf(e, "We couldn't check the code.")),
      },
    );

  return (
    <View style={styles.card}>
      <ProfileSectionTitle>Verify your student status</ProfileSectionTitle>
      <Text style={typography.metadata}>
        Get a verified student badge that landlords see when you apply. For now only University of St Andrews emails (@st-andrews.ac.uk) can be verified.
      </Text>
      {!sentTo ? (
        <>
          <ProfileTextField
            label="University email"
            placeholder="you@st-andrews.ac.uk"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          <ProfilePrimaryButton title="Send code" onPress={sendCode} disabled={!email.trim()} loading={send.isPending} />
        </>
      ) : (
        <>
          <ProfileTextField
            label="Verification code"
            helperText={`We sent a 6-digit code to ${sentTo}. It expires in 15 minutes.`}
            placeholder="123456"
            value={code}
            onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
          />
          <ProfilePrimaryButton title="Verify" onPress={checkCode} disabled={code.length !== 6} loading={verify.isPending} />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setSentTo("");
              setError("");
            }}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>Use another email or get a new code</Text>
          </Pressable>
        </>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    card: {
      gap: 12,
      padding: 18,
      borderWidth: 1.25,
      borderColor: colors.border,
      borderRadius: PROFILE_LAYOUT.cardRadius,
    },
    badge: {
      alignSelf: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      backgroundColor: colors.successBg,
    },
    badgeText: {
      color: colors.success,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600",
    },
    linkButton: {
      alignSelf: "center",
      paddingVertical: 6,
    },
    linkText: {
      color: colors.accent,
      fontSize: 14,
      lineHeight: 19,
      fontWeight: "600",
    },
    error: {
      color: colors.danger,
      fontSize: 13,
      lineHeight: 18,
    },
  });
