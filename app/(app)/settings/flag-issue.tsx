import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
} from "@/components/custom/profile-screen";
import { SuccessToast } from "@/components/custom/success-toast";
import { useToast } from "@/components/ui/toast";
import React, { useState } from "react";

export default function FlagIssueScreen() {
  const toast = useToast();
  const [issue, setIssue] = useState("");
  const [accountName, setAccountName] = useState("");

  const submit = () => {
    if (!issue.trim()) return;
    toast.show({
      placement: "top",
      duration: 3000,
      render: (props) => (
        <SuccessToast
          {...props}
          message="Flag sent successfully. Thanks for reporting!"
        />
      ),
    });
    setIssue("");
    setAccountName("");
  };

  return (
    <ProfileScreen title="Flag an Issue">
      <ProfileTextField
        label="Explain the issue"
        value={issue}
        onChangeText={setIssue}
        placeholder="Please describe the issue in detail…"
        multiline
      />
      <ProfileTextField
        label="Account name (optional)"
        value={accountName}
        onChangeText={setAccountName}
        placeholder="Name of the account"
        autoCapitalize="words"
      />
      <ProfilePrimaryButton
        title="Submit"
        onPress={submit}
        disabled={!issue.trim()}
      />
    </ProfileScreen>
  );
}
