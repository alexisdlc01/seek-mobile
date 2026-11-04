import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { FlatList } from "react-native";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon/index";
import { Users2Icon, ArrowRightIcon } from "lucide-react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Pressable } from "@/components/ui/pressable";
import { useRouter } from "expo-router";
import { useApplicationControllerGetAllMyApplications } from "@/src/api/seek-api/application";
import { Loader } from "@/components/custom/loader";
import { ApplicationDto } from "@/src/api/seek-api/model";
import { useMemo } from "react";
import { PROFILE_COLORS } from "@/constants/design";
import { AuthRequiredScreen } from "@/components/custom/auth-required";

export default function MessagesScreen() {
  return (
    <AuthRequiredScreen
      title="Sign up to start messaging"
      description="Create an account to join application groups and message about listings."
    >
      <AuthenticatedMessagesScreen />
    </AuthRequiredScreen>
  );
}

function AuthenticatedMessagesScreen() {
  const { data: applications, isLoading } = useApplicationControllerGetAllMyApplications();

  return (
    <SafeAreaView className="h-full bg-background-0">
      <Loader isLoading={isLoading}>
        <FlatList
          className="px-6"
          ListHeaderComponent={
            <Text bold size="2xl" className="text-center pb-4">
              Messages
            </Text>
          }
          data={applications ?? []}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => <MessageItem data={item} />}
          ListEmptyComponent={() => (
            <Text className="text-center text-primary-100 text-xl">
              No groups yet.{'\n'}Start an application to get a group.
            </Text>
          )}
        />
      </Loader>
    </SafeAreaView>
  );
}

type MessageItemProps = {
  data: ApplicationDto;
};

function MessageItem({ data }: MessageItemProps) {
  function LeaveButton() {
    return (
      <Box className="bg-red-600 p-2 items-center">
        <Icon as={ArrowRightIcon} fill="white" size="xl" />
        <Text className="text-primary-950">Leave</Text>
      </Box>
    );
  }

  const time = useMemo(() => {
    if (!data.conversation.lastMessage) {
      return undefined;
    }
    const date = new Date(data.conversation.lastMessage.createdAt);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`
  }, [data]);

  const router = useRouter();

  return (
    <Swipeable friction={2} renderRightActions={() => <LeaveButton />}>
      <Pressable onPress={() => router.push(`/(app)/chat/${data.conversation._id}`)}>
        <HStack className="p-4 gap-6">
          <Box className="bg-background-400 w-10 h-10 rounded-full items-center justify-center text-center">
            <Icon
              as={Users2Icon}
              color={PROFILE_COLORS.accent}
              fill={PROFILE_COLORS.accent}
              size="xl"
            />
          </Box>
          <Box className="bg-primary-100" />
          <VStack className="flex-1">
            <Text bold>{data.conversation.name}</Text>
          </VStack>
          <Box>
            <Text size="sm" className="text-background-300">
              {time}
            </Text>
          </Box>
        </HStack>
      </Pressable>
    </Swipeable>
  );
}
