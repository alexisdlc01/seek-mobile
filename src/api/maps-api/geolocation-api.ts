/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  ErrorResponse,
  GeolocationRequest,
  GeolocationResponse
} from './model';

import { customInstance } from '../../utils/custom-axios-maps';
import type { ErrorType } from '../../utils/custom-axios-maps';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * Geolocation API returns a location and accuracy radius based on information about cell towers and WiFi nodes that the mobile client can detect. This document describes the protocol used to send this data to the server and to return a response to the client.

Communication is done over HTTPS using POST. Both request and response are formatted as JSON, and the content type of both is `application/json`.

You must specify a key in your request, included as the value of a`key` parameter. A `key` is your application's  API key. This key identifies your application for purposes of quota management. Learn how to [get a key](https://developers.google.com/maps/documentation/geolocation/get-api-key).
 */
export const geolocate = (
    geolocationRequest?: GeolocationRequest,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<GeolocationResponse>(
      {url: `https://maps.googleapis.com/geolocation/v1/geolocate`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: geolocationRequest, signal
    },
      options);
    }
  


export const getGeolocateMutationOptions = <TError = ErrorType<ErrorResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof geolocate>>, TError,{data: GeolocationRequest}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof geolocate>>, TError,{data: GeolocationRequest}, TContext> => {

const mutationKey = ['geolocate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof geolocate>>, {data: GeolocationRequest}> = (props) => {
          const {data} = props ?? {};

          return  geolocate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GeolocateMutationResult = NonNullable<Awaited<ReturnType<typeof geolocate>>>
    export type GeolocateMutationBody = GeolocationRequest
    export type GeolocateMutationError = ErrorType<ErrorResponse>

    export const useGeolocate = <TError = ErrorType<ErrorResponse>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof geolocate>>, TError,{data: GeolocationRequest}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof geolocate>>,
        TError,
        {data: GeolocationRequest},
        TContext
      > => {

      const mutationOptions = getGeolocateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    