import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export const useProfilePicture = (initalValue?: string) => {
    const [libraryStatus, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();
    const [image, setImage] = useState<string | undefined>(initalValue);

    const _pickImage = useCallback(async (useCamera: boolean) => {
        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        };

        const permission = useCamera ? cameraStatus : libraryStatus;
        const requestPermission = useCamera
            ? requestCameraPermission
            : requestLibraryPermission;

        if (!permission?.granted) {
            const { granted } = await requestPermission();
            if (!granted) {
                Alert.alert(
                    "Permission required",
                    useCamera
                        ? "Please grant permission to use the camera"
                        : "Please grant permission to access your photo library",
                );
                return null;
            }
        }

        const result = useCamera
            ? await ImagePicker.launchCameraAsync(options)
            : await ImagePicker.launchImageLibraryAsync(options);

        if (!result.canceled) {
            return result.assets[0];
        }
        return null;
    }, [
        cameraStatus,
        libraryStatus,
        requestCameraPermission,
        requestLibraryPermission,
    ]);

    const pickImage = async (useCamera: boolean) => {
        const image = await _pickImage(useCamera);
        setImage(image?.uri);
        return image;
    }

    return { pickImage, image };
};
