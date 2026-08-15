import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
  profileTypography,
} from "@/components/custom/profile-screen";
import { Text } from "@/components/ui/text";
import { ErrorToast } from "@/components/custom/error-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import { useToast } from "@/components/ui/toast";
import { useAuthControllerForgotPassword } from "@/src/api/seek-api/auth";
import { isValidEmail, normalizeEmail } from "@/src/utils/validate-email";
import React, { useState } from "react";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useAuthControllerForgotPassword();
  const toast = useToast();

  const handleSubmit = () => {
    mutate(
      { data: { email: normalizeEmail(email) } },
      {
        onSuccess({ message }) {
          toast.show({
            placement: "top",
            render: (props) => <SuccessToast {...props} message={message} />,
          });
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

  return (
    <ProfileScreen title="Reset Password">
      <Text style={profileTypography.body}>
        Enter your email and we’ll send you a password reset link.
      </Text>
      <ProfileTextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={
          email.length > 0 && !isValidEmail(email)
            ? "Enter a valid email address."
            : undefined
        }
      />
      <ProfilePrimaryButton
        title="Send Link"
        onPress={handleSubmit}
        loading={isPending}
        disabled={!isValidEmail(email)}
      />
    </ProfileScreen>
  );
}
