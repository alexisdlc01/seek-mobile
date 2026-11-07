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
  InboxControllerThreadsParams,
  InboxReplyDto,
  InboxThreadDetailDto,
  InboxThreadDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Seek conversations and housing email threads in one list, newest first.
 */
export const inboxControllerThreads = (
    params?: InboxControllerThreadsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<InboxThreadDto[]>(
      {url: `/inbox/threads`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getInboxControllerThreadsQueryKey = (params?: InboxControllerThreadsParams,) => {
    return [
    `/inbox/threads`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getInboxControllerThreadsQueryOptions = <TData = Awaited<ReturnType<typeof inboxControllerThreads>>, TError = ErrorType<unknown>>(params?: InboxControllerThreadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThreads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getInboxControllerThreadsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof inboxControllerThreads>>> = ({ signal }) => inboxControllerThreads(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThreads>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type InboxControllerThreadsQueryResult = NonNullable<Awaited<ReturnType<typeof inboxControllerThreads>>>
export type InboxControllerThreadsQueryError = ErrorType<unknown>


export function useInboxControllerThreads<TData = Awaited<ReturnType<typeof inboxControllerThreads>>, TError = ErrorType<unknown>>(
 params: undefined |  InboxControllerThreadsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThreads>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof inboxControllerThreads>>,
          TError,
          Awaited<ReturnType<typeof inboxControllerThreads>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useInboxControllerThreads<TData = Awaited<ReturnType<typeof inboxControllerThreads>>, TError = ErrorType<unknown>>(
 params?: InboxControllerThreadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThreads>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof inboxControllerThreads>>,
          TError,
          Awaited<ReturnType<typeof inboxControllerThreads>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useInboxControllerThreads<TData = Awaited<ReturnType<typeof inboxControllerThreads>>, TError = ErrorType<unknown>>(
 params?: InboxControllerThreadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThreads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Seek conversations and housing email threads in one list, newest first.
 */

export function useInboxControllerThreads<TData = Awaited<ReturnType<typeof inboxControllerThreads>>, TError = ErrorType<unknown>>(
 params?: InboxControllerThreadsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThreads>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getInboxControllerThreadsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Messages of one thread (Seek and email), oldest first. Marks the thread read.
 */
export const inboxControllerThread = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<InboxThreadDetailDto>(
      {url: `/inbox/threads/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getInboxControllerThreadQueryKey = (id?: string,) => {
    return [
    `/inbox/threads/${id}`
    ] as const;
    }

    
export const getInboxControllerThreadQueryOptions = <TData = Awaited<ReturnType<typeof inboxControllerThread>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThread>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getInboxControllerThreadQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof inboxControllerThread>>> = ({ signal }) => inboxControllerThread(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThread>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type InboxControllerThreadQueryResult = NonNullable<Awaited<ReturnType<typeof inboxControllerThread>>>
export type InboxControllerThreadQueryError = ErrorType<ErrorDto>


export function useInboxControllerThread<TData = Awaited<ReturnType<typeof inboxControllerThread>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThread>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof inboxControllerThread>>,
          TError,
          Awaited<ReturnType<typeof inboxControllerThread>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useInboxControllerThread<TData = Awaited<ReturnType<typeof inboxControllerThread>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThread>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof inboxControllerThread>>,
          TError,
          Awaited<ReturnType<typeof inboxControllerThread>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useInboxControllerThread<TData = Awaited<ReturnType<typeof inboxControllerThread>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThread>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Messages of one thread (Seek and email), oldest first. Marks the thread read.
 */

export function useInboxControllerThread<TData = Awaited<ReturnType<typeof inboxControllerThread>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof inboxControllerThread>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getInboxControllerThreadQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Reply in a thread: through Seek, or by email from your own connected address. Returns the updated thread.
 */
export const inboxControllerReply = (
    id: string,
    inboxReplyDto: InboxReplyDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<InboxThreadDetailDto>(
      {url: `/inbox/threads/${id}/reply`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: inboxReplyDto, signal
    },
      options);
    }
  


export const getInboxControllerReplyMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof inboxControllerReply>>, TError,{id: string;data: InboxReplyDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof inboxControllerReply>>, TError,{id: string;data: InboxReplyDto}, TContext> => {

const mutationKey = ['inboxControllerReply'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof inboxControllerReply>>, {id: string;data: InboxReplyDto}> = (props) => {
          const {id,data} = props ?? {};

          return  inboxControllerReply(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type InboxControllerReplyMutationResult = NonNullable<Awaited<ReturnType<typeof inboxControllerReply>>>
    export type InboxControllerReplyMutationBody = InboxReplyDto
    export type InboxControllerReplyMutationError = ErrorType<ErrorDto>

    /**
 * @summary Reply in a thread: through Seek, or by email from your own connected address. Returns the updated thread.
 */
export const useInboxControllerReply = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof inboxControllerReply>>, TError,{id: string;data: InboxReplyDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof inboxControllerReply>>,
        TError,
        {id: string;data: InboxReplyDto},
        TContext
      > => {

      const mutationOptions = getInboxControllerReplyMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    