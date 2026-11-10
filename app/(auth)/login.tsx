import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { LinkText } from "@/components/ui/link";
import { Link, Redirect, useRouter } from "expo-router";
import { useAuthControllerLogin } from "@/src/api/seek-api/auth";
import { PasswordInput } from "@/components/custom/password-input";
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { EmailInput } from "@/components/custom/email-input";
import { useAuth } from "@/src/store/auth-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { isValidEmail, normalizeEmail } from "@/src/utils/validate-email";
import { useSignupState } from "@/src/store/signup-store";
import { errorMessage } from "@/src/utils/tenancy-view";
import { Text } from "@/components/ui/text";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blocked, setBlocked] = useState<string | null>(null);
  const normalizedEmail = normalizeEmail(email);

  const { mutate, isPending } = useAuthControllerLogin();
  const toast = useToast();
  const login = useAuth((state) => state.login);
  const clearSignupState = useSignupState((state) => state.clear);
  const hasHydrated = useAuth((state) => state._hasHydrated);
  const isLoggedIn = useAuth(
    (state) => Boolean(state.accessToken) && Boolean(state.refreshToken),
  );
  const router = useRouter();

  const handleSubmit = () => {
    setBlocked(null);
    mutate(
      { data: { email: normalizedEmail, password } },
      {
        onSuccess: (data) => {
          const { access_token, refresh_token } = data;
          if (!access_token || !refresh_token) return;
          login({
            accessToken: access_token,
            refreshToken: refresh_token,
          });
          clearSignupState();
          router.replace("/(app)/(tabs)/map");
        },
        onError: (err) => {
          // 403 = landlord account on the mobile app: keep the server message on screen.
          if (err.response?.status === 403) {
            setBlocked(errorMessage(err));
            return;
          }
          toast.show({
            placement: "top",
            render: (props) => (
              <ErrorToast {...props} error={err.response?.data} />
            ),
          });
        },
      },
    );
  };

  if (!hasHydrated) {
    return null;
  }

  if (isLoggedIn) {
    return <Redirect href="/(app)/(tabs)/map" />;
  }

  const isSubmitDisabled =
    !isValidEmail(email) || password.length === 0 || isPending;

  return (
    <SafeAreaView className="flex-1">
      <VStack className="gap-8 p-4">
        {/* Email */}
        <EmailInput setEmail={setEmail} email={email} />

        {/* Password */}
        <PasswordInput
          setPassword={setPassword}
          password={password}
          returnKeyType="go"
          onSubmitEditing={() => {
            if (!isSubmitDisabled) handleSubmit();
          }}
        />

        {blocked ? (
          <Text accessibilityRole="alert" className="text-error-600">
            {blocked}
          </Text>
        ) : null}

        <FormControl>
          <Button
            className="rounded-xl"
            size="lg"
            onPress={handleSubmit}
            isDisabled={isSubmitDisabled}
          >
            <ButtonText>{isPending ? "Logging in…" : "Login"}</ButtonText>
          </Button>
        </FormControl>

        <VStack className="gap-4 items-center">
          <Link href="/(auth)/forgot-password">
            <LinkText size="lg">Forgot Password?</LinkText>
          </Link>

          <Link href="/(auth)/signup">
            <LinkText size="lg">No account yet? Sign up.</LinkText>
          </Link>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
