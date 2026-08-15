import { queryClient } from "@/app/_layout";
import {
  ProfileActionRow,
  ProfileScreen,
  profileTypography,
} from "@/components/custom/profile-screen";
import { errorToast } from "@/src/utils/error-toast";
import { Loader } from "@/components/custom/loader";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { PROFILE_COLORS } from "@/constants/design";
import { useProfilePicture } from "@/hooks/use-profile-photo";
import {
  getAuthControllerCurrentUserQueryKey,
  useAuthControllerCurrentUser,
  useAuthControllerLogout,
} from "@/src/api/seek-api/auth";
import { UserDto } from "@/src/api/seek-api/model";
import { useUsersControllerSetProfilePic } from "@/src/api/seek-api/users";
import { useAuth } from "@/src/store/auth-store";
import { uploadFile } from "@/src/utils/upload-file";
import { Redirect, useRouter } from "expo-router";
import {
  CameraIcon,
  CircleHelpIcon,
  FileTextIcon,
  LogOutIcon,
  PencilLineIcon,
  ScaleIcon,
  SettingsIcon,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AuthRequiredScreen } from "@/components/custom/auth-required";

export default function ProfileScreenRoute() {
  return (
    <AuthRequiredScreen
      title="Sign up to create your profile"
      description="Create an account to manage your details, documents, and account settings."
    >
      <AuthenticatedProfileScreen />
    </AuthRequiredScreen>
  );
}

function AuthenticatedProfileScreen() {
  const { data, isLoading, isError } = useAuthControllerCurrentUser();

  if (isError) {
    return <Redirect href="/(app)/(tabs)/home" />;
  }

  return (
    <Loader isLoading={isLoading || !data}>
      <ProfileContent user={data!} />
    </Loader>
  );
}

function ProfileContent({ user }: { user: UserDto }) {
  const router = useRouter();
  const toast = useToast();
  const localLogout = useAuth((state) => state.logout);
  const accessToken = useAuth((state) => state.accessToken);
  const { mutate: updateProfilePicture } = useUsersControllerSetProfilePic();
  const { mutate: remoteLogout, isPending: isLoggingOut } =
    useAuthControllerLogout();
  const { pickImage, image } = useProfilePicture(user.profilePicUrl);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handlePick = useCallback(
    async (camera: boolean) => {
      const selectedImage = await pickImage(camera);
      if (!selectedImage) {
        setShowImagePicker(false);
        return;
      }

      try {
        const uploaded = await uploadFile({
          uri: selectedImage.uri,
          mimeType: selectedImage.mimeType ?? "image/jpeg",
          name: `${user._id}-profile`,
          folder: "public",
          access_token: accessToken,
        });

        updateProfilePicture(
          { data: { url: uploaded.fileUrl } },
          {
            onSuccess(updatedUser) {
              queryClient.setQueryData(
                getAuthControllerCurrentUserQueryKey(),
                updatedUser,
              );
              queryClient.invalidateQueries({
                queryKey: getAuthControllerCurrentUserQueryKey(),
              });
            },
            onError(error) {
              errorToast({ toast, data: error.response?.data });
            },
          },
        );
      } catch {
        errorToast({
          toast,
          data: { message: "Failed to upload file.", statusCode: -1 },
        });
      } finally {
        setShowImagePicker(false);
      }
    }, [accessToken, pickImage, toast, updateProfilePicture, user._id],
  );

  const confirmLogout = () => {
    remoteLogout(undefined, {
      onSettled: () => {
        setShowLogout(false);
        localLogout();
        queryClient.clear();
        router.replace("/(app)/(tabs)/home");
      },
    });
  };

  const iconProps = {
    color: PROFILE_COLORS.accent,
    size: 22,
    strokeWidth: 2,
  };

  return (
    <>
      <ProfileScreen
        title="Profile"
        showBack={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
            onPress={() => setShowImagePicker(true)}
            style={styles.avatarButton}
          >
            <Avatar size="2xl" style={styles.avatar}>
              <AvatarFallbackText>{user.name}</AvatarFallbackText>
              {image || user.profilePicUrl ? (
                <AvatarImage
                  key={image ?? user.profilePicUrl}
                  source={{ uri: image ?? user.profilePicUrl }}
                />
              ) : null}
            </Avatar>
            <View style={styles.cameraBadge}>
              <CameraIcon color="#FFFFFF" size={18} strokeWidth={2.25} />
            </View>
          </Pressable>
          <Text style={profileTypography.heroName}>{user.name}</Text>
          {user.username ? (
            <Text style={profileTypography.metadata}>@{user.username}</Text>
          ) : null}
        </View>

        <View style={styles.rows}>
          <ProfileActionRow
            title="Personal Information"
            subtitle="Identity and supporting documents"
            icon={<FileTextIcon {...iconProps} />}
            onPress={() => router.push("/(app)/personal-info")}
          />
          <ProfileActionRow
            title="Edit Basic Information"
            subtitle="Photo, contact and university details"
            icon={<PencilLineIcon {...iconProps} />}
            onPress={() => router.push("/(app)/edit-basic-information")}
          />
          <ProfileActionRow
            title="Settings"
            icon={<SettingsIcon {...iconProps} />}
            onPress={() => router.push("/(app)/settings")}
          />
          <ProfileActionRow
            title="Legal"
            icon={<ScaleIcon {...iconProps} />}
            onPress={() => router.push("/(app)/legal")}
          />
          <ProfileActionRow
            title="Help"
            icon={<CircleHelpIcon {...iconProps} />}
            onPress={() => router.push("/(app)/settings/help")}
          />
          <ProfileActionRow
            title="Logout"
            icon={
              <LogOutIcon
                color={PROFILE_COLORS.danger}
                size={22}
                strokeWidth={2}
              />
            }
            destructive
            showChevron={false}
            onPress={() => setShowLogout(true)}
          />
        </View>
      </ProfileScreen>

      <Actionsheet
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        useRNModal
      >
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

      <Modal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        closeOnOverlayClick={!isLoggingOut}
        size="sm"
      >
        <ModalBackdrop />
        <ModalContent style={styles.modalContent}>
          <ModalHeader>
            <Text style={profileTypography.sectionTitle}>Log out?</Text>
          </ModalHeader>
          <ModalBody>
            <Text style={profileTypography.body}>
              Are you sure you want to log out of Seek?
            </Text>
          </ModalBody>
          <ModalFooter style={styles.modalFooter}>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => setShowLogout(false)}
              isDisabled={isLoggingOut}
              style={styles.modalButton}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={confirmLogout}
              isDisabled={isLoggingOut}
              style={styles.modalButton}
            >
              {isLoggingOut ? <ButtonSpinner /> : null}
              <ButtonText style={styles.logoutButtonText}>Logout</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 0,
    gap: 12,
  },
  hero: {
    minHeight: 236,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  avatarButton: {
    position: "relative",
    marginBottom: 4,
  },
  avatar: {
    borderWidth: 2,
    borderColor: PROFILE_COLORS.border,
    backgroundColor: "#D9E9FF",
  },
  cameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: PROFILE_COLORS.background,
    backgroundColor: PROFILE_COLORS.accent,
  },
  rows: {
    gap: 12,
  },
  modalContent: {
    width: "86%",
    borderRadius: 20,
    backgroundColor: PROFILE_COLORS.surface,
  },
  modalFooter: {
    justifyContent: "flex-end",
    gap: 10,
  },
  modalButton: {
    borderRadius: 999,
    minWidth: 105,
  },
  logoutButtonText: {
    color: PROFILE_COLORS.surface,
  },
});
