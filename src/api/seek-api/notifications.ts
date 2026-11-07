/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  ErrorDto,
  Notification
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary The signed-in user's latest notifications, newest first.
 */
export const notificationsControllerList = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Notification[]>(
      {url: `/notifications`, method: 'GET', signal
    },
      options);
    }
  



export const getNotificationsControllerListQueryKey = () => {
    return [
    `/notifications`
    ] as const;
    }

    
export const getNotificationsControllerListQueryOptions = <TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getNotificationsControllerListQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof notificationsControllerList>>> = ({ signal }) => notificationsControllerList(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type NotificationsControllerListQueryResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerList>>>
export type NotificationsControllerListQueryError = ErrorType<ErrorDto>


export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerList>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerList>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerList>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerList>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The signed-in user's latest notifications, newest first.
 */

export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getNotificationsControllerListQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Mark a notification as read.
 */
export const notificationsControllerMarkRead = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Notification>(
      {url: `/notifications/${id}/read`, method: 'PATCH'
    },
      options);
    }
  


export const getNotificationsControllerMarkReadMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, TError,{id: string}, TContext> => {

const mutationKey = ['notificationsControllerMarkRead'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  notificationsControllerMarkRead(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type NotificationsControllerMarkReadMutationResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerMarkRead>>>
    
    export type NotificationsControllerMarkReadMutationError = ErrorType<ErrorDto>

    /**
 * @summary Mark a notification as read.
 */
export const useNotificationsControllerMarkRead = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof notificationsControllerMarkRead>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getNotificationsControllerMarkReadMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    