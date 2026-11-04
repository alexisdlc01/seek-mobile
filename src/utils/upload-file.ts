import { uploadControllerGetPresignedUrl, useUploadControllerGetPresignedUrl } from "@/src/api/seek-api/upload";
import axios, { AxiosResponse } from "axios";
import { PresignResDto, UploadControllerGetPresignedUrlParams } from "../api/seek-api/model";

type UploadFileProps = {
  uri: string,
  mimeType: string,
  name: string,
  folder: "public" | "private",
  access_token?: string
};

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export async function uploadFile({ uri, mimeType, name, folder, access_token }: UploadFileProps) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const resp = await axios.get<any, AxiosResponse<PresignResDto>, UploadControllerGetPresignedUrlParams>(`${BASE_URL}/upload/presign`, {
    params: {
      fileType: mimeType,
      filename: name,
      // Signed into the upload URL as an exact Content-Length, so the PUT below
      // must send a body of precisely this size.
      fileSize: blob.size,
      folder: folder,
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
      platform: "mobile",
    }
  });
  await fetch(resp.data.uploadUrl, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": mimeType,
    },
  });
  return resp.data;
}
