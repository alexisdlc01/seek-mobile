import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
} from "@/components/custom/profile-screen";
import { ErrorToast } from "@/components/custom/error-toast";
import { SuccessToast } from "@/components/custom/success-toast";
import { useToast } from "@/components/ui/toast";
import { reportIssue } from "@/src/utils/report-issue";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const MAX_ISSUE_LENGTH = 5000;
const MAX_ACCOUNT_LENGTH = 120;

export default function FlagIssueScreen() {
  const toast = useToast();
  const [issue, setIssue] = useState("");
  const [accountName, setAccountName] = useState("");

  const { mutate, isPending } = useMutation({ mutationFn: reportIssue });

  const issueError =
    issue.length > MAX_ISSUE_LENGTH
      ? `Please keep this under ${MAX_ISSUE_LENGTH} characters.`
      : undefined;
  const accountError =
    accountName.length > MAX_ACCOUNT_LENGTH
      ? `Please keep this under ${MAX_ACCOUNT_LENGTH} characters.`
      : undefined;
  const hasErrors = Boolean(issueError || accountError);

  const submit = () => {
    if (!issue.trim() || hasErrors) return;

    const reportedAccount = accountName.trim();
    mutate(
      {
        message: issue.trim(),
        ...(reportedAccount ? { reportedAccount } : {}),
      },
      {
        onSuccess() {
          setIssue("");
          setAccountName("");
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
        },
        onError(error: any) {
          toast.show({
            placement: "top",
            render: (props) => (
              <ErrorToast {...props} error={error?.response?.data} />
            ),
          });
        },
      },
    );
  };

  return (
    <ProfileScreen title="Flag an Issue">
      <ProfileTextField
        label="Explain the issue"
        value={issue}
        onChangeText={setIssue}
        placeholder="Please describe the issue in detail…"
        multiline
        error={issueError}
      />
      <ProfileTextField
        label="Account name (optional)"
        value={accountName}
        onChangeText={setAccountName}
        placeholder="Name of the account"
        autoCapitalize="words"
        error={accountError}
      />
      <ProfilePrimaryButton
        title="Submit"
        onPress={submit}
        disabled={!issue.trim() || hasErrors}
        loading={isPending}
      />
    </ProfileScreen>
  );
}
