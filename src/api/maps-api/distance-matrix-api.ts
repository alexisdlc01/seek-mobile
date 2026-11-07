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
  DistanceMatrixParams,
  DistanceMatrixResponse
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Distance Matrix API is a service that provides travel distance and time for a matrix of origins and destinations. The API returns information based on the recommended route between start and end points, as calculated by the Google Maps API, and consists of rows containing duration and distance values for each pair.
 */
export const distanceMatrix = (
    params: DistanceMatrixParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<DistanceMatrixResponse>(
      {url: `https://maps.googleapis.com/maps/api/distancematrix/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getDistanceMatrixQueryKey = (params?: DistanceMatrixParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/distancematrix/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getDistanceMatrixQueryOptions = <TData = Awaited<ReturnType<typeof distanceMatrix>>, TError = ErrorType<unknown>>(params: DistanceMatrixParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof distanceMatrix>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDistanceMatrixQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof distanceMatrix>>> = ({ signal }) => distanceMatrix(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof distanceMatrix>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type DistanceMatrixQueryResult = NonNullable<Awaited<ReturnType<typeof distanceMatrix>>>
export type DistanceMatrixQueryError = ErrorType<unknown>


export function useDistanceMatrix<TData = Awaited<ReturnType<typeof distanceMatrix>>, TError = ErrorType<unknown>>(
 params: DistanceMatrixParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof distanceMatrix>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof distanceMatrix>>,
          TError,
          Awaited<ReturnType<typeof distanceMatrix>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDistanceMatrix<TData = Awaited<ReturnType<typeof distanceMatrix>>, TError = ErrorType<unknown>>(
 params: DistanceMatrixParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof distanceMatrix>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof distanceMatrix>>,
          TError,
          Awaited<ReturnType<typeof distanceMatrix>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDistanceMatrix<TData = Awaited<ReturnType<typeof distanceMatrix>>, TError = ErrorType<unknown>>(
 params: DistanceMatrixParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof distanceMatrix>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useDistanceMatrix<TData = Awaited<ReturnType<typeof distanceMatrix>>, TError = ErrorType<unknown>>(
 params: DistanceMatrixParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof distanceMatrix>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getDistanceMatrixQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




