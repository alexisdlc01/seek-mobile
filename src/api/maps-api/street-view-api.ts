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
  StreetViewMetadataParams,
  StreetViewParams,
  StreetViewResponse
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Street View Static API lets you embed a static (non-interactive) Street View panorama or thumbnail into your web page, without the use of JavaScript. The viewport is defined with URL parameters sent through a standard HTTP request, and is returned as a static image.

 */
export const streetView = (
    params: StreetViewParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Blob>(
      {url: `https://maps.googleapis.com/maps/api/streetview`, method: 'GET',
        params,
        responseType: 'blob', signal
    },
      options);
    }
  



export const getStreetViewQueryKey = (params?: StreetViewParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/streetview`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getStreetViewQueryOptions = <TData = Awaited<ReturnType<typeof streetView>>, TError = ErrorType<unknown>>(params: StreetViewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetView>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getStreetViewQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof streetView>>> = ({ signal }) => streetView(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof streetView>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type StreetViewQueryResult = NonNullable<Awaited<ReturnType<typeof streetView>>>
export type StreetViewQueryError = ErrorType<unknown>


export function useStreetView<TData = Awaited<ReturnType<typeof streetView>>, TError = ErrorType<unknown>>(
 params: StreetViewParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetView>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof streetView>>,
          TError,
          Awaited<ReturnType<typeof streetView>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStreetView<TData = Awaited<ReturnType<typeof streetView>>, TError = ErrorType<unknown>>(
 params: StreetViewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetView>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof streetView>>,
          TError,
          Awaited<ReturnType<typeof streetView>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStreetView<TData = Awaited<ReturnType<typeof streetView>>, TError = ErrorType<unknown>>(
 params: StreetViewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetView>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useStreetView<TData = Awaited<ReturnType<typeof streetView>>, TError = ErrorType<unknown>>(
 params: StreetViewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetView>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getStreetViewQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * The Street View Static API metadata requests provide data about Street View panoramas. Using the metadata, you can find out if a Street View image is available at a given location, as well as getting programmatic access to the latitude and longitude, the panorama ID, the date the photo was taken, and the copyright information for the image. Accessing this metadata allows you to customize error behavior in your application.

 */
export const streetViewMetadata = (
    params?: StreetViewMetadataParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<StreetViewResponse>(
      {url: `https://maps.googleapis.com/maps/api/streetview/metadata`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getStreetViewMetadataQueryKey = (params?: StreetViewMetadataParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/streetview/metadata`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getStreetViewMetadataQueryOptions = <TData = Awaited<ReturnType<typeof streetViewMetadata>>, TError = ErrorType<unknown>>(params?: StreetViewMetadataParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetViewMetadata>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getStreetViewMetadataQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof streetViewMetadata>>> = ({ signal }) => streetViewMetadata(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof streetViewMetadata>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type StreetViewMetadataQueryResult = NonNullable<Awaited<ReturnType<typeof streetViewMetadata>>>
export type StreetViewMetadataQueryError = ErrorType<unknown>


export function useStreetViewMetadata<TData = Awaited<ReturnType<typeof streetViewMetadata>>, TError = ErrorType<unknown>>(
 params: undefined |  StreetViewMetadataParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetViewMetadata>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof streetViewMetadata>>,
          TError,
          Awaited<ReturnType<typeof streetViewMetadata>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStreetViewMetadata<TData = Awaited<ReturnType<typeof streetViewMetadata>>, TError = ErrorType<unknown>>(
 params?: StreetViewMetadataParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetViewMetadata>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof streetViewMetadata>>,
          TError,
          Awaited<ReturnType<typeof streetViewMetadata>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStreetViewMetadata<TData = Awaited<ReturnType<typeof streetViewMetadata>>, TError = ErrorType<unknown>>(
 params?: StreetViewMetadataParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetViewMetadata>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useStreetViewMetadata<TData = Awaited<ReturnType<typeof streetViewMetadata>>, TError = ErrorType<unknown>>(
 params?: StreetViewMetadataParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof streetViewMetadata>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getStreetViewMetadataQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




