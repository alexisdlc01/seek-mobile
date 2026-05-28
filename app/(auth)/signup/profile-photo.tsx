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
import { useSignupState } from "./state";
import { uploadFile } from "@/src/utils/upload-file";
import { useToast } from "@/components/ui/toast";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText } from "@/components/ui/actionsheet";
import axios from "axios";
import { SetProfilePicDto } from "@/src/api/seek-api/model";

export default function ProfilePhoto() {
  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(0.95);
  }, []);

  const { userId, access_token } = useSignupState(state => state.data);
  const toast = useToast();
  const { pickImage, image } = useProfilePicture();
  const [show, setShow] = useState<boolean>(false)
  const handlePick = useCallback(async (camera: boolean) => {
    const image = await pickImage(camera);
    if (image == null) {
      errorToast({ toast, data: { message: "No file data found.", statusCode: -1 } })
      setShow(false);
      return;
    }

    // upload the file
    const mimeType = image.mimeType ?? "image/*";
    let fileUrl: string;
    try {
      const data = await uploadFile({
        uri: image.uri,
        mimeType,
        name: `${userId}-profile`,
        folder: "public",
        access_token
      });
      fileUrl = data.fileUrl;
    } catch {
      errorToast({ toast, data: { message: "Failed to upload file.", statusCode: -1 } });
      return;
    }

    // update the user profile
    try {
      const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";
      await axios.put<any, any, SetProfilePicDto>(`${BASE_URL}/users/setProfilePic`, {
        url: fileUrl
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          platform: "mobile"
        }
      });
    } catch (error) {
      console.error(error);
      errorToast({ toast, data: { message: "Failed to update profile photo", statusCode: -1 } });
    }
    setShow(false);
  }, []);


  return (
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

      <Link href="/(app)/(tabs)/home">
        <LinkText size="lg" className="text-secondary-700">
          Done for now
        </LinkText>
      </Link>
      <Link href="/(auth)/signup/otp">
        <LinkText size="lg" className="text-secondary-700">
          DEV: Back
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
  );
}
