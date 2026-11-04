import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { EmailInput } from "@/components/custom/email-input";
import { PasswordInput } from "@/components/custom/password-input";
import { isValidPassword } from "@/src/utils/validate-password";
import {
  authControllerCurrentUser,
  useAuthControllerSignup,
} from "@/src/api/seek-api/auth";
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { Input, InputField } from "@/components/ui/input";
import { Link, useRouter } from "expo-router";
import { LinkText } from "@/components/ui/link";
import { useEffect, useState } from "react";
import { useProgress } from "@/components/custom/progress-bar";
import { useSignupState } from "@/src/store/signup-store";
import { useAuth } from "@/src/store/auth-store";
import { isValidEmail, normalizeEmail } from "@/src/utils/validate-email";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setSignupState = useSignupState((state) => state.setState);
  const clearSignupState = useSignupState((state) => state.clear);
  const login = useAuth((state) => state.login);
  const normalizedEmail = normalizeEmail(email);
  const router = useRouter();

  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(0.05);
  }, [setProgress]);

  const { mutate, isPending } = useAuthControllerSignup();
  const toast = useToast();

  function isValid(): boolean {
    return (
      isValidEmail(normalizedEmail) &&
      password.length > 0 &&
      name.trim().length > 0 &&
      confirmPassword.length > 0 &&
      isValidPassword(password) &&
      password === confirmPassword
    );
  }

  const handleSubmit = () => {
    mutate(
      {
        data: {
          email: normalizedEmail,
          password,
          name: name.trim(),
        },
      },
      {
        async onSuccess(response) {
          if (response.verificationRequired) {
            if (!response.userId) {
              toast.show({
                placement: "top",
                render: (props) => (
                  <ErrorToast
                    {...props}
                    error={{
                      statusCode: 500,
                      message: "Signup succeeded, but verification could not start.",
                    }}
                  />
                ),
              });
              return;
            }

            setSignupState({
              email: normalizedEmail,
              userId: response.userId,
            });
            router.push("/(auth)/signup/otp");
            return;
          }

          if (!response.access_token || !response.refresh_token) {
            toast.show({
              placement: "top",
              render: (props) => (
                <ErrorToast
                  {...props}
                  error={{
                    statusCode: 500,
                    message: "Signup succeeded without a usable session.",
                  }}
                />
              ),
            });
            return;
          }

          try {
            const user = await authControllerCurrentUser({
              headers: {
                Authorization: `Bearer ${response.access_token}`,
              },
            });
            setSignupState({ email: normalizedEmail, userId: user._id });
            router.replace("/(auth)/signup/profile-photo");
            login({
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            });
          } catch {
            clearSignupState();
            login({
              accessToken: response.access_token,
              refreshToken: response.refresh_token,
            });
            router.replace("/(app)/(tabs)/map");
          }
        },
        onError: (err) => {
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

  return (
    <SafeAreaView className="flex-1">
      <VStack className="gap-8 p-4">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText size="lg">Name</FormControlLabelText>
          </FormControlLabel>
          <Input size="lg">
            <InputField
              value={name}
              placeholder="Enter your name"
              onChangeText={setName}
            />
          </Input>
        </FormControl>

        {/* Email */}
        <EmailInput setEmail={setEmail} email={email} />

        {/* Password */}
        <PasswordInput
          setPassword={setPassword}
          password={password}
          validateStrength
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          setPassword={setConfirmPassword}
          password={confirmPassword}
          validateStrength
        />

        <FormControl>
          <Button
            onPress={handleSubmit}
            isDisabled={!isValid() || isPending}
            size="lg"
          >
            <ButtonText>
              {isPending ? "Creating account…" : "Sign Up"}
            </ButtonText>
          </Button>
        </FormControl>

        <VStack className="gap-4 items-center">
          <Link href="/(auth)/login">
            <LinkText size="lg">
              Already have an account? Login.
            </LinkText>
          </Link>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
