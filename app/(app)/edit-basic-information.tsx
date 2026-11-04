import { queryClient } from "@/app/_layout";
import {
  ProfilePrimaryButton,
  ProfileScreen,
  ProfileTextField,
  profileTypography,
} from "@/components/custom/profile-screen";
import { Loader } from "@/components/custom/loader";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { PROFILE_COLORS } from "@/constants/design";
import { useProfilePicture } from "@/hooks/use-profile-photo";
import {
  getAuthControllerCurrentUserQueryKey,
  useAuthControllerCurrentUser,
} from "@/src/api/seek-api/auth";
import {
  useUsersControllerSetProfilePic,
  useUsersControllerUpdateCurrentUser,
} from "@/src/api/seek-api/users";
import { UserDto } from "@/src/api/seek-api/model";
import { errorToast } from "@/src/utils/error-toast";
import { uploadFile } from "@/src/utils/upload-file";
import { useAuth } from "@/src/store/auth-store";
import { SuccessToast } from "@/components/custom/success-toast";
import { CameraIcon } from "lucide-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const USERNAME_PATTERN = /^[A-Za-z0-9._-]{3,30}$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{5,30}$/;

function isValidCalendarDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function refreshCurrentUser(updatedUser: UserDto) {
  queryClient.setQueryData(
    getAuthControllerCurrentUserQueryKey(),
    updatedUser,
  );
  queryClient.invalidateQueries({
    queryKey: getAuthControllerCurrentUserQueryKey(),
  });
}

export default function EditBasicInformationScreen() {
  const { data: user, isLoading } = useAuthControllerCurrentUser();

  return (
    <Loader isLoading={isLoading || !user}>
      {user ? <EditBasicInformationForm user={user} /> : null}
    </Loader>
  );
}

function EditBasicInformationForm({
  user,
}: {
  user: UserDto;
}) {
  const toast = useToast();
  const accessToken = useAuth((state) => state.accessToken);
  const [name, setName] = useState(user.name ?? "");
  const [username, setUsername] = useState(user.username ?? "");
  const [email] = useState(user.email ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(
    user.dateOfBirth?.slice(0, 10) ?? "",
  );
  const [universityDetails, setUniversityDetails] = useState(
    user.universityDetails ?? "",
  );
  const [showImagePicker, setShowImagePicker] = useState(false);
  const { pickImage, image } = useProfilePicture(user.profilePicUrl);
  const { mutate: updateProfile, isPending } =
    useUsersControllerUpdateCurrentUser();
  const { mutate: updateProfilePicture, isPending: isUploadingPhoto } =
    useUsersControllerSetProfilePic();

  const errors = useMemo(() => {
    return {
      name: name.trim() ? undefined : "Name is required.",
      username:
        username.trim() && !USERNAME_PATTERN.test(username.trim())
          ? "Use 3–30 letters, numbers, dots, underscores, or hyphens."
          : undefined,
      phone:
        phone.trim() && !PHONE_PATTERN.test(phone.trim())
          ? "Enter a valid phone number."
          : undefined,
      dateOfBirth:
        dateOfBirth.trim() && !isValidCalendarDate(dateOfBirth.trim())
          ? "Use a valid date in YYYY-MM-DD format."
          : undefined,
      universityDetails:
        universityDetails.trim().length > 200
          ? "University details must be 200 characters or fewer."
          : undefined,
    };
  }, [dateOfBirth, name, phone, universityDetails, username]);

  const hasErrors = Object.values(errors).some(Boolean);

  const handlePhoto = useCallback(
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
            onSuccess: refreshCurrentUser,
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

  const save = () => {
    if (hasErrors) return;

    updateProfile(
      {
        data: {
          name: name.trim(),
          username: username.trim(),
          phone: phone.trim(),
          dateOfBirth: dateOfBirth.trim(),
          universityDetails: universityDetails.trim(),
        },
      },
      {
        onSuccess(updatedUser) {
          refreshCurrentUser(updatedUser);
          toast.show({
            placement: "top",
            render: (props) => (
              <SuccessToast {...props} message="Profile updated" />
            ),
          });
        },
        onError(error) {
          errorToast({ toast, data: error.response?.data });
        },
      },
    );
  };

  return (
    <>
      <ProfileScreen title="Edit Basic Information">
        <View style={styles.photoSection}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
            disabled={isUploadingPhoto}
            onPress={() => setShowImagePicker(true)}
            style={styles.avatarButton}
          >
            <Avatar size="2xl" style={styles.avatar}>
              <AvatarFallbackText>{name || user.name}</AvatarFallbackText>
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
          <Text style={profileTypography.metadata}>
            {isUploadingPhoto ? "Uploading photo…" : "Tap to change photo"}
          </Text>
        </View>

        <ProfileTextField
          label="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          returnKeyType="next"
          error={errors.name}
        />
        <ProfileTextField
          label="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="e.g. alex.smith"
          error={errors.username}
        />
        <ProfileTextField
          label="Email"
          value={email}
          editable={false}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          helperText="Changing your email needs confirmation from the new address. Use Settings to start that."
        />
        <ProfileTextField
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="e.g. +44 7700 900000"
          error={errors.phone}
        />
        <ProfileTextField
          label="Date of birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          keyboardType="numbers-and-punctuation"
          placeholder="YYYY-MM-DD"
          maxLength={10}
          error={errors.dateOfBirth}
        />
        <ProfileTextField
          label="University details"
          value={universityDetails}
          onChangeText={setUniversityDetails}
          autoCapitalize="sentences"
          placeholder="University, course, or year of study"
          maxLength={200}
          multiline
          inputStyle={styles.universityField}
          error={errors.universityDetails}
          helperText={`${universityDetails.length}/200`}
        />

        <ProfilePrimaryButton
          title="Save Changes"
          onPress={save}
          disabled={hasErrors || isUploadingPhoto}
          loading={isPending}
        />
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
          <ActionsheetItem onPress={() => handlePhoto(true)}>
            <ActionsheetItemText>Take Photo</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handlePhoto(false)}>
            <ActionsheetItemText>Choose from Library</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}

const styles = StyleSheet.create({
  photoSection: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  avatarButton: {
    position: "relative",
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
  universityField: {
    minHeight: 100,
  },
});
