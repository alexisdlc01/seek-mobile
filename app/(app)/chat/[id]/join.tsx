import { Box } from '@/components/ui/box';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { CheckCircleIcon, Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text'
import React, { useCallback, useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useApplicationControllerJoinApplication } from '@/src/api/seek-api/application';
import { Loader } from '@/components/custom/loader';
import { useToast } from '@/components/ui/toast';
import { errorToast } from '@/src/utils/error-toast';

export default function ApplicationAddedPage() {
  const { id: idParam } = useLocalSearchParams<{ id?: string }>();
  const id = idParam ?? "";
  const { mutate } = useApplicationControllerJoinApplication();
  const [isLoadingJoin, setLoadingJoin] = useState<boolean>(true);
  const toast = useToast();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      mutate({ id }, {
        onError(error) {
          errorToast({ toast, data: error.response?.data });
          router.replace("/(app)/(tabs)/home");
        },
        onSettled() {
          setLoadingJoin(false);
        }
      });
    }, [id, mutate, router, toast])
  );

  const isLoading = isLoadingJoin;

  if (!id) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Loader isLoading={isLoading} message='Joining application...'>
        <Box className="flex-1 px-6">
          <Center className="flex-1">
            <VStack className="items-center w-full" space="xl">

              <Box className="bg-green-100 p-6 rounded-full">
                <Icon
                  as={CheckCircleIcon}
                  className="text-green-600 w-16 h-16"
                />
              </Box>

              <VStack className="items-center" space="xs">
                <Heading className="text-3xl text-slate-900 text-center font-bold">
                  Success!
                </Heading>
                <Text className="text-lg text-slate-600 text-center">
                  You have been added an application.
                </Text>
              </VStack>

              <VStack className="w-full mt-8" space="md">
                <Button
                  className="rounded-xl self-center"
                  onPress={() => router.replace("/(app)/(tabs)/messages")}
                >
                  <ButtonText className="font-semibold text-lg">
                    Go to Chat
                  </ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Center>
        </Box>
      </Loader>
    </SafeAreaView>
  );
}
