import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { LinkText } from "@/components/ui/link";
import { useProgress } from "@/components/custom/progress-bar";
import { useCallback, useEffect, useState } from "react";
import { Pressable } from "@/components/ui/pressable";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfilePicture } from "@/hooks/use-profile-photo";
import { UserPlusIcon } from "lucide-react-native";
import { errorToast } from "@/src/utils/error-toast";
import { useSignupState } from "@/src/store/signup-store";
import { uploadFile } from "@/src/utils/upload-file";
import { useToast } from "@/components/ui/toast";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { useAuth } from "@/src/store/auth-store";
import { AuthGaurd } from "@/components/custom/auth-gaurd";
import { usersControllerSetProfilePic } from "@/src/api/seek-api/users";

export default function ProfilePhoto() {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(0.95);
  }, [setProgress]);

  const userId = useSignupState((state) => state.data.userId);
  const clearSignupState = useSignupState((state) => state.clear);
  const accessToken = useAuth((state) => state.accessToken);
  const toast = useToast();
  const { pickImage, image } = useProfilePicture();
  const [show, setShow] = useState(false);
  const handlePick = useCallback(
    async (camera: boolean) => {
      if (!accessToken || !userId) {
        errorToast({
          toast,
          data: {
            message: "Your signup session is incomplete.",
            statusCode: 401,
          },
        });
        return;
      }

      const image = await pickImage(camera);
      if (image == null) {
        errorToast({
          toast,
          data: { message: "No file data found.", statusCode: -1 },
        });
        setShow(false);
        return;
      }

      const mimeType = image.mimeType ?? "image/*";
      let fileUrl: string;
      try {
        const data = await uploadFile({
          uri: image.uri,
          mimeType,
          name: `${userId}-profile`,
          folder: "public",
          access_token: accessToken,
        });
        fileUrl = data.fileUrl;
      } catch {
        errorToast({
          toast,
          data: { message: "Failed to upload file.", statusCode: -1 },
        });
        return;
      }

      try {
        await usersControllerSetProfilePic({ url: fileUrl });
      } catch {
        errorToast({
          toast,
          data: {
            message: "Failed to update profile photo.",
            statusCode: -1,
          },
        });
      }
      setShow(false);
    },
    [accessToken, pickImage, toast, userId],
  );

  return (
    <AuthGaurd>
      <VStack className="gap-8 px-4 py-20 items-center h-full justify-between">
        <Pressable onPress={() => setShow(true)}>
          <Avatar
            size="2xl"
            style={{
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
            className="bg-background-200 items-center justify-center overflow-hidden"
          >
            {image ? (
              <AvatarImage
                source={{ uri: image }}
                alt="Profile Photo"
                resizeMode="cover"
              />
            ) : (
              <UserPlusIcon size="33%" color="white" />
            )}
          </Avatar>
        </Pressable>

        <Link href="/(app)/(tabs)/map" onPress={clearSignupState}>
          <LinkText size="lg" className="text-secondary-700">
            Done for now
          </LinkText>
        </Link>
        <Actionsheet isOpen={show} onClose={() => setShow(false)} useRNModal>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={() => handlePick(true)}>
              <ActionsheetItemText>Take Photo</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={() => handlePick(false)}>
              <ActionsheetItemText>Choose from Library</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </VStack>
    </AuthGaurd>
  );
}
