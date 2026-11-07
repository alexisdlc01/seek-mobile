import { Box } from "@/components/ui/box";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { PlusIcon, ArrowLeftIcon } from "lucide-react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { useConversationControllerGetConversation } from "@/src/api/seek-api/conversation";
import { Loader } from "@/components/custom/loader";
import { Divider } from "@/components/ui/divider";
import { FlatList, Share } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack/index";
import { Avatar } from "@/components/ui/avatar";
import { Image } from "expo-image"
import { useEffect, useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { getApplicationControllerGetAllMyApplicationsQueryKey, useApplicationControllerDeleteApplication, useApplicationControllerGetByConversation } from "@/src/api/seek-api/application";
import { queryClient } from "@/app/_layout";
import { errorToast } from "@/src/utils/error-toast";
import { useToast } from "@/components/ui/toast";
import { SuccessToast } from "@/components/custom/success-toast";
import { getApplicationLink } from "@/components/links";
import { createApplicationInvite, isApplicationAdmin } from "@/src/utils/application-invite";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";

export default function ChatDetails() {
  const { id: idParam } = useLocalSearchParams<{ id?: string }>();
  const id = idParam ?? "";
  const router = useRouter();
  const shareToast = useToast();
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: conversation,
    isLoading: loadingConversation,
    isError: errorConversation
  } = useConversationControllerGetConversation(id);
  const {
    data: application,
    isLoading: loadingApplication,
    isError: errorApplication
  } = useApplicationControllerGetByConversation(id);
  const { data: currentUser } = useAuthControllerCurrentUser();

  // Only group admins (creator, and landlord once sent) may mint an invite,
  // so only they are shown the control that does it.
  const canInvite = isApplicationAdmin(application, currentUser?._id);

  const isLoading = loadingApplication || loadingConversation;
  const isError = errorApplication || errorConversation;

  useEffect(() => {
    if (isError) {
      router.replace("/(app)/(tabs)/messages");
    }
  }, [isError, router]);

  async function handleShare() {
    if (!application) return;
    try {
      // Mint a fresh invite so the shared link carries a secret, and so any
      // previously shared link stops working. The route id is the
      // conversation; invites and joins work on the application.
      const { inviteToken } = await createApplicationInvite(application._id);
      await Share.share({
        message: `Join my application on Seek!`,
        url: getApplicationLink(application._id, inviteToken),
      });
    } catch {
      errorToast({
        toast: shareToast,
        data: { message: "Could not create an invite link.", statusCode: -1 },
      });
    }
  }

  if (!id) {
    return <Redirect href="/(app)/(tabs)/messages" />;
  }

  return (
    <Loader isLoading={isLoading}>
      <SafeAreaView className="p-6">
        <VStack className="h-full gap-2">
          <Box className="flex items-center justify-between flex-row gap-4">
            <Pressable onPressIn={() => router.back()}>
              <Icon as={ArrowLeftIcon} size="xl" />
            </Pressable>
            <Text bold size="xl" className="text-ellipsis line-clamp-1 flex-shrink">
              {conversation?.name ?? "Chat"}
            </Text>
            {canInvite ? (
              <Pressable onPress={handleShare} accessibilityLabel="Share an invite">
                <Icon as={PlusIcon} size="xl" />
              </Pressable>
            ) : (
              <Box className="w-6" />
            )}
          </Box>

          <Box className="flex-row">
            <Button
              variant="link"
              action="negative"
              size="lg"
              onPress={() => setOpen(true)}
            >
              <ButtonText>Delete Application</ButtonText>
            </Button>
          </Box>

          <Divider />

          <FlatList
            className="mt-2"
            showsVerticalScrollIndicator={false}
            data={conversation?.users}
            renderItem={({ item }) => (
              <HStack className="flex-row items-center justify-between">
                <Box className="flex-row items-center gap-4">
                  <Avatar className="overflow-hidden" size="md">
                    <Image
                      source={{ uri: item.profilePicUrl }}
                      placeholderContentFit="cover"
                      contentFit="cover"
                      transition={200}
                      style={{ width: "100%", height: "100%" }}
                      placeholder={require("@/assets/images/avatar.jpg")}
                    />
                  </Avatar>

                  <Text size="md" bold>
                    {item.name}
                  </Text>
                </Box>
                {item._id === application?.owner || item._id === application?.landlord ? (
                  <Box className="rounded-full bg-primary-500 px-3 py-1">
                    <Text size="sm" bold className="text-typography-0">
                      Admin
                    </Text>
                  </Box>
                ) : null}
              </HStack>
            )}
          />
        </VStack>
        {application?._id && (
          <DeleteGroupModal open={open} setOpen={setOpen} applicationId={application?._id} />
        )}
      </SafeAreaView>
    </Loader>
  );
}



type DeleteGroupModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  applicationId: string;
}

function DeleteGroupModal({
  open,
  setOpen,
  applicationId: groupId
}: DeleteGroupModalProps) {
  const { mutate } = useApplicationControllerDeleteApplication({
    mutation: {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: getApplicationControllerGetAllMyApplicationsQueryKey()
        });
      }
    }
  });

  const toast = useToast();
  const router = useRouter();
  function handleDelete() {
    setOpen(false);
    mutate({ id: groupId }, {
      onError(error) {
        errorToast({ toast, data: error.response?.data });
      },
      onSuccess() {
        toast.show({
          placement: "top",
          render: (props) => <SuccessToast {...props} message="Deleted application." />
        });
        router.replace("/(app)/(tabs)/messages");
      }
    });
  }

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      closeOnOverlayClick
      size="xs"
    >
      <ModalBackdrop
        style={{ backgroundColor: "rgba(80, 80, 80, 0.5)" }}
      />
      <ModalContent className="gap-2 w-[80%] rounded-xl">
        <ModalHeader>
          <Text size="xl" bold>
            Confirm Application Deletion
          </Text>
          <ModalCloseButton hitSlop={4} onPress={() => setOpen(false)}>
            <Icon
              size="lg"
              as={CloseIcon}
              className="stroke-background-500"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text className="text-center">
            Are you sure you want to delete this application?
          </Text>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button action="negative" size="lg" onPress={() => handleDelete()}>
            <ButtonText className="text-white">Delete Application</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
