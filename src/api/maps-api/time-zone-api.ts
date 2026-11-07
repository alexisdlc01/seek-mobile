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

import type {
  TimeZoneResponse,
  TimezoneParams
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Time Zone API provides a simple interface to request the time zone for locations on the surface of the earth, as well as the time offset from UTC for each of those locations. You request the time zone information for a specific latitude/longitude pair and date. The API returns the name of that time zone, the time offset from UTC, and the daylight savings offset.

 */
export const timezone = (
    params: TimezoneParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TimeZoneResponse>(
      {url: `https://maps.googleapis.com/maps/api/timezone/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getTimezoneQueryKey = (params?: TimezoneParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/timezone/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getTimezoneQueryOptions = <TData = Awaited<ReturnType<typeof timezone>>, TError = ErrorType<unknown>>(params: TimezoneParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof timezone>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTimezoneQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof timezone>>> = ({ signal }) => timezone(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof timezone>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TimezoneQueryResult = NonNullable<Awaited<ReturnType<typeof timezone>>>
export type TimezoneQueryError = ErrorType<unknown>


export function useTimezone<TData = Awaited<ReturnType<typeof timezone>>, TError = ErrorType<unknown>>(
 params: TimezoneParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof timezone>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof timezone>>,
          TError,
          Awaited<ReturnType<typeof timezone>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTimezone<TData = Awaited<ReturnType<typeof timezone>>, TError = ErrorType<unknown>>(
 params: TimezoneParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof timezone>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof timezone>>,
          TError,
          Awaited<ReturnType<typeof timezone>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTimezone<TData = Awaited<ReturnType<typeof timezone>>, TError = ErrorType<unknown>>(
 params: TimezoneParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof timezone>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useTimezone<TData = Awaited<ReturnType<typeof timezone>>, TError = ErrorType<unknown>>(
 params: TimezoneParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof timezone>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTimezoneQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




