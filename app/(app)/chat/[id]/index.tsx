import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon/index";
import { ArrowUpIcon, InfoIcon, ArrowLeftIcon } from "lucide-react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FlatList, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native-gesture-handler";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/src/store/auth-store";
import { useFocusEffect } from "@react-navigation/native";
import { errorToast } from "@/src/utils/error-toast";
import { useToast } from "@/components/ui/toast";
import { getConversationControllerGetConversationQueryKey, useConversationControllerGetConversation, useConversationControllerSendMessage } from "@/src/api/seek-api/conversation";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { queryClient } from "@/app/_layout";
import { ConversationDto, MessageDto, MessageDtoMessageType, UserDto } from "@/src/api/seek-api/model";
import { Loader } from "@/components/custom/loader";

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


  const { id: conversationId } = useLocalSearchParams<{ id?: string }>();
  if (!conversationId) {
    console.log("no conversation id");
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  const { data: conversation, isError, isLoading: loadingMessages } = useConversationControllerGetConversation(conversationId, {});
  const { data: user, isError: isUserError, isLoading: loadingUser } = useAuthControllerCurrentUser();
  const isLoading = loadingMessages || loadingUser;

  const { mutate } = useSendMessage(user!, conversationId);
  const addMessage = useAddMessage(conversationId);

  useEffect(() => {
    if (isError || isUserError) {
      console.log("failed to get messages")
      router.navigate("/(app)/(tabs)/home");
    }
  }, [isError, isUserError]);

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
    mutate({
      id,
      data: {
        message
      }
    }, {
      onError(error) {
        errorToast({ toast, data: error.response?.data })
      }
    });
  }

  useEffect(() => {
    const client = io(`${BACKEND_URL}/converstaion`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
        // @ts-ignore
        mobile: true,
      },
      transports: ["websocket"]
    });

    clientRef.current = client;

    client.emit(EventNames.JOIN, () => {
      console.log("join emitted")
    })
    client.on(EventNames.NEW_MESSAGE, (message: MessageDto) => {
      addMessage(message);
    });

    return () => { client.disconnect(); };
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <SafeAreaView className="p-6">
        <VStack className="h-full gap-2">
          <Box className="flex items-center justify-between flex-row gap-4">
            <Pressable onPressIn={() => router.back()}>
              <Icon as={ArrowLeftIcon} size="xl" />
            </Pressable>
            <Text bold
              size="xl"
              className="line-clamp-1 text-ellipsis flex-shrink">
              {conversation?.name ?? "Chat"}
            </Text>
            <Pressable onPressIn={() => router.push(`/chat/${conversationId}/details`)}>
              <Icon as={InfoIcon} size="xl" />
            </Pressable>
          </Box>

          {/* Messages */}
          <FlatList
            showsVerticalScrollIndicator={false}
            className="h-full"
            contentContainerClassName="gap-2"
            decelerationRate="fast"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10
            }}
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


function useSendMessage(user: UserDto, conversationId: string) {
  return useConversationControllerSendMessage({
    mutation: {
      async onMutate(newMessage) {
        const tempDto: MessageDto = {
          _id: new Date().toString(),
          sender: user!,
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
              messages: [...last.messages, tempDto]
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

function useAddMessage(conversationId: string) {
  return (message: MessageDto) => {
    queryClient.setQueryData<ConversationDto>(
      getConversationControllerGetConversationQueryKey(conversationId),
      (last) => {
        if (!last) return last;
        if (last.messages.find(el => el._id === message._id)) return last;
        return {
          ...last,
          messages: [...last.messages, message]
        }
      }
    );
  }
}
