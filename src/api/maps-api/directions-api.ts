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
  DirectionsParams,
  DirectionsResponse
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Directions API is a web service that uses an HTTP request to return JSON or XML-formatted directions between locations. You can receive directions for several modes of transportation, such as transit, driving, walking, or cycling.
 */
export const directions = (
    params: DirectionsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<DirectionsResponse>(
      {url: `https://maps.googleapis.com/maps/api/directions/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getDirectionsQueryKey = (params?: DirectionsParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/directions/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getDirectionsQueryOptions = <TData = Awaited<ReturnType<typeof directions>>, TError = ErrorType<unknown>>(params: DirectionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof directions>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDirectionsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof directions>>> = ({ signal }) => directions(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof directions>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type DirectionsQueryResult = NonNullable<Awaited<ReturnType<typeof directions>>>
export type DirectionsQueryError = ErrorType<unknown>


export function useDirections<TData = Awaited<ReturnType<typeof directions>>, TError = ErrorType<unknown>>(
 params: DirectionsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof directions>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof directions>>,
          TError,
          Awaited<ReturnType<typeof directions>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDirections<TData = Awaited<ReturnType<typeof directions>>, TError = ErrorType<unknown>>(
 params: DirectionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof directions>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof directions>>,
          TError,
          Awaited<ReturnType<typeof directions>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDirections<TData = Awaited<ReturnType<typeof directions>>, TError = ErrorType<unknown>>(
 params: DirectionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof directions>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useDirections<TData = Awaited<ReturnType<typeof directions>>, TError = ErrorType<unknown>>(
 params: DirectionsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof directions>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getDirectionsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




