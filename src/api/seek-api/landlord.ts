/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import {
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Dashboard numbers: rent this month (pence), late payments, occupancy, applicants, compliance and recent activity.
 */
export const landlordControllerOverview = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/landlord/overview`, method: 'GET', signal
    },
      options);
    }
  



export const getLandlordControllerOverviewQueryKey = () => {
    return [
    `/landlord/overview`
    ] as const;
    }

    
export const getLandlordControllerOverviewQueryOptions = <TData = Awaited<ReturnType<typeof landlordControllerOverview>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerOverview>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getLandlordControllerOverviewQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof landlordControllerOverview>>> = ({ signal }) => landlordControllerOverview(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof landlordControllerOverview>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type LandlordControllerOverviewQueryResult = NonNullable<Awaited<ReturnType<typeof landlordControllerOverview>>>
export type LandlordControllerOverviewQueryError = ErrorType<unknown>


export function useLandlordControllerOverview<TData = Awaited<ReturnType<typeof landlordControllerOverview>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerOverview>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof landlordControllerOverview>>,
          TError,
          Awaited<ReturnType<typeof landlordControllerOverview>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useLandlordControllerOverview<TData = Awaited<ReturnType<typeof landlordControllerOverview>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerOverview>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof landlordControllerOverview>>,
          TError,
          Awaited<ReturnType<typeof landlordControllerOverview>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useLandlordControllerOverview<TData = Awaited<ReturnType<typeof landlordControllerOverview>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerOverview>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Dashboard numbers: rent this month (pence), late payments, occupancy, applicants, compliance and recent activity.
 */

export function useLandlordControllerOverview<TData = Awaited<ReturnType<typeof landlordControllerOverview>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerOverview>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getLandlordControllerOverviewQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Your listings with views, applications received and how many open households are qualified. Drafts include their draftStep.
 */
export const landlordControllerListings = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/landlord/listings`, method: 'GET', signal
    },
      options);
    }
  



export const getLandlordControllerListingsQueryKey = () => {
    return [
    `/landlord/listings`
    ] as const;
    }

    
export const getLandlordControllerListingsQueryOptions = <TData = Awaited<ReturnType<typeof landlordControllerListings>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getLandlordControllerListingsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof landlordControllerListings>>> = ({ signal }) => landlordControllerListings(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof landlordControllerListings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type LandlordControllerListingsQueryResult = NonNullable<Awaited<ReturnType<typeof landlordControllerListings>>>
export type LandlordControllerListingsQueryError = ErrorType<unknown>


export function useLandlordControllerListings<TData = Awaited<ReturnType<typeof landlordControllerListings>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerListings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof landlordControllerListings>>,
          TError,
          Awaited<ReturnType<typeof landlordControllerListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useLandlordControllerListings<TData = Awaited<ReturnType<typeof landlordControllerListings>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerListings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof landlordControllerListings>>,
          TError,
          Awaited<ReturnType<typeof landlordControllerListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useLandlordControllerListings<TData = Awaited<ReturnType<typeof landlordControllerListings>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Your listings with views, applications received and how many open households are qualified. Drafts include their draftStep.
 */

export function useLandlordControllerListings<TData = Awaited<ReturnType<typeof landlordControllerListings>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof landlordControllerListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getLandlordControllerListingsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




