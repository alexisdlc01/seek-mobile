import { queryClient } from "@/app/_layout";
import {
  ProfilePrimaryButton,
  ProfileScreen,
  profileTypography,
} from "@/components/custom/profile-screen";
import { Loader } from "@/components/custom/loader";
import { SuccessToast } from "@/components/custom/success-toast";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { PROFILE_COLORS, PROFILE_LAYOUT } from "@/constants/design";
import { useProfilePicture } from "@/hooks/use-profile-photo";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import {
  AddDocumentDtoDocumentType,
  DocumentTypesDtoDataItem,
  UserDto,
} from "@/src/api/seek-api/model";
import {
  getUsersControllerDocumentTypesQueryKey,
  useUsersControllerAddDocument,
  useUsersControllerDocumentTypes,
} from "@/src/api/seek-api/users";
import { useAuth } from "@/src/store/auth-store";
import { errorToast } from "@/src/utils/error-toast";
import { uploadFile } from "@/src/utils/upload-file";
import * as DocumentPicker from "expo-document-picker";
import {
  BuildingIcon,
  CameraIcon,
  CheckCircle2Icon,
  HandshakeIcon,
  IdCardIcon,
  ImageIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react-native";
import React, { ReactNode, useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function PersonalInformationScreen() {
  const { data: user, isLoading: loadingUser, isError } =
    useAuthControllerCurrentUser();
  const { data: documents, isLoading: loadingDocuments } =
    useUsersControllerDocumentTypes();

  return (
    <Loader
      isLoading={loadingUser || loadingDocuments || !user || isError}
    >
      {user ? (
        <PersonalInformationContent
          user={user}
          documentTypes={documents?.data ?? []}
        />
      ) : null}
    </Loader>
  );
}

function PersonalInformationContent({
  user,
  documentTypes,
}: {
  user: UserDto;
  documentTypes: DocumentTypesDtoDataItem[];
}) {
  const toast = useToast();
  const accessToken = useAuth((state) => state.accessToken);
  const { pickImage } = useProfilePicture();
  const { mutate: addDocument } = useUsersControllerAddDocument();
  const [showIdSources, setShowIdSources] = useState(false);
  const [uploadingType, setUploadingType] =
    useState<AddDocumentDtoDocumentType | null>(null);

  const finishDocument = useCallback(
    (
      documentType: AddDocumentDtoDocumentType,
      fileUrl: string,
      key: string,
    ) => {
      addDocument(
        { data: { documentType, url: fileUrl, key } },
        {
          onSuccess() {
            queryClient.invalidateQueries({
              queryKey: getUsersControllerDocumentTypesQueryKey(),
            });
            toast.show({
              placement: "top",
              render: (props) => (
                <SuccessToast {...props} message="Document uploaded" />
              ),
            });
          },
          onError(error) {
            errorToast({ toast, data: error.response?.data });
          },
          onSettled() {
            setUploadingType(null);
          },
        },
      );
    },
    [addDocument, toast],
  );

  const uploadPdf = async (documentType: AddDocumentDtoDocumentType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.canceled) return;

      const asset = result.assets[0];
      setUploadingType(documentType);
      const uploaded = await uploadFile({
        uri: asset.uri,
        mimeType: asset.mimeType ?? "application/pdf",
        name: `${user._id}-${documentType}`,
        folder: "private",
        access_token: accessToken,
      });
      finishDocument(documentType, uploaded.fileUrl, uploaded.key);
    } catch {
      setUploadingType(null);
      errorToast({
        toast,
        data: { message: "Failed to upload file.", statusCode: -1 },
      });
    }
  };

  const uploadIdentification = useCallback(
    async (camera: boolean) => {
      setShowIdSources(false);
      const image = await pickImage(camera);
      if (!image) return;

      setUploadingType("IDENTIFICATION");
      try {
        const uploaded = await uploadFile({
          uri: image.uri,
          mimeType: image.mimeType ?? "image/jpeg",
          name: `${user._id}-identification`,
          folder: "private",
          access_token: accessToken,
        });
        finishDocument("IDENTIFICATION", uploaded.fileUrl, uploaded.key);
      } catch {
        setUploadingType(null);
        errorToast({
          toast,
          data: { message: "Failed to upload file.", statusCode: -1 },
        });
      }
    }, [accessToken, finishDocument, pickImage, toast, user._id],
  );

  return (
    <>
      <ProfileScreen
        title="Personal Information"
        fallbackHref="/(app)/profile"
        alwaysReturnToFallback
      >
        <Text style={profileTypography.body}>
          Keep your documents ready so applications can move faster. Uploads
          are stored privately.
        </Text>

        <DocumentCard
          title="Identification"
          description="Passport or national ID"
          icon={<IdCardIcon {...documentIconProps} />}
          uploaded={documentTypes.includes("IDENTIFICATION")}
          loading={uploadingType === "IDENTIFICATION"}
          onPress={() => setShowIdSources(true)}
        />
        <DocumentCard
          title="Proof of Income"
          description="Recent proof of income"
          icon={<WalletIcon {...documentIconProps} />}
          uploaded={documentTypes.includes("PROOF_OF_INCOME")}
          loading={uploadingType === "PROOF_OF_INCOME"}
          onPress={() => uploadPdf("PROOF_OF_INCOME")}
        />
        <DocumentCard
          title="Guarantor Agreement"
          description="Agreement with a UK-based guarantor"
          icon={<UsersIcon {...documentIconProps} />}
          uploaded={documentTypes.includes("GUARANTOR_AGREEMENT")}
          loading={uploadingType === "GUARANTOR_AGREEMENT"}
          onPress={() => uploadPdf("GUARANTOR_AGREEMENT")}
        />
        <DocumentCard
          title="Landlord Reference"
          description="Previous landlord or university accommodation reference"
          icon={<BuildingIcon {...documentIconProps} />}
          uploaded={documentTypes.includes("LANDLORD_REFERENCE")}
          loading={uploadingType === "LANDLORD_REFERENCE"}
          onPress={() => uploadPdf("LANDLORD_REFERENCE")}
        />
        <DocumentCard
          title="Character Reference"
          description="Reference from someone who is not a friend or relative"
          icon={<HandshakeIcon {...documentIconProps} />}
          uploaded={documentTypes.includes("CHARACTER_REFERENCE")}
          loading={uploadingType === "CHARACTER_REFERENCE"}
          onPress={() => uploadPdf("CHARACTER_REFERENCE")}
        />
      </ProfileScreen>

      <Actionsheet
        isOpen={showIdSources}
        onClose={() => setShowIdSources(false)}
        useRNModal
      >
        <ActionsheetBackdrop />
        <ActionsheetContent style={styles.sourceSheet}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Text style={profileTypography.sectionTitle}>Upload identification</Text>
          <Text style={[profileTypography.metadata, styles.sourceDescription]}>
            Choose how you would like to add your document.
          </Text>
          <View style={styles.sourceCards}>
            <SourceCard
              title="Take Photo"
              icon={<CameraIcon color={PROFILE_COLORS.accent} size={36} />}
              onPress={() => uploadIdentification(true)}
            />
            <SourceCard
              title="Choose from Library"
              icon={<ImageIcon color={PROFILE_COLORS.accent} size={36} />}
              onPress={() => uploadIdentification(false)}
            />
          </View>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}

const documentIconProps = {
  color: PROFILE_COLORS.accent,
  size: 25,
  strokeWidth: 2,
};

function DocumentCard({
  title,
  description,
  icon,
  uploaded,
  loading,
  onPress,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  uploaded: boolean;
  loading: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <View style={styles.documentIcon}>{icon}</View>
        <View style={styles.documentText}>
          <Text style={styles.documentTitle}>{title}</Text>
          <Text style={profileTypography.metadata}>{description}</Text>
        </View>
        {uploaded ? (
          <CheckCircle2Icon color={PROFILE_COLORS.success} size={24} />
        ) : null}
      </View>
      <ProfilePrimaryButton
        title={uploaded ? "Replace" : "Upload"}
        loading={loading}
        disabled={loading}
        onPress={onPress}
      />
    </View>
  );
}

function SourceCard({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={styles.sourceCard}
    >
      <View style={styles.sourceIcon}>{icon}</View>
      <Text style={styles.sourceTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  documentCard: {
    padding: 18,
    gap: 18,
    borderWidth: 1.25,
    borderColor: PROFILE_COLORS.border,
    borderRadius: PROFILE_LAYOUT.cardRadius,
    backgroundColor: PROFILE_COLORS.surface,
  },
  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  documentIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF3FF",
  },
  documentText: {
    flex: 1,
    gap: 2,
  },
  documentTitle: {
    color: PROFILE_COLORS.accent,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "700",
  },
  sourceSheet: {
    paddingHorizontal: 22,
    paddingBottom: 28,
    backgroundColor: PROFILE_COLORS.surface,
  },
  sourceDescription: {
    textAlign: "center",
  },
  sourceCards: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  sourceCard: {
    flex: 1,
    minHeight: 154,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 14,
    borderWidth: 1.25,
    borderColor: PROFILE_COLORS.border,
    borderRadius: PROFILE_LAYOUT.cardRadius,
    backgroundColor: PROFILE_COLORS.surface,
  },
  sourceIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF3FF",
  },
  sourceTitle: {
    color: PROFILE_COLORS.accent,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    textAlign: "center",
  },
});
