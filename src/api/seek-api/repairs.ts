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
  CreateRepairDto,
  ErrorDto,
  Repair,
  UpdateRepairDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Repairs across the landlord's tenancies, newest first.
 */
export const repairsControllerLandlord = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Repair[]>(
      {url: `/repairs/landlord`, method: 'GET', signal
    },
      options);
    }
  



export const getRepairsControllerLandlordQueryKey = () => {
    return [
    `/repairs/landlord`
    ] as const;
    }

    
export const getRepairsControllerLandlordQueryOptions = <TData = Awaited<ReturnType<typeof repairsControllerLandlord>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getRepairsControllerLandlordQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof repairsControllerLandlord>>> = ({ signal }) => repairsControllerLandlord(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof repairsControllerLandlord>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type RepairsControllerLandlordQueryResult = NonNullable<Awaited<ReturnType<typeof repairsControllerLandlord>>>
export type RepairsControllerLandlordQueryError = ErrorType<unknown>


export function useRepairsControllerLandlord<TData = Awaited<ReturnType<typeof repairsControllerLandlord>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerLandlord>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof repairsControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof repairsControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useRepairsControllerLandlord<TData = Awaited<ReturnType<typeof repairsControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerLandlord>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof repairsControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof repairsControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useRepairsControllerLandlord<TData = Awaited<ReturnType<typeof repairsControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Repairs across the landlord's tenancies, newest first.
 */

export function useRepairsControllerLandlord<TData = Awaited<ReturnType<typeof repairsControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getRepairsControllerLandlordQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Repairs for one tenancy.
 */
export const repairsControllerForTenancy = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Repair[]>(
      {url: `/repairs/tenancy/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getRepairsControllerForTenancyQueryKey = (id?: string,) => {
    return [
    `/repairs/tenancy/${id}`
    ] as const;
    }

    
export const getRepairsControllerForTenancyQueryOptions = <TData = Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getRepairsControllerForTenancyQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof repairsControllerForTenancy>>> = ({ signal }) => repairsControllerForTenancy(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type RepairsControllerForTenancyQueryResult = NonNullable<Awaited<ReturnType<typeof repairsControllerForTenancy>>>
export type RepairsControllerForTenancyQueryError = ErrorType<ErrorDto>


export function useRepairsControllerForTenancy<TData = Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof repairsControllerForTenancy>>,
          TError,
          Awaited<ReturnType<typeof repairsControllerForTenancy>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useRepairsControllerForTenancy<TData = Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof repairsControllerForTenancy>>,
          TError,
          Awaited<ReturnType<typeof repairsControllerForTenancy>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useRepairsControllerForTenancy<TData = Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Repairs for one tenancy.
 */

export function useRepairsControllerForTenancy<TData = Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof repairsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getRepairsControllerForTenancyQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Report a repair: a tenant tells the landlord, or a landlord logs one on their own tenancy.
 */
export const repairsControllerCreate = (
    createRepairDto: CreateRepairDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Repair>(
      {url: `/repairs`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createRepairDto, signal
    },
      options);
    }
  


export const getRepairsControllerCreateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof repairsControllerCreate>>, TError,{data: CreateRepairDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof repairsControllerCreate>>, TError,{data: CreateRepairDto}, TContext> => {

const mutationKey = ['repairsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof repairsControllerCreate>>, {data: CreateRepairDto}> = (props) => {
          const {data} = props ?? {};

          return  repairsControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type RepairsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof repairsControllerCreate>>>
    export type RepairsControllerCreateMutationBody = CreateRepairDto
    export type RepairsControllerCreateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Report a repair: a tenant tells the landlord, or a landlord logs one on their own tenancy.
 */
export const useRepairsControllerCreate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof repairsControllerCreate>>, TError,{data: CreateRepairDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof repairsControllerCreate>>,
        TError,
        {data: CreateRepairDto},
        TContext
      > => {

      const mutationOptions = getRepairsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Book in or close a repair.
 */
export const repairsControllerUpdate = (
    id: string,
    updateRepairDto: UpdateRepairDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Repair>(
      {url: `/repairs/${id}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateRepairDto
    },
      options);
    }
  


export const getRepairsControllerUpdateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof repairsControllerUpdate>>, TError,{id: string;data: UpdateRepairDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof repairsControllerUpdate>>, TError,{id: string;data: UpdateRepairDto}, TContext> => {

const mutationKey = ['repairsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof repairsControllerUpdate>>, {id: string;data: UpdateRepairDto}> = (props) => {
          const {id,data} = props ?? {};

          return  repairsControllerUpdate(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type RepairsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof repairsControllerUpdate>>>
    export type RepairsControllerUpdateMutationBody = UpdateRepairDto
    export type RepairsControllerUpdateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Book in or close a repair.
 */
export const useRepairsControllerUpdate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof repairsControllerUpdate>>, TError,{id: string;data: UpdateRepairDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof repairsControllerUpdate>>,
        TError,
        {id: string;data: UpdateRepairDto},
        TContext
      > => {

      const mutationOptions = getRepairsControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    