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
  GeocodeParams,
  GeocodingResponse
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Geocoding API is a service that provides geocoding and reverse geocoding of addresses.

**Geocoding** is the process of converting addresses (like a street address) into geographic coordinates (like latitude and longitude), which you can use to place markers on a map, or position the map.

**Reverse geocoding** is the process of converting geographic coordinates into a human-readable address.

You can also use the Geocoding API to find the address for a given place ID.

To see countries currently supported by the Google Maps Platform Geocoding API, please consult the [Google Maps coverage data](https://developers.google.com/maps/coverage). The accuracy of geocoded locations may vary per country, so you should consider using the returned `location_type` field to determine if a good enough match has been found for the purposes of your application. Please note that the availability of geocoding data depends on our contracts with data providers, so it is subject to change.
 */
export const geocode = (
    params?: GeocodeParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GeocodingResponse>(
      {url: `https://maps.googleapis.com/maps/api/geocode/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getGeocodeQueryKey = (params?: GeocodeParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/geocode/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getGeocodeQueryOptions = <TData = Awaited<ReturnType<typeof geocode>>, TError = ErrorType<unknown>>(params?: GeocodeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof geocode>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGeocodeQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof geocode>>> = ({ signal }) => geocode(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof geocode>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GeocodeQueryResult = NonNullable<Awaited<ReturnType<typeof geocode>>>
export type GeocodeQueryError = ErrorType<unknown>


export function useGeocode<TData = Awaited<ReturnType<typeof geocode>>, TError = ErrorType<unknown>>(
 params: undefined |  GeocodeParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof geocode>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof geocode>>,
          TError,
          Awaited<ReturnType<typeof geocode>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGeocode<TData = Awaited<ReturnType<typeof geocode>>, TError = ErrorType<unknown>>(
 params?: GeocodeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof geocode>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof geocode>>,
          TError,
          Awaited<ReturnType<typeof geocode>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGeocode<TData = Awaited<ReturnType<typeof geocode>>, TError = ErrorType<unknown>>(
 params?: GeocodeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof geocode>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGeocode<TData = Awaited<ReturnType<typeof geocode>>, TError = ErrorType<unknown>>(
 params?: GeocodeParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof geocode>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGeocodeQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




