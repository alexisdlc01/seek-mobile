import { create } from "zustand";

const DEFAULT_HREF = "/(app)/(tabs)/map";

interface AuthRedirectState {
  pendingHref: string | null;
  setPendingHref: (href: string | null) => void;
}

// In-memory only: where a signed-out user was headed before being sent to login/signup.
export const useAuthRedirect = create<AuthRedirectState>()((set) => ({
  pendingHref: null,
  // Only in-app paths are accepted, never an absolute URL or "//host".
  setPendingHref: (href) =>
    set({
      pendingHref:
        href && href.startsWith("/") && !href.startsWith("//") ? href : null,
    }),
}));

export const afterAuthHref = (pendingHref: string | null) =>
  (pendingHref ?? DEFAULT_HREF) as never;

export function buildHref(
  pathname: string,
  params: Record<string, string | string[] | undefined>,
) {
  const query = Object.entries(params)
    .flatMap(([key, value]) =>
      value === undefined
        ? []
        : (Array.isArray(value) ? value : [value]).map(
            (v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`,
          ),
    )
    .join("&");
  return query ? `${pathname}?${query}` : pathname;
}
