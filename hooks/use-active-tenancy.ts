import type { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTenanciesControllerMine } from "@/src/api/seek-api/tenancies";
import { asTenancyView } from "@/src/utils/tenancy-view";

/** The student's active tenancy running now or starting next (earliest start not yet ended). */
export function useActiveTenancy() {
  const query = useTenanciesControllerMine({ query: { retry: 1 } });
  const tenancy = useMemo(() => {
    const all = (query.data ?? []).map(asTenancyView);
    const now = Date.now();
    const active = all.filter((item) => item.status === "ACTIVE");
    const current = active
      .filter((item) => !item.endDate || new Date(item.endDate).getTime() >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
    return current ?? active[0] ?? all[0] ?? null;
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
