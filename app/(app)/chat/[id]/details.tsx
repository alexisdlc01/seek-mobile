import { Box } from "@/components/ui/box";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { PlusIcon, ArrowLeftIcon, UserCircleIcon } from "lucide-react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "@/components/ui/pressable";
import { useConversationControllerGetConversation } from "@/src/api/seek-api/conversation";
import { Loader } from "@/components/custom/loader";
import { Divider } from "@/components/ui/divider";
import { FlatList, Share } from "react-native";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
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
import { getApplicationControllerGetAllMyApplicationsQueryKey, useApplicationControllerDeleteApplication, useApplicationControllerGetApplication, useApplicationControllerGetByConversation } from "@/src/api/seek-api/application";
import { queryClient } from "@/app/_layout";
import { errorToast } from "@/src/utils/error-toast";
import { useToast } from "@/components/ui/toast";
import { SuccessToast } from "@/components/custom/success-toast";
import { getApplicationLink } from "@/components/links";

export default function ChatDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  if (!id) {
    return <Redirect href="/(app)/(tabs)/messages" />
  }

  const router = useRouter();

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

  const isLoading = loadingApplication || loadingConversation;
  const isError = errorApplication || errorConversation;

  useEffect(() => {
    if (isError) {
      router.replace("/(app)/(tabs)/messages");
    }
  }, [isError]);

  const [open, setOpen] = useState<boolean>(false);

  function handleShare() {
    if (!id) return;
    Share.share({
      message: `Check out this listing on Seek!`,
      url: getApplicationLink(id),
    });
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
            <Pressable onPress={handleShare}>
              <Icon as={PlusIcon} size="xl" />
            </Pressable>
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
                <Box className="flex-row items-center border-0 rounded-xl bg-transparent overflow-hidden">
                  <Pressable>
                    <Text size="md" bold className="bg-red-500 text-white p-2">
                      Make Admin
                    </Text>
                  </Pressable>
                  <Pressable>
                    <Text size="md" bold className="bg-gray-300 text-black p-2">
                      Kick Out
                    </Text>
                  </Pressable>
                </Box>
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
