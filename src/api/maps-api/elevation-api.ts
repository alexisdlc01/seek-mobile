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
  Elevation200,
  ElevationParams
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Elevation API provides a simple interface to query locations on the earth for elevation data. Additionally, you may request sampled elevation data along paths, allowing you to calculate elevation changes along routes. With the Elevation API, you can develop hiking and biking applications, positioning applications, or low resolution surveying applications.

Elevation data is available for all locations on the surface of the earth, including depth locations on the ocean floor (which return negative values). In those cases where Google does not possess exact elevation measurements at the precise location you request, the service interpolates and returns an averaged value using the four nearest locations. Elevation values are expressed relative to local mean sea level (LMSL).

Requests to the Elevation API utilize different parameters based on whether the request is for discrete locations or for an ordered path. For discrete locations, requests for elevation return data on the specific locations passed in the request; for paths, elevation requests are instead sampled along the given path.

 */
export const elevation = (
    params?: ElevationParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Elevation200>(
      {url: `https://maps.googleapis.com/maps/api/elevation/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getElevationQueryKey = (params?: ElevationParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/elevation/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getElevationQueryOptions = <TData = Awaited<ReturnType<typeof elevation>>, TError = ErrorType<unknown>>(params?: ElevationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof elevation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getElevationQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof elevation>>> = ({ signal }) => elevation(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof elevation>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ElevationQueryResult = NonNullable<Awaited<ReturnType<typeof elevation>>>
export type ElevationQueryError = ErrorType<unknown>


export function useElevation<TData = Awaited<ReturnType<typeof elevation>>, TError = ErrorType<unknown>>(
 params: undefined |  ElevationParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof elevation>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof elevation>>,
          TError,
          Awaited<ReturnType<typeof elevation>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useElevation<TData = Awaited<ReturnType<typeof elevation>>, TError = ErrorType<unknown>>(
 params?: ElevationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof elevation>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof elevation>>,
          TError,
          Awaited<ReturnType<typeof elevation>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useElevation<TData = Awaited<ReturnType<typeof elevation>>, TError = ErrorType<unknown>>(
 params?: ElevationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof elevation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useElevation<TData = Awaited<ReturnType<typeof elevation>>, TError = ErrorType<unknown>>(
 params?: ElevationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof elevation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getElevationQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




