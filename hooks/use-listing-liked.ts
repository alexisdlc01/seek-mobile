import { useIsAuthenticated } from "@/components/custom/auth-required";
import { useListingsControllerGetLiked } from "@/src/api/seek-api/listings";

export function useListingLiked(listingId: string | undefined) {
  const isAuthenticated = useIsAuthenticated();
  const { data } = useListingsControllerGetLiked({
    query: { enabled: isAuthenticated },
  });

  return Boolean(
    isAuthenticated &&
      listingId &&
      data?.data.some((listing) => listing._id === listingId),
  );
}
