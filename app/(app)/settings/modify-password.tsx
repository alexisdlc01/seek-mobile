import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
} from "@/components/custom/profile-screen";
import { queryClient } from "@/app/_layout";
import { ErrorToast } from "@/components/custom/error-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import { useToast } from "@/components/ui/toast";
import { authControllerChangePassword } from "@/src/api/seek-api/auth";
import type {
  ChangePasswordDto,
  MessageResponseDto,
} from "@/src/api/seek-api/model";
import { useAuth } from "@/src/store/auth-store";
import type { ErrorType } from "@/src/utils/custom-axios";
import {
  isValidPassword,
  PASSWORD_REQUIREMENTS,
} from "@/src/utils/validate-password";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function ModifyPasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const logout = useAuth((state) => state.logout);
  const router = useRouter();
  const { mutate, isPending } = useMutation<
    MessageResponseDto,
    ErrorType,
    ChangePasswordDto
  >({
    mutationFn: (data) => authControllerChangePassword(data),
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
  });
  const passwordError =
    password.length > 0 && !isValidPassword(password)
      ? PASSWORD_REQUIREMENTS
      : undefined;
  const confirmationError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? "Passwords do not match."
      : undefined;

  return (
    <ProfileScreen title="Modify Password">
      <ProfileTextField
        label="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Enter your current password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
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
        title="Confirm"
        onPress={() => mutate({ currentPassword, newPassword: password })}
        loading={isPending}
        disabled={
          currentPassword.length === 0 ||
          !isValidPassword(password) ||
          confirmPassword !== password ||
          Boolean(passwordError || confirmationError)
        }
      />
    </ProfileScreen>
  );
}
