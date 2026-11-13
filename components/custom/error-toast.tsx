import { ErrorDto } from "@/src/api/seek-api/model";
import { ToastComponentProps } from "@gluestack-ui/core/lib/esm/toast/creator/types";
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { AlertCircleIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

type ErrorToastProps = {
  error?: ErrorDto;
} & ToastComponentProps;

export function ErrorToast({ error }: ErrorToastProps) {
  const message =
    error?.message && error?.message.length > 0
      ? error?.message
      : "Something went wrong. Please try again.";

  return (
    <Toast action="error" style={{ backgroundColor: "#222222" }}>
      <HStack className="gap-4 items-center">
        <Box>
          <Icon color="red" size="xl" as={AlertCircleIcon} />
        </Box>
        <VStack>
          <HStack style={{ justifyContent: "space-between" }}>
            <ToastTitle style={{ color: "#fff" }}>Error Occurred</ToastTitle>
            {/* <Pressable onPress={() => toast.close(id)}> */}
            {/*   <Icon color="white" size="lg" as={CloseCircleIcon} /> */}
            {/* </Pressable> */}
          </HStack>
          <ToastDescription accessibilityLiveRegion="assertive">
            <Text>{message}</Text>
          </ToastDescription>
        </VStack>
      </HStack>
    </Toast>
  );
}
