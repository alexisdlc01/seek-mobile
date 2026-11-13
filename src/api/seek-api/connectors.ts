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
  AuthUrlDto,
  ConfirmConnectorDto,
  ConnectImapDto,
  ConnectionMatchDto,
  ConnectorSettingsDto,
  ConnectorsControllerAuthUrlParams,
  ConnectorsOverviewDto,
  DisconnectResultDto,
  EmailConnectionViewDto,
  ErrorDto,
  ImapConnectResultDto,
  SyncResultDto,
  UpdateConnectorSettingsDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Your connected mailboxes and the providers this server can connect.
 */
export const connectorsControllerOverview = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ConnectorsOverviewDto>(
      {url: `/connectors`, method: 'GET', signal
    },
      options);
    }
  



export const getConnectorsControllerOverviewQueryKey = () => {
    return [
    `/connectors`
    ] as const;
    }

    
export const getConnectorsControllerOverviewQueryOptions = <TData = Awaited<ReturnType<typeof connectorsControllerOverview>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerOverview>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getConnectorsControllerOverviewQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof connectorsControllerOverview>>> = ({ signal }) => connectorsControllerOverview(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerOverview>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ConnectorsControllerOverviewQueryResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerOverview>>>
export type ConnectorsControllerOverviewQueryError = ErrorType<unknown>


export function useConnectorsControllerOverview<TData = Awaited<ReturnType<typeof connectorsControllerOverview>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerOverview>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof connectorsControllerOverview>>,
          TError,
          Awaited<ReturnType<typeof connectorsControllerOverview>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useConnectorsControllerOverview<TData = Awaited<ReturnType<typeof connectorsControllerOverview>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerOverview>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof connectorsControllerOverview>>,
          TError,
          Awaited<ReturnType<typeof connectorsControllerOverview>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useConnectorsControllerOverview<TData = Awaited<ReturnType<typeof connectorsControllerOverview>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerOverview>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Your connected mailboxes and the providers this server can connect.
 */

export function useConnectorsControllerOverview<TData = Awaited<ReturnType<typeof connectorsControllerOverview>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerOverview>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getConnectorsControllerOverviewQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Choose what mailboxes import (housing only or all emails) and whether attachments are filed automatically.
 */
export const connectorsControllerUpdateSettings = (
    updateConnectorSettingsDto: UpdateConnectorSettingsDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<ConnectorSettingsDto>(
      {url: `/connectors/settings`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateConnectorSettingsDto
    },
      options);
    }
  


export const getConnectorsControllerUpdateSettingsMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerUpdateSettings>>, TError,{data: UpdateConnectorSettingsDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerUpdateSettings>>, TError,{data: UpdateConnectorSettingsDto}, TContext> => {

const mutationKey = ['connectorsControllerUpdateSettings'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof connectorsControllerUpdateSettings>>, {data: UpdateConnectorSettingsDto}> = (props) => {
          const {data} = props ?? {};

          return  connectorsControllerUpdateSettings(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ConnectorsControllerUpdateSettingsMutationResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerUpdateSettings>>>
    export type ConnectorsControllerUpdateSettingsMutationBody = UpdateConnectorSettingsDto
    export type ConnectorsControllerUpdateSettingsMutationError = ErrorType<unknown>

    /**
 * @summary Choose what mailboxes import (housing only or all emails) and whether attachments are filed automatically.
 */
export const useConnectorsControllerUpdateSettings = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerUpdateSettings>>, TError,{data: UpdateConnectorSettingsDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof connectorsControllerUpdateSettings>>,
        TError,
        {data: UpdateConnectorSettingsDto},
        TContext
      > => {

      const mutationOptions = getConnectorsControllerUpdateSettingsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * Outside production, a server that cannot be signed in to falls back to the demo mailbox (mode: demo).
 * @summary Connect any mailbox over IMAP with an app password (stored encrypted), then sync it.
 */
export const connectorsControllerConnectImap = (
    connectImapDto: ConnectImapDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ImapConnectResultDto>(
      {url: `/connectors/imap`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: connectImapDto, signal
    },
      options);
    }
  


export const getConnectorsControllerConnectImapMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConnectImap>>, TError,{data: ConnectImapDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConnectImap>>, TError,{data: ConnectImapDto}, TContext> => {

const mutationKey = ['connectorsControllerConnectImap'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof connectorsControllerConnectImap>>, {data: ConnectImapDto}> = (props) => {
          const {data} = props ?? {};

          return  connectorsControllerConnectImap(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ConnectorsControllerConnectImapMutationResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerConnectImap>>>
    export type ConnectorsControllerConnectImapMutationBody = ConnectImapDto
    export type ConnectorsControllerConnectImapMutationError = ErrorType<ErrorDto>

    /**
 * @summary Connect any mailbox over IMAP with an app password (stored encrypted), then sync it.
 */
export const useConnectorsControllerConnectImap = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConnectImap>>, TError,{data: ConnectImapDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof connectorsControllerConnectImap>>,
        TError,
        {data: ConnectImapDto},
        TContext
      > => {

      const mutationOptions = getConnectorsControllerConnectImapMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary OAuth consent URL for Gmail or Outlook (read housing emails, reply from your address).
 */
export const connectorsControllerAuthUrl = (
    provider: 'gmail' | 'outlook',
    params?: ConnectorsControllerAuthUrlParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<AuthUrlDto>(
      {url: `/connectors/${provider}/auth-url`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getConnectorsControllerAuthUrlQueryKey = (provider?: 'gmail' | 'outlook',
    params?: ConnectorsControllerAuthUrlParams,) => {
    return [
    `/connectors/${provider}/auth-url`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getConnectorsControllerAuthUrlQueryOptions = <TData = Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError = ErrorType<ErrorDto>>(provider: 'gmail' | 'outlook',
    params?: ConnectorsControllerAuthUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getConnectorsControllerAuthUrlQueryKey(provider,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>> = ({ signal }) => connectorsControllerAuthUrl(provider,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(provider), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ConnectorsControllerAuthUrlQueryResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>>
export type ConnectorsControllerAuthUrlQueryError = ErrorType<ErrorDto>


export function useConnectorsControllerAuthUrl<TData = Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError = ErrorType<ErrorDto>>(
 provider: 'gmail' | 'outlook',
    params: undefined |  ConnectorsControllerAuthUrlParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof connectorsControllerAuthUrl>>,
          TError,
          Awaited<ReturnType<typeof connectorsControllerAuthUrl>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useConnectorsControllerAuthUrl<TData = Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError = ErrorType<ErrorDto>>(
 provider: 'gmail' | 'outlook',
    params?: ConnectorsControllerAuthUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof connectorsControllerAuthUrl>>,
          TError,
          Awaited<ReturnType<typeof connectorsControllerAuthUrl>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useConnectorsControllerAuthUrl<TData = Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError = ErrorType<ErrorDto>>(
 provider: 'gmail' | 'outlook',
    params?: ConnectorsControllerAuthUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary OAuth consent URL for Gmail or Outlook (read housing emails, reply from your address).
 */

export function useConnectorsControllerAuthUrl<TData = Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError = ErrorType<ErrorDto>>(
 provider: 'gmail' | 'outlook',
    params?: ConnectorsControllerAuthUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerAuthUrl>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getConnectorsControllerAuthUrlQueryOptions(provider,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Mobile: activate the mailbox from the OAuth redirect (status=pending&nonce=...) for the signed-in user.
 */
export const connectorsControllerConfirm = (
    provider: 'gmail' | 'outlook',
    confirmConnectorDto: ConfirmConnectorDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<EmailConnectionViewDto>(
      {url: `/connectors/${provider}/confirm`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: confirmConnectorDto, signal
    },
      options);
    }
  


export const getConnectorsControllerConfirmMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConfirm>>, TError,{provider: 'gmail' | 'outlook';data: ConfirmConnectorDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConfirm>>, TError,{provider: 'gmail' | 'outlook';data: ConfirmConnectorDto}, TContext> => {

const mutationKey = ['connectorsControllerConfirm'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof connectorsControllerConfirm>>, {provider: 'gmail' | 'outlook';data: ConfirmConnectorDto}> = (props) => {
          const {provider,data} = props ?? {};

          return  connectorsControllerConfirm(provider,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ConnectorsControllerConfirmMutationResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerConfirm>>>
    export type ConnectorsControllerConfirmMutationBody = ConfirmConnectorDto
    export type ConnectorsControllerConfirmMutationError = ErrorType<ErrorDto>

    /**
 * @summary Mobile: activate the mailbox from the OAuth redirect (status=pending&nonce=...) for the signed-in user.
 */
export const useConnectorsControllerConfirm = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConfirm>>, TError,{provider: 'gmail' | 'outlook';data: ConfirmConnectorDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof connectorsControllerConfirm>>,
        TError,
        {provider: 'gmail' | 'outlook';data: ConfirmConnectorDto},
        TContext
      > => {

      const mutationOptions = getConnectorsControllerConfirmMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Connect the demo mailbox (sample housing emails). Not available in production.
 */
export const connectorsControllerConnectDemo = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SyncResultDto>(
      {url: `/connectors/demo`, method: 'POST', signal
    },
      options);
    }
  


export const getConnectorsControllerConnectDemoMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConnectDemo>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConnectDemo>>, TError,void, TContext> => {

const mutationKey = ['connectorsControllerConnectDemo'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof connectorsControllerConnectDemo>>, void> = () => {
          

          return  connectorsControllerConnectDemo(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ConnectorsControllerConnectDemoMutationResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerConnectDemo>>>
    
    export type ConnectorsControllerConnectDemoMutationError = ErrorType<ErrorDto>

    /**
 * @summary Connect the demo mailbox (sample housing emails). Not available in production.
 */
export const useConnectorsControllerConnectDemo = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerConnectDemo>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof connectorsControllerConnectDemo>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getConnectorsControllerConnectDemoMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Fetch new housing emails and file their attachments.
 */
export const connectorsControllerSync = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SyncResultDto>(
      {url: `/connectors/${id}/sync`, method: 'POST', signal
    },
      options);
    }
  


export const getConnectorsControllerSyncMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerSync>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerSync>>, TError,{id: string}, TContext> => {

const mutationKey = ['connectorsControllerSync'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof connectorsControllerSync>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  connectorsControllerSync(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ConnectorsControllerSyncMutationResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerSync>>>
    
    export type ConnectorsControllerSyncMutationError = ErrorType<ErrorDto>

    /**
 * @summary Fetch new housing emails and file their attachments.
 */
export const useConnectorsControllerSync = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerSync>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof connectorsControllerSync>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getConnectorsControllerSyncMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Housing contacts matched in this mailbox (up to 50, newest first). No message content.
 */
export const connectorsControllerMatches = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ConnectionMatchDto[]>(
      {url: `/connectors/${id}/matches`, method: 'GET', signal
    },
      options);
    }
  



export const getConnectorsControllerMatchesQueryKey = (id?: string,) => {
    return [
    `/connectors/${id}/matches`
    ] as const;
    }

    
export const getConnectorsControllerMatchesQueryOptions = <TData = Awaited<ReturnType<typeof connectorsControllerMatches>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerMatches>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getConnectorsControllerMatchesQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof connectorsControllerMatches>>> = ({ signal }) => connectorsControllerMatches(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerMatches>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ConnectorsControllerMatchesQueryResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerMatches>>>
export type ConnectorsControllerMatchesQueryError = ErrorType<ErrorDto>


export function useConnectorsControllerMatches<TData = Awaited<ReturnType<typeof connectorsControllerMatches>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerMatches>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof connectorsControllerMatches>>,
          TError,
          Awaited<ReturnType<typeof connectorsControllerMatches>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useConnectorsControllerMatches<TData = Awaited<ReturnType<typeof connectorsControllerMatches>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerMatches>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof connectorsControllerMatches>>,
          TError,
          Awaited<ReturnType<typeof connectorsControllerMatches>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useConnectorsControllerMatches<TData = Awaited<ReturnType<typeof connectorsControllerMatches>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerMatches>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Housing contacts matched in this mailbox (up to 50, newest first). No message content.
 */

export function useConnectorsControllerMatches<TData = Awaited<ReturnType<typeof connectorsControllerMatches>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof connectorsControllerMatches>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getConnectorsControllerMatchesQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Disconnect a mailbox and delete the emails stored from it.
 */
export const connectorsControllerDisconnect = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<DisconnectResultDto>(
      {url: `/connectors/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getConnectorsControllerDisconnectMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerDisconnect>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerDisconnect>>, TError,{id: string}, TContext> => {

const mutationKey = ['connectorsControllerDisconnect'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof connectorsControllerDisconnect>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  connectorsControllerDisconnect(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ConnectorsControllerDisconnectMutationResult = NonNullable<Awaited<ReturnType<typeof connectorsControllerDisconnect>>>
    
    export type ConnectorsControllerDisconnectMutationError = ErrorType<ErrorDto>

    /**
 * @summary Disconnect a mailbox and delete the emails stored from it.
 */
export const useConnectorsControllerDisconnect = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof connectorsControllerDisconnect>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof connectorsControllerDisconnect>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getConnectorsControllerDisconnectMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    