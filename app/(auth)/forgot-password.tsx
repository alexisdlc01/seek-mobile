import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/custom/back-button";
import { EmailInput } from "@/components/custom/email-input";
import { useState } from "react";
import { isValidEmail, normalizeEmail } from "@/src/utils/validate-email";
import { useAuthControllerForgotPassword } from "@/src/api/seek-api/auth";
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { SuccessToast } from "@/components/custom/success-toast";

export default function ForgotPassword() {
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
            render: (props) => <SuccessToast {...props} message={message ?? "Check your email."} />,
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
    <SafeAreaView className="h-full bg-background-0">
      <VStack className="gap-8 p-6">
        <BackButton title="Reset Password" fallbackHref="/(auth)/login" />

        <EmailInput email={email} setEmail={setEmail} />

        <FormControl>
          <Button
            className="rounded-xl"
            size="lg"
            onPress={handleSubmit}
            isDisabled={!isValidEmail(email) || isPending}
          >
            <ButtonText>
              {isPending ? "Sending…" : "Send Reset Link"}
            </ButtonText>
          </Button>
        </FormControl>
      </VStack>
    </SafeAreaView>
  );
}
