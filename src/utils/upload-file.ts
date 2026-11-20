import { AxiosResponse } from "axios";
import { AXIOS_INSTANCE } from "./custom-axios";
import { PresignResDto, UploadControllerGetPresignedUrlParams } from "../api/seek-api/model";

type UploadFileProps = {
  uri: string,
  mimeType: string,
  name: string,
  folder: "public" | "private"
};

export async function uploadFile({ uri, mimeType, name, folder }: UploadFileProps) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const resp = await AXIOS_INSTANCE.get<any, AxiosResponse<PresignResDto>, UploadControllerGetPresignedUrlParams>("/upload/presign", {
    params: {
      fileType: mimeType,
      filename: name,
      // Signed into the upload URL as an exact Content-Length, so the PUT below
      // must send a body of precisely this size.
      fileSize: blob.size,
      folder: folder,
    },
  });
  const put = await fetch(resp.data.uploadUrl, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": mimeType,
    },
  });
  // fetch resolves on 4xx/5xx: never hand back a key S3 rejected, or callers file a missing object.
  if (!put.ok) throw new Error(`Upload failed (${put.status})`);
  return resp.data;
}
