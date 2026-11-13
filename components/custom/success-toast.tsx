import { ToastComponentProps } from "@gluestack-ui/core/lib/esm/toast/creator/types";
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { CheckCircleIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

type SuccessToastProps = {
  message: string;
} & ToastComponentProps;

export function SuccessToast({ message }: SuccessToastProps) {
  const _message =
    message && message.length > 0
      ? message
      : "Successfully completed operation";

  return (
    <Toast action="success" style={{ backgroundColor: "#222222" }}>
      <HStack className="gap-4 items-center">
        <Box>
          <Icon color="green" size="xl" as={CheckCircleIcon} />
        </Box>
        <VStack>
          <HStack style={{ justifyContent: "space-between" }}>
            <ToastTitle style={{ color: "#fff" }}>Success</ToastTitle>
            {/* <Pressable onPress={() => toast.close(id)}> */}
            {/*   <Icon color="white" size="lg" as={CloseCircleIcon} /> */}
            {/* </Pressable> */}
          </HStack>
          <ToastDescription accessibilityLiveRegion="polite">
            <Text>{_message}</Text>
          </ToastDescription>
        </VStack>
      </HStack>
    </Toast>
  );
}
