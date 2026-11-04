import { Share } from "react-native";

export function getListingLink(id: string): string {
  return `https://www.seekapp.uk/link/location/${id}/details`;
}

export function getApplicationLink(id: string, invite: string): string {
  // The invite secret is what authorizes joining — the id alone must not.
  return `https://www.seekapp.uk/link/chat/${id}/join?invite=${encodeURIComponent(invite)}`;
}

type ShareListingOptions = {
  id: string;
  title?: string;
};

export function shareListing({ id, title }: ShareListingOptions) {
  const url = getListingLink(id);
  const listingName = title?.trim() || "this property";

  return Share.share({
    title: title?.trim() || "Seek property listing",
    message: `Check out ${listingName} on Seek:\n${url}`,
    url,
  });
}
