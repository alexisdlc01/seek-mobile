import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { CheckCircleIcon, Icon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';

function ApplicationSuccess() {
  const navigation = useRouter();

  return (
    <Box className="flex-1 bg-primary-0 p-6">
      <Center className="flex-1">
        <VStack space="xl" className="items-center text-center">
          {/* Success Icon */}
          <Box className="bg-success-100 p-6 rounded-full">
            <Icon as={CheckCircleIcon} size="xl" className="text-success-600" />
          </Box>

          {/* Message */}
          <VStack space="xs" className="items-center">
            <Heading size="2xl" className="text-primary-500 text-center">
              Application Sent!
            </Heading>
          </VStack>

          {/* Info Card */}
          <Box className="bg-primary-0 p-4 rounded-3xl w-full">
            <Text size="sm" className="text-neutral-800 text-center">
              The landlord in St Andrews will review your profile and documents shortly. You&apos;ll receive a push notification once they respond.
            </Text>
          </Box>
        </VStack>
      </Center>

      {/* Action Buttons */}
      <VStack space="md" className="mb-8">
        <Button
          size="lg"
          variant="solid"
          action="primary"
          className="rounded-full"
          onPress={() => navigation.navigate("/saved-listings")}
        >
          <ButtonText>View My Applications</ButtonText>
        </Button>
        <Button
          size="lg"
          variant="outline"
          action="secondary"
          className="rounded-full bg-primary-0"
          onPress={() => navigation.navigate('/home')}
        >
          <ButtonText>Back to Search</ButtonText>
        </Button>
      </VStack>
    </Box >
  );
};

export default ApplicationSuccess;
