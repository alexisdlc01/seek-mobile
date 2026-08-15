import { Loader } from "@/components/custom/loader";
import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
} from "@/components/custom/profile-screen";
import { ErrorToast } from "@/components/custom/error-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import { useToast } from "@/components/ui/toast";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { useContactControllerContact } from "@/src/api/seek-api/contact";
import React, { useState } from "react";

export default function ContactScreen() {
  const { data: user, isLoading } = useAuthControllerCurrentUser();
  const { mutate, isPending } = useContactControllerContact();
  const toast = useToast();
  const [message, setMessage] = useState("");
  const messageError =
    message.length > 0 && !message.trim() ? "Enter a message." : undefined;

  const submit = () => {
    if (!user || !message.trim()) return;
    mutate(
      { data: { message: message.trim(), name: user.name, email: user.email } },
      {
        onSuccess() {
          setMessage("");
          toast.show({
            placement: "top",
            render: (props) => (
              <SuccessToast {...props} message="Message sent" />
            ),
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
    <Loader isLoading={isLoading || !user}>
      <ProfileScreen title="Contact">
        <ProfileTextField
          label="Send a message to us"
          value={message}
          onChangeText={setMessage}
          placeholder="How can we help?"
          multiline
          error={messageError}
        />
        <ProfilePrimaryButton
          title="Send"
          onPress={submit}
          disabled={!message.trim()}
          loading={isPending}
        />
      </ProfileScreen>
    </Loader>
  );
}
