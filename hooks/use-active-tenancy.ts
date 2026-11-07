import type { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTenanciesControllerMine } from "@/src/api/seek-api/tenancies";
import { asTenancyView } from "@/src/utils/tenancy-view";

/** The student's current tenancy (the first active one, else the latest). */
export function useActiveTenancy() {
  const query = useTenanciesControllerMine({ query: { retry: 1 } });
  const tenancy = useMemo(() => {
    const all = (query.data ?? []).map(asTenancyView);
    return all.find((item) => item.status === "ACTIVE") ?? all[0] ?? null;
  }, [query.data]);
  return { ...query, tenancy };
}

const HOME_QUERY_PREFIXES = ["/tenancies", "/payments", "/bills", "/repairs", "/notifications"];

/** Refetch everything the My home screens show (call after a mutation). */
export function invalidateHomeQueries(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    predicate: ({ queryKey }) =>
      typeof queryKey[0] === "string" &&
      HOME_QUERY_PREFIXES.some((prefix) => (queryKey[0] as string).startsWith(prefix)),
  });
}
