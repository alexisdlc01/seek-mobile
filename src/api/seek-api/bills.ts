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
  BillViewDto,
  CreateBillDto,
  ErrorDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Household bills with each tenant's share (shares, myShare in pence).
 */
export const billsControllerForTenancy = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<BillViewDto[]>(
      {url: `/bills/tenancy/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getBillsControllerForTenancyQueryKey = (id?: string,) => {
    return [
    `/bills/tenancy/${id}`
    ] as const;
    }

    
export const getBillsControllerForTenancyQueryOptions = <TData = Awaited<ReturnType<typeof billsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof billsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getBillsControllerForTenancyQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof billsControllerForTenancy>>> = ({ signal }) => billsControllerForTenancy(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof billsControllerForTenancy>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type BillsControllerForTenancyQueryResult = NonNullable<Awaited<ReturnType<typeof billsControllerForTenancy>>>
export type BillsControllerForTenancyQueryError = ErrorType<ErrorDto>


export function useBillsControllerForTenancy<TData = Awaited<ReturnType<typeof billsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof billsControllerForTenancy>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof billsControllerForTenancy>>,
          TError,
          Awaited<ReturnType<typeof billsControllerForTenancy>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBillsControllerForTenancy<TData = Awaited<ReturnType<typeof billsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof billsControllerForTenancy>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof billsControllerForTenancy>>,
          TError,
          Awaited<ReturnType<typeof billsControllerForTenancy>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useBillsControllerForTenancy<TData = Awaited<ReturnType<typeof billsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof billsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Household bills with each tenant's share (shares, myShare in pence).
 */

export function useBillsControllerForTenancy<TData = Awaited<ReturnType<typeof billsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof billsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getBillsControllerForTenancyQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Add a household bill.
 */
export const billsControllerCreate = (
    createBillDto: CreateBillDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<BillViewDto>(
      {url: `/bills`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createBillDto, signal
    },
      options);
    }
  


export const getBillsControllerCreateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof billsControllerCreate>>, TError,{data: CreateBillDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof billsControllerCreate>>, TError,{data: CreateBillDto}, TContext> => {

const mutationKey = ['billsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof billsControllerCreate>>, {data: CreateBillDto}> = (props) => {
          const {data} = props ?? {};

          return  billsControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type BillsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof billsControllerCreate>>>
    export type BillsControllerCreateMutationBody = CreateBillDto
    export type BillsControllerCreateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Add a household bill.
 */
export const useBillsControllerCreate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof billsControllerCreate>>, TError,{data: CreateBillDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof billsControllerCreate>>,
        TError,
        {data: CreateBillDto},
        TContext
      > => {

      const mutationOptions = getBillsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Mark your share of a bill as paid. The bill turns PAID once every share is; a landlord settles the whole bill.
 */
export const billsControllerMarkPaid = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<BillViewDto>(
      {url: `/bills/${id}/paid`, method: 'PATCH'
    },
      options);
    }
  


export const getBillsControllerMarkPaidMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof billsControllerMarkPaid>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof billsControllerMarkPaid>>, TError,{id: string}, TContext> => {

const mutationKey = ['billsControllerMarkPaid'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof billsControllerMarkPaid>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  billsControllerMarkPaid(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type BillsControllerMarkPaidMutationResult = NonNullable<Awaited<ReturnType<typeof billsControllerMarkPaid>>>
    
    export type BillsControllerMarkPaidMutationError = ErrorType<ErrorDto>

    /**
 * @summary Mark your share of a bill as paid. The bill turns PAID once every share is; a landlord settles the whole bill.
 */
export const useBillsControllerMarkPaid = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof billsControllerMarkPaid>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof billsControllerMarkPaid>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getBillsControllerMarkPaidMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    