import { BackButton } from "@/components/custom/back-button";
import { VStack } from "@/components/ui/vstack/index";
import { Text } from "@/components/ui/text/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card/index";
import { HStack } from "@/components/ui/hstack";
import { BuildingIcon, CheckCircleIcon, HandshakeIcon, IdCardIcon, UsersIcon, WalletIcon, XCircleIcon } from "lucide-react-native";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from "@/src/utils/upload-file";
import { AddDocumentDtoDocumentType, DocumentTypesDtoDataItem, UserDto } from "@/src/api/seek-api/model";
import { Loader } from "@/components/custom/loader";
import { Redirect } from "expo-router";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import { useToast } from "@/components/ui/toast";
import { errorToast } from "@/src/utils/error-toast";
import { useProfilePicture } from "@/hooks/use-profile-photo";
import { useUsersControllerAddDocument, useUsersControllerDocumentTypes } from "@/src/api/seek-api/users";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText } from "@/components/ui/actionsheet";

export default function PersonalInfo() {
  const { data, isLoading, isError } = useAuthControllerCurrentUser();
  const { data: docs, isLoading: loadingDocs } = useUsersControllerDocumentTypes();

  if (isError) {
    return <Redirect href="/(app)/(tabs)/home" />
  }
  console.log("docs", docs)

  return (
    <Loader isLoading={isLoading || data == null || loadingDocs}>
      <InnerPersonalInfo user={data!} docTypes={docs?.data ?? []} />
    </Loader>
  );
}

type InnerPersonalInfoProps = {
  user: UserDto
  docTypes: DocumentTypesDtoDataItem[]
}

function InnerPersonalInfo({ user, docTypes }: InnerPersonalInfoProps) {
  const toast = useToast();

  const { mutate: addDocument } = useUsersControllerAddDocument();

  const handleFile = async (doc: AddDocumentDtoDocumentType) => {
    // get the file
    let asset: DocumentPicker.DocumentPickerAsset;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/pdf",
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (result.canceled) {
        return;
      }
      asset = result.assets[0];
    } catch (err) {
      console.warn("Document picking failed", err);
      return;
    }

    // upload the file
    const userId = user._id;
    let fileUrl: string;
    let key: string;
    try {
      const data = await uploadFile({
        uri: asset.uri,
        mimeType: asset.mimeType ?? "text/pdf",
        name: `${userId}-${doc}`,
        folder: "private",
      });
      fileUrl = data.fileUrl;
      key = data.key;
    } catch {
      errorToast({ toast, data: { message: "Failed to upload file.", statusCode: -1 } });
      return;
    }

    // modify the user profile
    addDocument({
      data: {
        url: fileUrl,
        documentType: doc,
        key
      }
    }, {
      onError(error) {
        errorToast({ toast, data: error.response?.data });
      },
    });
  };

  const { pickImage } = useProfilePicture(user.profilePicUrl);
  const [show, setShow] = useState<boolean>(false)
  const handleImage = useCallback(async (camera: boolean) => {
    const image = await pickImage(camera);
    if (image == null) {
      errorToast({ toast, data: { message: "No file data found.", statusCode: -1 } })
      setShow(false);
      return;
    }
    setShow(false);

    // upload the file
    const userId = user._id;
    const mimeType = image.mimeType ?? "image/*";
    let fileUrl: string;
    let key: string;
    try {
      console.log("UPLOADING FILE")
      const data = await uploadFile({
        uri: image.uri,
        mimeType,
        name: `${userId}-id`,
        folder: "private",
      });
      fileUrl = data.fileUrl;
      key = data.key;
    } catch {
      errorToast({ toast, data: { message: "Failed to upload file.", statusCode: -1 } });
      return;
    }

    // update the user profile
    addDocument({
      data: {
        url: fileUrl,
        documentType: "IDENTIFICATION",
        key
      },
    }, {
      onError(error) {
        errorToast({ toast, data: error.response?.data });
      },
    });
  }, []);

  const {
    hasIdentification,
    hasProofOfIncome,
    hasGaurantorAgreement,
    hasLandlordReference,
    hasCharacterReference
  } = useMemo(() => {
    return {
      hasIdentification: docTypes.includes("IDENTIFICATION"),
      hasProofOfIncome: docTypes.includes("PROOF_OF_INCOME"),
      hasGaurantorAgreement: docTypes.includes("GUARANTOR_AGREEMENT"),
      hasLandlordReference: docTypes.includes("LANDLORD_REFERENCE"),
      hasCharacterReference: docTypes.includes("CHARACTER_REFERENCE")
    }

  }, [user]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerClassName="p-6 gap-4 min-h-full"
        showsVerticalScrollIndicator={false}
        decelerationRate={0.9}>
        <BackButton title="Peronal Information" />

        <DocumentCard
          present={true}
          onPress={() => setShow(true)}
          title="Identification"
          description="Please upload your passport or national ID."
          icon={
            <IdCardIcon />
          } />

        <DocumentCard
          present={hasProofOfIncome}
          onPress={() => handleFile("PROOF_OF_INCOME")}
          title="Proof of Income"
          description="Please upload your proof of income."
          icon={
            <WalletIcon />
          } />

        <DocumentCard
          present={hasGaurantorAgreement}
          onPress={() => handleFile("GUARANTOR_AGREEMENT")}
          title="Guarantor Agreement"
          description="Please upload your guarantor agreement with a UK based guarantor."
          icon={
            <UsersIcon />
          } />

        <DocumentCard
          present={hasLandlordReference}
          onPress={() => handleFile("LANDLORD_REFERENCE")}
          title="Landlord Reference"
          description="Please your previous landlord reference or University accommodation letter of reference."
          icon={
            <BuildingIcon />
          } />

        <DocumentCard
          present={hasCharacterReference}
          onPress={() => handleFile("CHARACTER_REFERENCE")}
          title="Character Reference"
          description="Please upload a character reference from a non-friend and non-relative."
          icon={
            <HandshakeIcon />
          } />

        <Actionsheet isOpen={show} onClose={() => setShow(false)} useRNModal>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={() => handleImage(true)}>
              <ActionsheetItemText>Take Photo</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={() => handleImage(false)}>
              <ActionsheetItemText>Choose from Library</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </ScrollView>
    </SafeAreaView>
  );
}

type DocumentCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  present: boolean;
  onPress: () => void;
}

function DocumentCard({
  title,
  description,
  icon,
  present,
  onPress
}: DocumentCardProps) {
  return (
    <Card className="gap-2 border-[1px] border-white rounded-xl">
      <HStack className="justify-between">
        <HStack className="items-center gap-2">
          {icon}
          <Text className="text-2xl">{title}</Text>
        </HStack>
        <PresentIndicator present={present} />
      </HStack>
      <Divider />
      <VStack className="gap-4">
        <Text>{description}</Text>
        <Button className="w-[50%] self-center" onPress={onPress}>
          <ButtonText>Upload</ButtonText>
        </Button>
      </VStack>
    </Card>
  )
}

type PresentIndicatorProps = {
  present: boolean;
}

function PresentIndicator({ present }: PresentIndicatorProps) {
  if (present) {
    return <CheckCircleIcon />
  } else {
    return <XCircleIcon />
  }
}
