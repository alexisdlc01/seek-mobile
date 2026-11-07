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
  NearestRoadsErrorResponse,
  NearestRoadsParams,
  NearestRoadsResponse,
  SnapToRoadsParams,
  SnapToRoadsResponse
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * This service returns the best-fit road geometry for a given set of GPS coordinates. This service takes up to 100 GPS points collected along a route, and returns a similar set of data with the points snapped to the most likely roads the vehicle was traveling along. Optionally, you can request that the points be interpolated, resulting in a path that smoothly follows the geometry of the road.
 */
export const snapToRoads = (
    params: SnapToRoadsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SnapToRoadsResponse>(
      {url: `https://maps.googleapis.com/v1/snaptoroads`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getSnapToRoadsQueryKey = (params?: SnapToRoadsParams,) => {
    return [
    `https://maps.googleapis.com/v1/snaptoroads`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getSnapToRoadsQueryOptions = <TData = Awaited<ReturnType<typeof snapToRoads>>, TError = ErrorType<unknown>>(params: SnapToRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof snapToRoads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getSnapToRoadsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof snapToRoads>>> = ({ signal }) => snapToRoads(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof snapToRoads>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type SnapToRoadsQueryResult = NonNullable<Awaited<ReturnType<typeof snapToRoads>>>
export type SnapToRoadsQueryError = ErrorType<unknown>


export function useSnapToRoads<TData = Awaited<ReturnType<typeof snapToRoads>>, TError = ErrorType<unknown>>(
 params: SnapToRoadsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof snapToRoads>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof snapToRoads>>,
          TError,
          Awaited<ReturnType<typeof snapToRoads>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSnapToRoads<TData = Awaited<ReturnType<typeof snapToRoads>>, TError = ErrorType<unknown>>(
 params: SnapToRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof snapToRoads>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof snapToRoads>>,
          TError,
          Awaited<ReturnType<typeof snapToRoads>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSnapToRoads<TData = Awaited<ReturnType<typeof snapToRoads>>, TError = ErrorType<unknown>>(
 params: SnapToRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof snapToRoads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useSnapToRoads<TData = Awaited<ReturnType<typeof snapToRoads>>, TError = ErrorType<unknown>>(
 params: SnapToRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof snapToRoads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getSnapToRoadsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * This service returns individual road segments for a given set of GPS coordinates. This services takes up to 100 GPS points and returns the closest road segments for each point. The points passed do not need to be part of a continuous path.
 */
export const nearestRoads = (
    params: NearestRoadsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<NearestRoadsResponse>(
      {url: `https://maps.googleapis.com/v1/nearestRoads`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getNearestRoadsQueryKey = (params?: NearestRoadsParams,) => {
    return [
    `https://maps.googleapis.com/v1/nearestRoads`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getNearestRoadsQueryOptions = <TData = Awaited<ReturnType<typeof nearestRoads>>, TError = ErrorType<NearestRoadsErrorResponse>>(params: NearestRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearestRoads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getNearestRoadsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof nearestRoads>>> = ({ signal }) => nearestRoads(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof nearestRoads>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type NearestRoadsQueryResult = NonNullable<Awaited<ReturnType<typeof nearestRoads>>>
export type NearestRoadsQueryError = ErrorType<NearestRoadsErrorResponse>


export function useNearestRoads<TData = Awaited<ReturnType<typeof nearestRoads>>, TError = ErrorType<NearestRoadsErrorResponse>>(
 params: NearestRoadsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearestRoads>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof nearestRoads>>,
          TError,
          Awaited<ReturnType<typeof nearestRoads>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNearestRoads<TData = Awaited<ReturnType<typeof nearestRoads>>, TError = ErrorType<NearestRoadsErrorResponse>>(
 params: NearestRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearestRoads>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof nearestRoads>>,
          TError,
          Awaited<ReturnType<typeof nearestRoads>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNearestRoads<TData = Awaited<ReturnType<typeof nearestRoads>>, TError = ErrorType<NearestRoadsErrorResponse>>(
 params: NearestRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearestRoads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useNearestRoads<TData = Awaited<ReturnType<typeof nearestRoads>>, TError = ErrorType<NearestRoadsErrorResponse>>(
 params: NearestRoadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearestRoads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getNearestRoadsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




