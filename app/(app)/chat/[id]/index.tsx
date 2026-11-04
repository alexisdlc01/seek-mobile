import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon/index";
import { ArrowUpIcon, ArrowLeftIcon, EllipsisVerticalIcon } from "lucide-react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Alert, FlatList, KeyboardAvoidingView, Platform, Pressable as RNPressable, Share } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native-gesture-handler";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/src/store/auth-store";
import { errorToast } from "@/src/utils/error-toast";
import { useToast } from "@/components/ui/toast";
import { getConversationControllerGetConversationQueryKey, useConversationControllerGetConversation, useConversationControllerSendMessage } from "@/src/api/seek-api/conversation";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { queryClient } from "@/app/_layout";
import { ConversationDto, ErrorDto, MessageDto, UserDto } from "@/src/api/seek-api/model";
import { Loader } from "@/components/custom/loader";
import { getApplicationControllerGetAllMyApplicationsQueryKey, useApplicationControllerGetByConversation } from "@/src/api/seek-api/application";
import { createApplicationInvite, isApplicationAdmin, leaveApplication } from "@/src/utils/application-invite";
import { getApplicationLink } from "@/components/links";

enum EventNames {
  NEW_MESSAGE = "message:new",
  JOIN = "conversation:join",
}

const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000"

// function addMessage(message: MessageDto) {
//   queryClient.setQueryData<MessageDto[]>(
//     getConversationControllerGetMessagesQueryKey(),
//     (messages) => {
//       if (!messages) return messages;
//       if (messages.find(elem => elem._id === message._id)) return messages;
//       return [
//         ...messages,
//         message
//       ]
//     }
//   )
// }
//
// function removeMessage(id: string) {
//   queryClient.setQueryData<MessageDto[]>(
//     getConversationControllerGetMessagesQueryKey(),
//     (messages) => {
//       return messages?.filter(m => m._id !== id);
//     }
//   )
// }


export default function ChatScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const accessToken = useAuth(state => state.accessToken);

  const clientRef = useRef<Socket>(null);
  const toast = useToast();


  const { id } = useLocalSearchParams<{ id?: string }>();
  const conversationId = id ?? "";

  const { data: conversation, isError, isLoading: loadingMessages } = useConversationControllerGetConversation(conversationId, {});
  const { data: user, isError: isUserError, isLoading: loadingUser } = useAuthControllerCurrentUser();
  const isLoading = loadingMessages || loadingUser;

  const { mutate } = useSendMessage(user, conversationId);
  const addMessage = useAddMessage(conversationId, user?._id);
  const listRef = useRef<FlatList<MessageDto>>(null);

  useEffect(() => {
    if (isError || isUserError) {
      console.log("failed to get messages")
      router.navigate("/(app)/(tabs)/map");
    }
  }, [isError, isUserError, router]);

  const [message, setMessage] = useState<string>("");
  function sendMessage(id: string) {
    if (!user) return;
    if (message.length === 0) {
      return;
    }
    if (!clientRef.current) {
      errorToast({ toast, data: { statusCode: -1, message: "Cannot send message, not connected to room." } });
      return;
    }

    setMessage("");
    // Jump straight to the newest message rather than animating there.
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
    mutate({
      id,
      data: {
        message
      }
    }, {
      onError(error) {
        errorToast({
          toast,
          data: error.response?.data as ErrorDto | undefined,
        });
      }
    });
  }

  useEffect(() => {
    if (!conversationId || !accessToken) return;

    const client = io(`${BACKEND_URL}/conversation`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        platform: "mobile",
      },
      transports: ["websocket"]
    });

    clientRef.current = client;

    client.emit(EventNames.JOIN, conversationId);
    client.on(EventNames.NEW_MESSAGE, (message: MessageDto) => {
      addMessage(message);
    });

    return () => { client.disconnect(); };
  }, [accessToken, addMessage, conversationId]);

  if (!conversationId) {
    return <Redirect href="/(app)/(tabs)/map" />;
  }

  return (
    <Loader isLoading={isLoading}>
      <SafeAreaView className="p-6">
        <VStack className="h-full gap-2">
          <Box className="z-10 flex items-center justify-between flex-row gap-4">
            <Pressable onPressIn={() => router.back()}>
              <Icon as={ArrowLeftIcon} size="xl" />
            </Pressable>
            <Text bold
              size="xl"
              className="line-clamp-1 text-ellipsis flex-shrink">
              {conversation?.name ?? "Chat"}
            </Text>
            <ChatMenu conversationId={conversationId} userId={user?._id} />
          </Box>

          {/* Messages */}
          <FlatList
            ref={listRef}
            showsVerticalScrollIndicator={false}
            className="h-full"
            contentContainerClassName="gap-2"
            decelerationRate="fast"
            inverted
            data={conversation?.messages ?? []}
            keyExtractor={item => item._id}
            renderItem={({ item: { sender, data } }) => (
              <Box className={`${user?._id === sender._id ? "items-end" : "items-start"}`}>
                <Text className="w-fit flex-shrink">{sender.name}</Text>
                <Box className="bg-gray-300 rounded-md p-2 max-w-[66%]">
                  <Text className="w-fit flex-shrink">{data}</Text>
                </Box>
              </Box>
            )}
          />

          {/* Input */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={top + bottom}
          >
            <Input variant="rounded" size="lg">
              <InputField placeholder="Message..."
                value={message}
                onSubmitEditing={() => sendMessage(conversationId)}
                onChangeText={setMessage} />
              <InputSlot className="pr-3"
                onPressIn={() => sendMessage(conversationId)}>
                <InputIcon as={ArrowUpIcon} size="xl" />
              </InputSlot>
            </Input>
          </KeyboardAvoidingView>
        </VStack>
      </SafeAreaView>
    </Loader>
  );
}


function useSendMessage(user: UserDto | undefined, conversationId: string) {
  return useConversationControllerSendMessage({
    mutation: {
      async onMutate(newMessage) {
        if (!user) throw new Error("Cannot send a message without a user");
        const tempDto: MessageDto = {
          _id: `${PENDING_PREFIX}${Date.now()}`,
          sender: user,
          messageType: "Text",
          data: newMessage.data.message,
          createdAt: new Date().toString(),
          conversation: conversationId,
          seenUsers: [],
          deliveredTo: []
        }

        await queryClient.cancelQueries({ queryKey: getConversationControllerGetConversationQueryKey(conversationId) });

        const previous = queryClient.getQueryData(getConversationControllerGetConversationQueryKey(conversationId));

        queryClient.setQueryData<ConversationDto>(
          getConversationControllerGetConversationQueryKey(conversationId),
          (last) => {
            if (!last) return last;
            return {
              ...last,
              messages: [tempDto, ...last.messages]
            }
          }
        );

        return { previous };
      },
      onError(_, __, ctx) {
        queryClient.setQueryData(
          getConversationControllerGetConversationQueryKey(conversationId),
          ctx?.previous
        );
      },
      onSettled() {
        queryClient.invalidateQueries({
          queryKey: getConversationControllerGetConversationQueryKey(conversationId)
        });
      }
    }
  })
}

const PENDING_PREFIX = "pending-";

function useAddMessage(conversationId: string, userId: string | undefined) {
  return useCallback((message: MessageDto) => {
    queryClient.setQueryData<ConversationDto>(
      getConversationControllerGetConversationQueryKey(conversationId),
      (last) => {
        if (!last) return last;
        if (last.messages.find(el => el._id === message._id)) return last;

        // Our own message coming back from the server: swap it in for the
        // optimistic copy in place, so the list doesn't add a row and jump.
        if (message.sender._id === userId) {
          const pendingIndex = findLastIndex(last.messages, (el) =>
            el._id.startsWith(PENDING_PREFIX) && el.data === message.data
          );
          if (pendingIndex !== -1) {
            const messages = [...last.messages];
            messages[pendingIndex] = message;
            return { ...last, messages };
          }
        }

        return {
          ...last,
          messages: [message, ...last.messages]
        }
      }
    );
  }, [conversationId, userId]);
}

function findLastIndex<T>(items: T[], predicate: (item: T) => boolean) {
  for (let i = items.length - 1; i >= 0; i--) {
    if (predicate(items[i])) return i;
  }
  return -1;
}

type ChatMenuProps = {
  conversationId: string;
  userId: string | undefined;
};

/** The ⋮ menu in a group chat's header. */
function ChatMenu({ conversationId, userId }: ChatMenuProps) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const { data: application } = useApplicationControllerGetByConversation(conversationId);

  const isOwner = Boolean(userId) && application?.owner === userId;
  const canInvite = isApplicationAdmin(application, userId);
  const canLeave =
    Boolean(userId) && !isOwner && Boolean(application?.applicants.includes(userId!));

  function close() {
    setOpen(false);
  }

  function openDetails() {
    close();
    router.push(`/(app)/chat/${conversationId}/details`);
  }

  async function invite() {
    close();
    if (!application) return;
    try {
      // A fresh invite each time, so any link shared before stops working.
      const { inviteToken } = await createApplicationInvite(application._id);
      await Share.share({
        message: "Join my application on Seek!",
        url: getApplicationLink(application._id, inviteToken),
      });
    } catch {
      errorToast({
        toast,
        data: { message: "Could not create an invite link.", statusCode: -1 },
      });
    }
  }

  function leave() {
    close();
    if (!application) return;
    Alert.alert("Leave group?", "You'll stop seeing this application's chat.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Leave",
        style: "destructive",
        onPress: async () => {
          try {
            await leaveApplication(application._id);
            await queryClient.invalidateQueries({
              queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
            });
            router.replace("/(app)/(tabs)/messages");
          } catch {
            errorToast({
              toast,
              data: { message: "Could not leave the group.", statusCode: -1 },
            });
          }
        },
      },
    ]);
  }

  return (
    <Box>
      <Pressable onPress={() => setOpen(value => !value)} hitSlop={8}>
        <Icon as={EllipsisVerticalIcon} size="xl" />
      </Pressable>
      {open ? (
        <>
          {/* Tapping anywhere else closes the menu. */}
          <RNPressable
            onPress={close}
            style={{ position: "absolute", top: -1000, left: -2000, width: 4000, height: 4000 }}
          />
          <VStack className="absolute right-0 top-8 z-50 w-48 rounded-xl bg-white py-1 shadow-hard-5">
            <MenuItem label="Group details" onPress={openDetails} />
            {canInvite ? <MenuItem label="Invite" onPress={() => void invite()} /> : null}
            {canLeave ? <MenuItem label="Leave group" onPress={leave} destructive /> : null}
          </VStack>
        </>
      ) : null}
    </Box>
  );
}

function MenuItem({
  label,
  onPress,
  destructive = false,
}: {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <RNPressable onPress={onPress} className="px-4 py-3">
      <Text className={destructive ? "text-red-600" : "text-primary-500"}>{label}</Text>
    </RNPressable>
  );
}
