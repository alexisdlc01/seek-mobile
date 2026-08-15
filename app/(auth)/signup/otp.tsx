import { VStack } from "@/components/ui/vstack";
import { LinkText } from "@/components/ui/link";
import { useProgress } from "@/components/custom/progress-bar";
import AppleOTPInput from "@/components/custom/otp-input";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useEffect, useState } from "react";
import {
  useAuthControllerResendOtp,
  useAuthControllerVerifyEmail,
} from "@/src/api/seek-api/auth";
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { Link, useRouter } from "expo-router";
import { useSignupState } from "@/src/store/signup-store";
import { SuccessToast } from "@/components/custom/success-toast";
import { useAuth } from "@/src/store/auth-store";
import { Text } from "@/components/ui/text";

const OTP_LENGTH = 5;
const RESEND_COOLDOWN_SECONDS = 60;

export default function Otp() {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(0.5);
  }, [setProgress]);

  const router = useRouter();
  const [code, setCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const toast = useToast();
  const { userId, email } = useSignupState((state) => state.data);
  const login = useAuth((state) => state.login);

  useEffect(() => {
    if (!userId) {
      router.replace("/(auth)/signup");
    }
  }, [router, userId]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendCooldown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const { mutate: submitOtp, isPending: isVerifying } =
    useAuthControllerVerifyEmail();
  function handleSubmit() {
    submitOtp(
      {
        data: {
          userId,
          token: code,
        },
      },
      {
        onError(error) {
          toast.show({
            placement: "top",
            render: (props) => (
              <ErrorToast {...props} error={error.response?.data} />
            ),
          });
        },
        onSuccess({ access_token, refresh_token }) {
          if (!access_token || !refresh_token) {
            toast.show({
              placement: "top",
              render: (props) => (
                <ErrorToast
                  {...props}
                  error={{
                    statusCode: 500,
                    message: "Verification succeeded without a usable session.",
                  }}
                />
              ),
            });
            return;
          }

          router.replace("/(auth)/signup/profile-photo");
          login({
            accessToken: access_token,
            refreshToken: refresh_token,
          });
        },
      },
    );
  }

  const { mutate: resendOtp, isPending: isResending } =
    useAuthControllerResendOtp();
  function handleResend() {
    resendOtp(
      {
        data: {
          userId,
        },
      },
      {
        onError(error) {
          toast.show({
            placement: "top",
            render: (props) => (
              <ErrorToast {...props} error={error.response?.data} />
            ),
          });
        },
        onSuccess({ message }) {
          setResendCooldown(RESEND_COOLDOWN_SECONDS);
          toast.show({
            placement: "top",
            render: (props) => (
              <SuccessToast message={message} {...props} />
            ),
          });
        },
      },
    );
  }

  if (!userId) {
    return null;
  }

  return (
    <VStack className="gap-8 px-4 py-20 items-center h-full justify-between">
      <VStack className="gap-4">
        <Text className="text-center">
          Enter the verification code sent to {email}.
        </Text>
        <AppleOTPInput setCode={setCode} code={code} />
        <Box className="flex flex-row justify-between">
          <Button
            className="self-center"
            variant="outline"
            onPress={handleResend}
            isDisabled={isResending || resendCooldown > 0}
          >
            <ButtonText>
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : isResending
                  ? "Resending…"
                  : "Resend"}
            </ButtonText>
          </Button>
          <Button
            className="self-center"
            onPress={handleSubmit}
            isDisabled={code.length !== OTP_LENGTH || isVerifying}
          >
            <ButtonText>{isVerifying ? "Verifying…" : "Submit"}</ButtonText>
          </Button>
        </Box>
      </VStack>
      <Link href="/(auth)/login">
        <LinkText size="lg" className="text-secondary-700">
          Return to login
        </LinkText>
      </Link>
    </VStack>
  );
}
