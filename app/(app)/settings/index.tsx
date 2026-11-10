import {
  ProfileActionRow,
  ProfileScreen,
  useProfileTypography,
} from "@/components/custom/profile-screen";
import { queryClient } from "@/app/_layout";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import type { SeekColors } from "@/constants/seek-theme";
import { useSeekTheme, useThemedStyles } from "@/hooks/use-seek-theme";
import { useAuthControllerLogout } from "@/src/api/seek-api/auth";
import { useUsersControllerDeleteMe } from "@/src/api/seek-api/users";
import { useAuth } from "@/src/store/auth-store";
import { useRouter } from "expo-router";
import {
  KeyRoundIcon,
  LogOutIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react-native";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const styles = useThemedStyles(createStyles);
  const colors = useSeekTheme();
  const profileTypography = useProfileTypography();
  const router = useRouter();
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const logout = useAuth((state) => state.logout);
  const { mutate: logoutServer, isPending: isLoggingOut } =
    useAuthControllerLogout();
  const { mutate: deleteAccount, isPending: isDeleting } =
    useUsersControllerDeleteMe();
  const iconProps = {
    color: colors.accent,
    size: 22,
    strokeWidth: 2,
  };

  const handleLogout = () => {
    if (isLoggingOut) {
      return;
    }

    logoutServer(undefined, {
      onSettled: () => {
        logout();
        queryClient.clear();
        router.replace("/(app)/(tabs)/map");
      },
    });
  };

  const handleDeleteAccount = () => {
    if (isDeleting) {
      return;
    }

    deleteAccount(undefined, {
      onSuccess: () => {
        setShowDeleteAccount(false);
        logout();
        queryClient.clear();
        router.replace("/(app)/(tabs)/map");
      },
      onError: (error) => {
        setShowDeleteAccount(false);
        Alert.alert(
          "Account not deleted",
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Something went wrong. Please try again.",
        );
      },
    });
  };

  return (
    <>
      <ProfileScreen title="Settings" scroll={false}>
        <View style={styles.rows}>
          <ProfileActionRow
            title="Modify Password"
            icon={<KeyRoundIcon {...iconProps} />}
            onPress={() => router.navigate("/(app)/settings/modify-password")}
          />
          <ProfileActionRow
            title="Reset Password"
            subtitle="Send a reset link to your email"
            icon={<RotateCcwIcon {...iconProps} />}
            onPress={() => router.navigate("/(app)/settings/reset-password")}
          />
          <ProfileActionRow
            title="Permissions"
            icon={<ShieldCheckIcon {...iconProps} />}
            onPress={() => router.navigate("/(app)/settings/permissions")}
          />
          <ProfileActionRow
            title={isLoggingOut ? "Logging out…" : "Log Out"}
            icon={<LogOutIcon {...iconProps} />}
            showChevron={false}
            onPress={handleLogout}
          />
          <ProfileActionRow
            title="Delete Account"
            icon={
              <Trash2Icon color={colors.danger} size={22} strokeWidth={2} />
            }
            destructive
            showChevron={false}
            onPress={() => setShowDeleteAccount(true)}
          />
        </View>
      </ProfileScreen>

      <Modal
        isOpen={showDeleteAccount}
        onClose={() => setShowDeleteAccount(false)}
        closeOnOverlayClick
        size="sm"
      >
        <ModalBackdrop />
        <ModalContent style={styles.modalContent}>
          <ModalHeader>
            <Text style={profileTypography.sectionTitle}>Delete account?</Text>
          </ModalHeader>
          <ModalBody>
            <Text style={profileTypography.body}>
              Account deletion is permanent. Are you sure you want to continue?
            </Text>
          </ModalBody>
          <ModalFooter style={styles.modalFooter}>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => setShowDeleteAccount(false)}
              style={styles.modalButton}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              action="negative"
              onPress={handleDeleteAccount}
              isDisabled={isDeleting}
              style={styles.modalButton}
            >
              <ButtonText style={styles.deleteText}>
                {isDeleting ? "Deleting…" : "Delete Account"}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const createStyles = (colors: SeekColors) =>
  StyleSheet.create({
    rows: {
      gap: 12,
    },
    modalContent: {
      width: "88%",
      borderRadius: 20,
      backgroundColor: colors.surface,
    },
    modalFooter: {
      justifyContent: "flex-end",
      gap: 10,
    },
    modalButton: {
      borderRadius: 999,
    },
    deleteText: {
      color: "#FFFFFF",
    },
  });
