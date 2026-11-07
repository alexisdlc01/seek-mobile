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
  AutocompleteParams,
  FindPlaceFromTextParams,
  NearbySearchParams,
  PlaceDetailsParams,
  PlacePhotoParams,
  PlacesAutocompleteResponse,
  PlacesDetailsResponse,
  PlacesFindPlaceFromTextResponse,
  PlacesNearbySearchResponse,
  PlacesQueryAutocompleteResponse,
  PlacesTextSearchResponse,
  QueryAutocompleteParams,
  TextSearchParams
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * The Places API is a service that returns information about places using HTTP requests. Places are defined within this API as establishments, geographic locations, or prominent points of interest.
 */
export const placeDetails = (
    params: PlaceDetailsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PlacesDetailsResponse>(
      {url: `https://maps.googleapis.com/maps/api/place/details/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getPlaceDetailsQueryKey = (params?: PlaceDetailsParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/details/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getPlaceDetailsQueryOptions = <TData = Awaited<ReturnType<typeof placeDetails>>, TError = ErrorType<unknown>>(params: PlaceDetailsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placeDetails>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPlaceDetailsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof placeDetails>>> = ({ signal }) => placeDetails(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof placeDetails>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PlaceDetailsQueryResult = NonNullable<Awaited<ReturnType<typeof placeDetails>>>
export type PlaceDetailsQueryError = ErrorType<unknown>


export function usePlaceDetails<TData = Awaited<ReturnType<typeof placeDetails>>, TError = ErrorType<unknown>>(
 params: PlaceDetailsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof placeDetails>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof placeDetails>>,
          TError,
          Awaited<ReturnType<typeof placeDetails>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePlaceDetails<TData = Awaited<ReturnType<typeof placeDetails>>, TError = ErrorType<unknown>>(
 params: PlaceDetailsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placeDetails>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof placeDetails>>,
          TError,
          Awaited<ReturnType<typeof placeDetails>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePlaceDetails<TData = Awaited<ReturnType<typeof placeDetails>>, TError = ErrorType<unknown>>(
 params: PlaceDetailsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placeDetails>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function usePlaceDetails<TData = Awaited<ReturnType<typeof placeDetails>>, TError = ErrorType<unknown>>(
 params: PlaceDetailsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placeDetails>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPlaceDetailsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * A Find Place request takes a text input and returns a place. The input can be any kind of Places text data, such as a name, address, or phone number. The request must be a string. A Find Place request using non-string data such as a lat/lng coordinate or plus code generates an error.
<div class="note">Note: If you omit the fields parameter from a Find Place request, only the place_id for the result will be returned.</div>

 */
export const findPlaceFromText = (
    params: FindPlaceFromTextParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PlacesFindPlaceFromTextResponse>(
      {url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getFindPlaceFromTextQueryKey = (params?: FindPlaceFromTextParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getFindPlaceFromTextQueryOptions = <TData = Awaited<ReturnType<typeof findPlaceFromText>>, TError = ErrorType<unknown>>(params: FindPlaceFromTextParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof findPlaceFromText>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getFindPlaceFromTextQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof findPlaceFromText>>> = ({ signal }) => findPlaceFromText(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof findPlaceFromText>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type FindPlaceFromTextQueryResult = NonNullable<Awaited<ReturnType<typeof findPlaceFromText>>>
export type FindPlaceFromTextQueryError = ErrorType<unknown>


export function useFindPlaceFromText<TData = Awaited<ReturnType<typeof findPlaceFromText>>, TError = ErrorType<unknown>>(
 params: FindPlaceFromTextParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof findPlaceFromText>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof findPlaceFromText>>,
          TError,
          Awaited<ReturnType<typeof findPlaceFromText>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFindPlaceFromText<TData = Awaited<ReturnType<typeof findPlaceFromText>>, TError = ErrorType<unknown>>(
 params: FindPlaceFromTextParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof findPlaceFromText>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof findPlaceFromText>>,
          TError,
          Awaited<ReturnType<typeof findPlaceFromText>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useFindPlaceFromText<TData = Awaited<ReturnType<typeof findPlaceFromText>>, TError = ErrorType<unknown>>(
 params: FindPlaceFromTextParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof findPlaceFromText>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useFindPlaceFromText<TData = Awaited<ReturnType<typeof findPlaceFromText>>, TError = ErrorType<unknown>>(
 params: FindPlaceFromTextParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof findPlaceFromText>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getFindPlaceFromTextQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * A Nearby Search lets you search for places within a specified area. You can refine your search request by supplying keywords or specifying the type of place you are searching for.
 */
export const nearbySearch = (
    params: NearbySearchParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PlacesNearbySearchResponse>(
      {url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getNearbySearchQueryKey = (params?: NearbySearchParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getNearbySearchQueryOptions = <TData = Awaited<ReturnType<typeof nearbySearch>>, TError = ErrorType<unknown>>(params: NearbySearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearbySearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getNearbySearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof nearbySearch>>> = ({ signal }) => nearbySearch(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof nearbySearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type NearbySearchQueryResult = NonNullable<Awaited<ReturnType<typeof nearbySearch>>>
export type NearbySearchQueryError = ErrorType<unknown>


export function useNearbySearch<TData = Awaited<ReturnType<typeof nearbySearch>>, TError = ErrorType<unknown>>(
 params: NearbySearchParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearbySearch>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof nearbySearch>>,
          TError,
          Awaited<ReturnType<typeof nearbySearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNearbySearch<TData = Awaited<ReturnType<typeof nearbySearch>>, TError = ErrorType<unknown>>(
 params: NearbySearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearbySearch>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof nearbySearch>>,
          TError,
          Awaited<ReturnType<typeof nearbySearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNearbySearch<TData = Awaited<ReturnType<typeof nearbySearch>>, TError = ErrorType<unknown>>(
 params: NearbySearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearbySearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useNearbySearch<TData = Awaited<ReturnType<typeof nearbySearch>>, TError = ErrorType<unknown>>(
 params: NearbySearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof nearbySearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getNearbySearchQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * The Google Places API Text Search Service is a web service that returns information about a set of places based on a string — for example "pizza in New York" or "shoe stores near Ottawa" or "123 Main Street". The service responds with a list of places matching the text string and any location bias that has been set.

The service is especially useful for making [ambiguous address](https://developers.google.com/maps/documentation/geocoding/best-practices) queries in an automated system, and non-address components of the string may match businesses as well as addresses. Examples of ambiguous address queries are incomplete addresses, poorly formatted addresses, or a request that includes non-address components such as business names.

The search response will include a list of places. You can send a Place Details request for more information about any of the places in the response.

 */
export const textSearch = (
    params: TextSearchParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PlacesTextSearchResponse>(
      {url: `https://maps.googleapis.com/maps/api/place/textsearch/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getTextSearchQueryKey = (params?: TextSearchParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/textsearch/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getTextSearchQueryOptions = <TData = Awaited<ReturnType<typeof textSearch>>, TError = ErrorType<unknown>>(params: TextSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof textSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTextSearchQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof textSearch>>> = ({ signal }) => textSearch(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof textSearch>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TextSearchQueryResult = NonNullable<Awaited<ReturnType<typeof textSearch>>>
export type TextSearchQueryError = ErrorType<unknown>


export function useTextSearch<TData = Awaited<ReturnType<typeof textSearch>>, TError = ErrorType<unknown>>(
 params: TextSearchParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof textSearch>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof textSearch>>,
          TError,
          Awaited<ReturnType<typeof textSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTextSearch<TData = Awaited<ReturnType<typeof textSearch>>, TError = ErrorType<unknown>>(
 params: TextSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof textSearch>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof textSearch>>,
          TError,
          Awaited<ReturnType<typeof textSearch>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTextSearch<TData = Awaited<ReturnType<typeof textSearch>>, TError = ErrorType<unknown>>(
 params: TextSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof textSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useTextSearch<TData = Awaited<ReturnType<typeof textSearch>>, TError = ErrorType<unknown>>(
 params: TextSearchParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof textSearch>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTextSearchQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * The Place Photo service, part of the Places API, is a read- only API that allows you to add high quality photographic content to your application. The Place Photo service gives you access to the millions of photos stored in the Places database. When you get place information using a Place Details request, photo references will be returned for relevant photographic content. Find Place, Nearby Search, and Text Search requests also return a single photo reference per place, when relevant. Using the Photo service you can then access the referenced photos and resize the image to the optimal size for your application.

Photos returned by the Photo service are sourced from a variety of locations, including business owners and user contributed photos. In most cases, these photos can be used without attribution, or will have the required attribution included as a part of the image. However, if the returned photo element includes a value in the html_attributions field, you will have to include the additional attribution in your application wherever you display the image.

 */
export const placePhoto = (
    params: PlacePhotoParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Blob>(
      {url: `https://maps.googleapis.com/maps/api/place/photo`, method: 'GET',
        params,
        responseType: 'blob', signal
    },
      options);
    }
  



export const getPlacePhotoQueryKey = (params?: PlacePhotoParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/photo`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getPlacePhotoQueryOptions = <TData = Awaited<ReturnType<typeof placePhoto>>, TError = ErrorType<unknown>>(params: PlacePhotoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placePhoto>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPlacePhotoQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof placePhoto>>> = ({ signal }) => placePhoto(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof placePhoto>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PlacePhotoQueryResult = NonNullable<Awaited<ReturnType<typeof placePhoto>>>
export type PlacePhotoQueryError = ErrorType<unknown>


export function usePlacePhoto<TData = Awaited<ReturnType<typeof placePhoto>>, TError = ErrorType<unknown>>(
 params: PlacePhotoParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof placePhoto>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof placePhoto>>,
          TError,
          Awaited<ReturnType<typeof placePhoto>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePlacePhoto<TData = Awaited<ReturnType<typeof placePhoto>>, TError = ErrorType<unknown>>(
 params: PlacePhotoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placePhoto>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof placePhoto>>,
          TError,
          Awaited<ReturnType<typeof placePhoto>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePlacePhoto<TData = Awaited<ReturnType<typeof placePhoto>>, TError = ErrorType<unknown>>(
 params: PlacePhotoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placePhoto>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function usePlacePhoto<TData = Awaited<ReturnType<typeof placePhoto>>, TError = ErrorType<unknown>>(
 params: PlacePhotoParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof placePhoto>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPlacePhotoQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * The Query Autocomplete service can be used to provide a query prediction for text-based geographic searches, by returning suggested queries as you type.

The Query Autocomplete service allows you to add on-the-fly geographic query predictions to your application. Instead of searching for a specific location, a user can type in a categorical search, such as "pizza near New York" and the service responds with a list of suggested queries matching the string. As the Query Autocomplete service can match on both full words and substrings, applications can send queries as the user types to provide on-the-fly predictions.

 */
export const queryAutocomplete = (
    params: QueryAutocompleteParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PlacesQueryAutocompleteResponse>(
      {url: `https://maps.googleapis.com/maps/api/place/queryautocomplete/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getQueryAutocompleteQueryKey = (params?: QueryAutocompleteParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/queryautocomplete/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getQueryAutocompleteQueryOptions = <TData = Awaited<ReturnType<typeof queryAutocomplete>>, TError = ErrorType<unknown>>(params: QueryAutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof queryAutocomplete>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getQueryAutocompleteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof queryAutocomplete>>> = ({ signal }) => queryAutocomplete(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof queryAutocomplete>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type QueryAutocompleteQueryResult = NonNullable<Awaited<ReturnType<typeof queryAutocomplete>>>
export type QueryAutocompleteQueryError = ErrorType<unknown>


export function useQueryAutocomplete<TData = Awaited<ReturnType<typeof queryAutocomplete>>, TError = ErrorType<unknown>>(
 params: QueryAutocompleteParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof queryAutocomplete>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof queryAutocomplete>>,
          TError,
          Awaited<ReturnType<typeof queryAutocomplete>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQueryAutocomplete<TData = Awaited<ReturnType<typeof queryAutocomplete>>, TError = ErrorType<unknown>>(
 params: QueryAutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof queryAutocomplete>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof queryAutocomplete>>,
          TError,
          Awaited<ReturnType<typeof queryAutocomplete>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useQueryAutocomplete<TData = Awaited<ReturnType<typeof queryAutocomplete>>, TError = ErrorType<unknown>>(
 params: QueryAutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof queryAutocomplete>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useQueryAutocomplete<TData = Awaited<ReturnType<typeof queryAutocomplete>>, TError = ErrorType<unknown>>(
 params: QueryAutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof queryAutocomplete>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getQueryAutocompleteQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * The Place Autocomplete service is a web service that returns place predictions in response to an HTTP request. The request specifies a textual search string and optional geographic bounds. The service can be used to provide autocomplete functionality for text-based geographic searches, by returning places such as businesses, addresses and points of interest as a user types.
<div class="note">Note: You can use Place Autocomplete even without a map. If you do show a map, it must be a Google map. When you display predictions from the Place Autocomplete service without a map, you must include the ['Powered by Google'](https://developers.google.com/maps/documentation/places/web-service/policies#logo_requirementshttps://developers.google.com/maps/documentation/places/web-service/policies#logo_requirements) logo.</div>

The Place Autocomplete service can match on full words and substrings, resolving place names, addresses, and plus codes. Applications can therefore send queries as the user types, to provide on-the-fly place predictions.

The returned predictions are designed to be presented to the user to aid them in selecting the desired place. You can send a [Place Details](https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests) request for more information about any of the places which are returned.

 */
export const autocomplete = (
    params: AutocompleteParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PlacesAutocompleteResponse>(
      {url: `https://maps.googleapis.com/maps/api/place/autocomplete/json`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getAutocompleteQueryKey = (params?: AutocompleteParams,) => {
    return [
    `https://maps.googleapis.com/maps/api/place/autocomplete/json`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getAutocompleteQueryOptions = <TData = Awaited<ReturnType<typeof autocomplete>>, TError = ErrorType<unknown>>(params: AutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof autocomplete>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAutocompleteQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof autocomplete>>> = ({ signal }) => autocomplete(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof autocomplete>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AutocompleteQueryResult = NonNullable<Awaited<ReturnType<typeof autocomplete>>>
export type AutocompleteQueryError = ErrorType<unknown>


export function useAutocomplete<TData = Awaited<ReturnType<typeof autocomplete>>, TError = ErrorType<unknown>>(
 params: AutocompleteParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof autocomplete>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof autocomplete>>,
          TError,
          Awaited<ReturnType<typeof autocomplete>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAutocomplete<TData = Awaited<ReturnType<typeof autocomplete>>, TError = ErrorType<unknown>>(
 params: AutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof autocomplete>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof autocomplete>>,
          TError,
          Awaited<ReturnType<typeof autocomplete>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAutocomplete<TData = Awaited<ReturnType<typeof autocomplete>>, TError = ErrorType<unknown>>(
 params: AutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof autocomplete>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAutocomplete<TData = Awaited<ReturnType<typeof autocomplete>>, TError = ErrorType<unknown>>(
 params: AutocompleteParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof autocomplete>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAutocompleteQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




