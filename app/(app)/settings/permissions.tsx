import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Alert, AppState, Linking } from "react-native";
import { VStack } from "@/components/ui/vstack/index";
import { ProfileScreen } from "@/components/custom/profile-screen";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useFocusEffect } from "@react-navigation/native";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { Spinner } from "@/components/ui/spinner";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";

type PermissionsState = {
  location: boolean;
  camera: boolean;
  photos: boolean;
};

type PermissionKey = keyof PermissionsState;

const PERMISSION_LABELS: Record<PermissionKey, string> = {
  location: "Location",
  camera: "Camera",
  photos: "Photos",
};

export default function PermissionsScreen() {
  const openAppSettings = async () => {
    try {
      await Linking.openSettings();
    } catch {
      Alert.alert(
        "Unable to open Settings",
        "Open your device settings and update Seek permissions manually.",
      );
    }
  };

  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionsState>({
    location: false,
    camera: false,
    photos: false,
  });
  const [pendingPermission, setPendingPermission] =
    useState<PermissionKey | null>(null);
  const [loadError, setLoadError] = useState(false);

  const checkPermissions = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const [location, photos, camera] = await Promise.allSettled([
        Location.getForegroundPermissionsAsync(),
        ImagePicker.getMediaLibraryPermissionsAsync(),
        ImagePicker.getCameraPermissionsAsync(),
      ]);

      setPermissions((current) => ({
        location:
          location.status === "fulfilled"
            ? location.value.status === "granted"
            : current.location,
        camera:
          camera.status === "fulfilled"
            ? camera.value.status === "granted"
            : current.camera,
        photos:
          photos.status === "fulfilled"
            ? photos.value.status === "granted"
            : current.photos,
      }));

      setLoadError(
        location.status === "rejected" ||
          camera.status === "rejected" ||
          photos.status === "rejected",
      );
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void checkPermissions();
    }, [checkPermissions]),
  );

  useEffect(() => {
    const subs = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        void checkPermissions();
      }
    });
    return () => subs.remove();
  }, [checkPermissions]);

  const requestPermission = async (permission: PermissionKey) => {
    if (permissions[permission]) {
      await openAppSettings();
      return;
    }

    let response;
    try {
      response =
        permission === "location"
          ? await Location.requestForegroundPermissionsAsync()
          : permission === "camera"
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();
    } catch {
      Alert.alert(
        `${PERMISSION_LABELS[permission]} Permission`,
        "Seek could not open the system permission prompt. Try again or update access in Settings.",
        [
          { text: "Not Now", style: "cancel" },
          { text: "Open Settings", onPress: openAppSettings },
        ],
      );
      return;
    }

    if (response.status !== "granted" && response.canAskAgain === false) {
      Alert.alert(
        `${PERMISSION_LABELS[permission]} Permission`,
        "Permission was not granted. You can allow it later in Settings.",
        [
          { text: "Not Now", style: "cancel" },
          { text: "Open Settings", onPress: openAppSettings },
        ],
      );
    }
  };

  const handlePermissionToggle = (permission: PermissionKey) => {
    setPendingPermission(permission);
  };

  const closePermissionPrompt = () => {
    setPendingPermission(null);
  };

  const confirmPermissionChange = async () => {
    const permission = pendingPermission;
    if (!permission) {
      return;
    }

    setPendingPermission(null);
    try {
      await requestPermission(permission);
      await checkPermissions();
    } catch {
      setLoadError(true);
    }
  };

  const pendingLabel = pendingPermission
    ? PERMISSION_LABELS[pendingPermission]
    : "";
  const isPendingGranted = pendingPermission
    ? permissions[pendingPermission]
    : false;

  return (
    <>
      <ProfileScreen title="Permissions" scroll={false}>
        {loading ? (
          <VStack className="flex-1 items-center justify-center gap-3">
            <Spinner size="large" />
            <Text className="text-neutral-600">Loading permissions…</Text>
          </VStack>
        ) : (
          <VStack className="gap-2">
            {loadError ? (
              <VStack className="mb-3 gap-3 rounded-2xl bg-background-card p-4">
                <Text className="text-neutral-700">
                  Some permission statuses could not be read. You can retry or
                  manage them in your device settings.
                </Text>
                <HStack className="gap-2">
                  <Button
                    action="secondary"
                    className="flex-1"
                    onPress={() => void checkPermissions()}
                    variant="outline"
                  >
                    <ButtonText>Retry</ButtonText>
                  </Button>
                  <Button className="flex-1" onPress={openAppSettings}>
                    <ButtonText className="text-typography-0">Open Settings</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            ) : null}
            <HStack className="justify-between p-2">
              <Text size="xl" bold>
                Location
              </Text>
              <Switch
                accessibilityLabel="Location"
                value={permissions.location}
                onValueChange={() => handlePermissionToggle("location")}
              />
            </HStack>
            <Divider />
            <HStack className="justify-between p-2">
              <Text size="xl" bold>
                Camera
              </Text>
              <Switch
                accessibilityLabel="Camera"
                value={permissions.camera}
                onValueChange={() => handlePermissionToggle("camera")}
              />
            </HStack>
            <Divider />
            <HStack className="justify-between p-2">
              <Text size="xl" bold>
                Photos
              </Text>
              <Switch
                accessibilityLabel="Photos"
                value={permissions.photos}
                onValueChange={() => handlePermissionToggle("photos")}
              />
            </HStack>
            <Divider />
          </VStack>
        )}
      </ProfileScreen>
      <Modal
        isOpen={pendingPermission !== null}
        onClose={closePermissionPrompt}
        closeOnOverlayClick
        size="xs"
      >
        <ModalBackdrop style={{ backgroundColor: "rgba(80, 80, 80, 0.5)" }} />
        <ModalContent className="w-[82%] rounded-xl">
          <ModalHeader>
            <Text size="xl" bold>
              {pendingLabel} Permission
            </Text>
          </ModalHeader>
          <ModalBody>
            <Text className="text-center text-neutral-800">
              {isPendingGranted
                ? `To change ${pendingLabel.toLowerCase()} access, update Seek permissions in Settings.`
                : `Allow Seek to access your ${pendingLabel.toLowerCase()}?`}
            </Text>
          </ModalBody>
          <ModalFooter className="justify-center">
            <Button
              variant="outline"
              action="secondary"
              size="md"
              onPress={closePermissionPrompt}
            >
              <ButtonText>Not Now</ButtonText>
            </Button>
            <Button size="md" onPress={confirmPermissionChange}>
              <ButtonText className="text-typography-0">
                {isPendingGranted ? "Open Settings" : "Allow"}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
