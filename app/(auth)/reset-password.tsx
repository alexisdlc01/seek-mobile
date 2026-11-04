import { ErrorToast } from "@/components/custom/error-toast";
import { queryClient } from "@/app/_layout";
import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
  profileTypography,
} from "@/components/custom/profile-screen";
import { SuccessToast } from "@/components/custom/success-toast";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { useAuthControllerConfirmPasswordReset } from "@/src/api/seek-api/auth";
import { useAuth } from "@/src/store/auth-store";
import {
  isValidPassword,
  PASSWORD_REQUIREMENTS,
} from "@/src/utils/validate-password";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

function firstParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default function ConfirmResetPasswordScreen() {
  const params = useLocalSearchParams<{
    token?: string | string[];
    userId?: string | string[];
    id?: string | string[];
  }>();
  const token = firstParam(params.token);
  const userId = firstParam(params.userId) || firstParam(params.id);
  const hasValidLink = Boolean(token && userId);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { mutate, isPending } = useAuthControllerConfirmPasswordReset();
  const logout = useAuth((state) => state.logout);
  const toast = useToast();
  const router = useRouter();

  const passwordError =
    password.length > 0 && !isValidPassword(password)
      ? PASSWORD_REQUIREMENTS
      : undefined;
  const confirmationError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? "Passwords do not match."
      : undefined;

  const handleSubmit = () => {
    if (!hasValidLink) {
      return;
    }

    mutate(
      { data: { userId, token, newPassword: password } },
      {
        onSuccess({ message }) {
          logout();
          queryClient.clear();
          toast.show({
            placement: "top",
            render: (props) => <SuccessToast {...props} message={message} />,
          });
          router.replace("/(auth)/login");
        },
        onError(error) {
          toast.show({
            placement: "top",
            render: (props) => (
              <ErrorToast {...props} error={error.response?.data} />
            ),
          });
        },
      },
    );
  };

  if (!hasValidLink) {
    return (
      <ProfileScreen
        title="Reset Password"
        fallbackHref="/(auth)/login"
        alwaysReturnToFallback
      >
        <Text style={profileTypography.body}>
          This password reset link is invalid or incomplete. Request a new link
          and try again.
        </Text>
        <ProfilePrimaryButton
          title="Request a New Link"
          onPress={() => router.replace("/(auth)/forgot-password")}
        />
      </ProfileScreen>
    );
  }

  return (
    <ProfileScreen
      title="Reset Password"
      fallbackHref="/(auth)/login"
      alwaysReturnToFallback
    >
      <Text style={profileTypography.body}>
        Choose a new password for your account.
      </Text>
      <ProfileTextField
        label="New password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your new password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        error={passwordError}
        helperText={PASSWORD_REQUIREMENTS}
      />
      <ProfileTextField
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm your new password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        error={confirmationError}
      />
      <ProfilePrimaryButton
        title="Reset Password"
        onPress={handleSubmit}
        loading={isPending}
        disabled={
          !isValidPassword(password) || confirmPassword !== password
        }
      />
    </ProfileScreen>
  );
}
