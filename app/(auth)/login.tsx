import { FormControl } from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { LinkText } from "@/components/ui/link";
import { Link, useRouter } from "expo-router";
import { create } from "zustand";
import { useAuthControllerLogin } from "@/src/api/seek-api/auth";
import { isValidPassword } from "@/src/utils/validate-password";
import { PasswordInput } from "@/components/custom/password-input";
import { useToast } from "@/components/ui/toast";
import { ErrorToast } from "@/components/custom/error-toast";
import { EmailInput } from "@/components/custom/email-input";
import { useAuth } from "@/src/store/auth-store";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoginForm {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const useLogin = create<LoginForm>((set) => ({
  email: "",
  password: "",
  setEmail: (email: string) => {
    set({ email });
  },
  setPassword: (password: string) => {
    set({ password });
  },
}));

export default function Login() {
  const { email, password, setEmail, setPassword } = useLogin((state) => state);

  function isValid() {
    return email.length > 0 && password.length > 0 && isValidPassword(password);
  }

  const { mutate } = useAuthControllerLogin();
  const toast = useToast();
  const login = useAuth((state) => state.login);
  const router = useRouter();

  const handleSubmit = async () => {
    mutate(
      { data: { email: email + "@st-andrews.ac.uk", password } },
      {
        onSuccess: (data) => {
          const { access_token, refresh_token } = data;
          login({
            accessToken: access_token,
            refreshToken: refresh_token,
          });
          console.log("[LOG] login successful")
          router.replace("/home");
        },
        onError: (err) => {
          console.log("[LOG] login failed", err);
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
    <SafeAreaView>
      <VStack className="gap-8 p-4">
        {/* Email */}
        <EmailInput setEmail={setEmail} email={email} />

        {/* Password */}
        <PasswordInput setPassword={setPassword} password={password} />

        <FormControl>
          <Button
            className="rounded-xl"
            size="lg"
            onPress={handleSubmit}
            isDisabled={!isValid()}
          >
            <ButtonText>Login</ButtonText>
          </Button>
        </FormControl>

        <VStack className="gap-4 items-center">
          <Link href="/(auth)/forgot-password">
            <LinkText size="lg">Forgot Password?</LinkText>
          </Link>

          <Link href="/(auth)/signup">
            <LinkText size="lg">No account yet? Sign up.</LinkText>
          </Link>

          <Link href="/">
            <LinkText size="lg">DEV: Back to root</LinkText>
          </Link>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}
