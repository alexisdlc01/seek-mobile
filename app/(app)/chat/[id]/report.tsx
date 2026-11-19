import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileSectionTitle,
  ProfileTextField,
} from "@/components/custom/profile-screen";
import { SelectBoxInput } from "@/components/custom/select-box-input";
import { SuccessToast } from "@/components/custom/success-toast";
import { useToast } from "@/components/ui/toast";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { useConversationControllerGetConversation } from "@/src/api/seek-api/conversation";
import { useFlagsControllerCreate } from "@/src/api/seek-api/flags";
import { CreateFlagDtoCategory } from "@/src/api/seek-api/model";
import { errorToast } from "@/src/utils/error-toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

const MAX_TEXT_LENGTH = 5000;

const CATEGORIES = [
  { label: "Inappropriate behaviour", value: CreateFlagDtoCategory.INNAPPROPRIATE_BEHAVIOUR },
  { label: "Other", value: CreateFlagDtoCategory.OTHER },
];

/** Report another participant of this chat (POST /flags). */
export default function ReportScreen() {
  const { id = "" } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const toast = useToast();
  const { data: conversation } = useConversationControllerGetConversation(id);
  const { data: currentUser } = useAuthControllerCurrentUser();
  const { mutate, isPending } = useFlagsControllerCreate();

  const [reportedUser, setReportedUser] = useState("");
  const [category, setCategory] = useState<string>(CreateFlagDtoCategory.INNAPPROPRIATE_BEHAVIOUR);
  const [text, setText] = useState("");

  const others = (conversation?.users ?? [])
    .filter((user) => user._id !== currentUser?._id)
    .map((user) => ({ label: user.name, value: user._id }));
  const textError =
    text.length > MAX_TEXT_LENGTH ? `Please keep this under ${MAX_TEXT_LENGTH} characters.` : undefined;
  const canSubmit = Boolean(reportedUser && text.trim() && !textError);

  function submit() {
    if (!canSubmit) return;
    mutate(
      { data: { reportedUser, category: category as CreateFlagDtoCategory, text: text.trim() } },
      {
        onSuccess() {
          toast.show({
            placement: "top",
            duration: 3000,
            render: (props) => <SuccessToast {...props} message="Report sent. Thank you." />,
          });
          router.back();
        },
        onError(error) {
          errorToast({ toast, data: error.response?.data });
        },
      },
    );
  }

  return (
    <ProfileScreen title="Report someone" fallbackHref={{ pathname: "/(app)/chat/[id]", params: { id } }}>
      <ProfileSectionTitle>Who?</ProfileSectionTitle>
      <SelectBoxInput options={others} value={reportedUser} onChange={setReportedUser} />
      <ProfileSectionTitle>Reason</ProfileSectionTitle>
      <SelectBoxInput options={CATEGORIES} value={category} onChange={setCategory} />
      <ProfileTextField
        label="What happened?"
        value={text}
        onChangeText={setText}
        placeholder="Describe what happened…"
        multiline
        error={textError}
      />
      <ProfilePrimaryButton title="Send report" onPress={submit} disabled={!canSubmit} loading={isPending} />
    </ProfileScreen>
  );
}
