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



export const appControllerGetHello = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/`, method: 'GET', signal
    },
      options);
    }
  



export const getAppControllerGetHelloQueryKey = () => {
    return [
    `/`
    ] as const;
    }

    
export const getAppControllerGetHelloQueryOptions = <TData = Awaited<ReturnType<typeof appControllerGetHello>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerGetHello>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAppControllerGetHelloQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof appControllerGetHello>>> = ({ signal }) => appControllerGetHello(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof appControllerGetHello>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AppControllerGetHelloQueryResult = NonNullable<Awaited<ReturnType<typeof appControllerGetHello>>>
export type AppControllerGetHelloQueryError = ErrorType<unknown>


export function useAppControllerGetHello<TData = Awaited<ReturnType<typeof appControllerGetHello>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerGetHello>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof appControllerGetHello>>,
          TError,
          Awaited<ReturnType<typeof appControllerGetHello>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAppControllerGetHello<TData = Awaited<ReturnType<typeof appControllerGetHello>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerGetHello>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof appControllerGetHello>>,
          TError,
          Awaited<ReturnType<typeof appControllerGetHello>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAppControllerGetHello<TData = Awaited<ReturnType<typeof appControllerGetHello>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerGetHello>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAppControllerGetHello<TData = Awaited<ReturnType<typeof appControllerGetHello>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerGetHello>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAppControllerGetHelloQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const appControllerHealth = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/health`, method: 'GET', signal
    },
      options);
    }
  



export const getAppControllerHealthQueryKey = () => {
    return [
    `/health`
    ] as const;
    }

    
export const getAppControllerHealthQueryOptions = <TData = Awaited<ReturnType<typeof appControllerHealth>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerHealth>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAppControllerHealthQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof appControllerHealth>>> = ({ signal }) => appControllerHealth(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof appControllerHealth>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AppControllerHealthQueryResult = NonNullable<Awaited<ReturnType<typeof appControllerHealth>>>
export type AppControllerHealthQueryError = ErrorType<unknown>


export function useAppControllerHealth<TData = Awaited<ReturnType<typeof appControllerHealth>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerHealth>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof appControllerHealth>>,
          TError,
          Awaited<ReturnType<typeof appControllerHealth>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAppControllerHealth<TData = Awaited<ReturnType<typeof appControllerHealth>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerHealth>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof appControllerHealth>>,
          TError,
          Awaited<ReturnType<typeof appControllerHealth>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAppControllerHealth<TData = Awaited<ReturnType<typeof appControllerHealth>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerHealth>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAppControllerHealth<TData = Awaited<ReturnType<typeof appControllerHealth>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof appControllerHealth>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAppControllerHealthQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




