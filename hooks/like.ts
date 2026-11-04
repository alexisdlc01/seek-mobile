import { queryClient } from "@/app/_layout";
import { getApplicationControllerGetAllMyApplicationsQueryKey } from "@/src/api/seek-api/application";
import { useAuthControllerCurrentUser } from "@/src/api/seek-api/auth";
import {
  getListingsControllerGetAllVerifiedListingsQueryKey,
  getListingsControllerGetFilteredListingsQueryKey,
  getListingsControllerGetLikedQueryKey,
  useListingsControllerLikeListing,
  useListingsControllerUnlikeListing,
} from "@/src/api/seek-api/listings";
import { ApplicationDto, LikedListingsDto, Listing } from "@/src/api/seek-api/model";
import { useIsAuthenticated } from "@/components/custom/auth-required";

type UpdateLikeProps = {
  listings: Listing[];
  listingId: string;
  userId: string;
}

function updateLike({
  listingId,
  userId,
  listings
}: UpdateLikeProps) {
  return listings.map(listing => {
    if (listing._id !== listingId) {
      return listing;
    }
    const likedBy = listing.likedBy ?? [];
    if (likedBy.includes(userId)) {
      return listing;
    }

    return {
      ...listing,
      likedBy: [...likedBy, userId],
    };
  });
}

function updateUnlike({
  listingId,
  userId,
  listings
}: UpdateLikeProps) {
  return listings.map(listing => {
    if (listing._id !== listingId) {
      return listing;
    }

    return {
      ...listing,
      likedBy: (listing.likedBy ?? []).filter(uid => uid !== userId)
    };
  })
}

function restoreQueries<T>(queries: [readonly unknown[], T | undefined][]) {
  queries.forEach(([queryKey, data]) => {
    queryClient.setQueryData(queryKey, data);
  });
}

export function useLike() {
  const isAuthenticated = useIsAuthenticated();
  const { data: user } = useAuthControllerCurrentUser({
    query: { enabled: isAuthenticated },
  });

  return useListingsControllerLikeListing({
    mutation: {
      async onMutate({ id }) {
        if (!user) {
          return;
        }

        await queryClient.cancelQueries({
          queryKey: getListingsControllerGetAllVerifiedListingsQueryKey()
        });
        await queryClient.cancelQueries({
          queryKey: getListingsControllerGetFilteredListingsQueryKey(),
          exact: false,
        });
        await queryClient.cancelQueries({
          queryKey: getListingsControllerGetLikedQueryKey()
        });
        await queryClient.cancelQueries({
          queryKey: getApplicationControllerGetAllMyApplicationsQueryKey()
        });

        const verified = queryClient.getQueryData<Listing[]>(
          getListingsControllerGetAllVerifiedListingsQueryKey()
        );
        const filtered = queryClient.getQueriesData<Listing[]>({
          queryKey: getListingsControllerGetFilteredListingsQueryKey(),
          exact: false,
        });
        const liked = queryClient.getQueryData<LikedListingsDto>(
          getListingsControllerGetLikedQueryKey()
        );
        const applied = queryClient.getQueryData<ApplicationDto[]>(
          getApplicationControllerGetAllMyApplicationsQueryKey()
        );

        const listing = verified?.find(elem => elem._id === id)
          ?? filtered.flatMap(([, data]) => data ?? []).find(elem => elem._id === id)
          ?? applied?.find(elem => elem.listing._id === id)?.listing
          ?? liked?.data.find(elem => elem._id === id);

        queryClient.setQueriesData<Listing[]>(
          {
            queryKey: getListingsControllerGetAllVerifiedListingsQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            const old = updateLike({
              listingId: id,
              userId: user._id,
              listings: curr,
            });
            return old;
          }
        );
        queryClient.setQueriesData<Listing[]>(
          {
            queryKey: getListingsControllerGetFilteredListingsQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            const old = updateLike({
              listingId: id,
              userId: user._id,
              listings: curr,
            });
            return old;
          }
        );
        queryClient.setQueriesData<LikedListingsDto>(
          {
            queryKey: getListingsControllerGetLikedQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr || !listing) return curr;
            if (curr.data.find(elem => elem._id === id)) return curr;
            return {
              ...curr,
              data: [
                ...curr.data,
                updateLike({
                  listingId: id,
                  userId: user._id,
                  listings: [listing],
                })[0],
              ],
            }
          }
        );
        queryClient.setQueriesData<ApplicationDto[]>(
          {
            queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            return curr.map(app => {
              if (app.listing._id !== id) {
                return app;
              }
              const likedBy = app.listing.likedBy ?? [];
              if (likedBy.includes(user._id)) {
                return app;
              }
              return {
                ...app,
                listing: {
                  ...app.listing,
                  likedBy: [...likedBy, user._id]
                }
              };
            })
          }
        );

        return {
          prev: {
            liked,
            verified,
            filtered,
            applied,
          }
        };
      },
      onError(_, __, ctx) {
        queryClient.setQueryData<Listing[]>(
          getListingsControllerGetAllVerifiedListingsQueryKey(),
          ctx?.prev.verified
        );
        queryClient.setQueryData<LikedListingsDto>(
          getListingsControllerGetLikedQueryKey(),
          ctx?.prev.liked
        );
        restoreQueries(ctx?.prev.filtered ?? []);
        queryClient.setQueryData<ApplicationDto[]>(
          getApplicationControllerGetAllMyApplicationsQueryKey(),
          ctx?.prev.applied
        );
      },
      onSettled() {
        queryClient.invalidateQueries({ queryKey: getListingsControllerGetAllVerifiedListingsQueryKey() });
        queryClient.invalidateQueries({
          queryKey: getListingsControllerGetFilteredListingsQueryKey(),
          exact: false,
        });
        queryClient.invalidateQueries({ queryKey: getListingsControllerGetLikedQueryKey() });
        queryClient.invalidateQueries({ queryKey: getApplicationControllerGetAllMyApplicationsQueryKey() });
      }
    }
  });
}

export function useUnlike() {
  const isAuthenticated = useIsAuthenticated();
  const { data: user } = useAuthControllerCurrentUser({
    query: { enabled: isAuthenticated },
  });

  return useListingsControllerUnlikeListing({
    mutation: {
      async onMutate({ id }) {
        if (!user) {
          return;
        }

        await queryClient.cancelQueries({
          queryKey: getListingsControllerGetAllVerifiedListingsQueryKey()
        });
        await queryClient.cancelQueries({
          queryKey: getListingsControllerGetFilteredListingsQueryKey(),
          exact: false,
        });
        await queryClient.cancelQueries({
          queryKey: getListingsControllerGetLikedQueryKey()
        });
        await queryClient.cancelQueries({
          queryKey: getApplicationControllerGetAllMyApplicationsQueryKey()
        });

        const verified = queryClient.getQueryData<Listing[]>(
          getListingsControllerGetAllVerifiedListingsQueryKey()
        );
        const filtered = queryClient.getQueriesData<Listing[]>({
          queryKey: getListingsControllerGetFilteredListingsQueryKey(),
          exact: false,
        });
        const liked = queryClient.getQueryData<LikedListingsDto>(
          getListingsControllerGetLikedQueryKey()
        );
        const applied = queryClient.getQueryData<ApplicationDto[]>(
          getApplicationControllerGetAllMyApplicationsQueryKey()
        );

        queryClient.setQueriesData<Listing[]>(
          {
            queryKey: getListingsControllerGetAllVerifiedListingsQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            const old = updateUnlike({
              listingId: id,
              userId: user._id,
              listings: curr,
            });
            return old;
          }
        );
        queryClient.setQueriesData<Listing[]>(
          {
            queryKey: getListingsControllerGetFilteredListingsQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            const old = updateUnlike({
              listingId: id,
              userId: user._id,
              listings: curr,
            });
            return old;
          }
        );
        queryClient.setQueriesData<LikedListingsDto>(
          {
            queryKey: getListingsControllerGetLikedQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            return {
              ...curr,
              data: curr.data.filter(elem => elem._id !== id),
            }
          }
        );
        queryClient.setQueriesData<ApplicationDto[]>(
          {
            queryKey: getApplicationControllerGetAllMyApplicationsQueryKey(),
            exact: false
          },
          (curr) => {
            if (!curr) return curr;
            return curr.map(app => {
              if (app.listing._id !== id) {
                return app;
              }
              return {
                ...app,
                listing: {
                  ...app.listing,
                  likedBy: (app.listing.likedBy ?? []).filter(id => id !== user._id)
                }
              }
            })
          }
        );

        return {
          prev: {
            liked,
            verified,
            filtered,
            applied,
          }
        };
      },
      onError(_, __, ctx) {
        queryClient.setQueryData<Listing[]>(
          getListingsControllerGetAllVerifiedListingsQueryKey(),
          ctx?.prev.verified
        );
        queryClient.setQueryData<LikedListingsDto>(
          getListingsControllerGetLikedQueryKey(),
          ctx?.prev.liked
        );
        restoreQueries(ctx?.prev.filtered ?? []);
        queryClient.setQueryData<ApplicationDto[]>(
          getApplicationControllerGetAllMyApplicationsQueryKey(),
          ctx?.prev.applied
        );
      },
      onSettled() {
        queryClient.invalidateQueries({ queryKey: getListingsControllerGetAllVerifiedListingsQueryKey() });
        queryClient.invalidateQueries({
          queryKey: getListingsControllerGetFilteredListingsQueryKey(),
          exact: false,
        });
        queryClient.invalidateQueries({ queryKey: getListingsControllerGetLikedQueryKey() });
        queryClient.invalidateQueries({ queryKey: getApplicationControllerGetAllMyApplicationsQueryKey() });
      }
    }
  });
}
