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
  CheckoutResponseDto,
  ConnectOnboardResponseDto,
  ConnectStatusDto,
  ErrorDto,
  LandlordPaymentsDto,
  PayResponseDto,
  PaymentsControllerCheckoutParams,
  PaymentsControllerConfirmCheckoutParams,
  PaymentsControllerLandlordParams,
  PaymentsControllerMineParams,
  RemindLateDto,
  RemindLateResponseDto,
  ReminderScheduleDto,
  RentPlanViewDto,
  StudentPaymentDto,
  UpdateReminderScheduleDto,
  UpdateRentPlanDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary The tenant's rent plan, allowed frequencies for the nation and next payments.
 */
export const paymentsControllerGetPlan = (
    tenancyId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<RentPlanViewDto>(
      {url: `/payments/plan/${tenancyId}`, method: 'GET', signal
    },
      options);
    }
  



export const getPaymentsControllerGetPlanQueryKey = (tenancyId?: string,) => {
    return [
    `/payments/plan/${tenancyId}`
    ] as const;
    }

    
export const getPaymentsControllerGetPlanQueryOptions = <TData = Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError = ErrorType<ErrorDto>>(tenancyId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPaymentsControllerGetPlanQueryKey(tenancyId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof paymentsControllerGetPlan>>> = ({ signal }) => paymentsControllerGetPlan(tenancyId, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(tenancyId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PaymentsControllerGetPlanQueryResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerGetPlan>>>
export type PaymentsControllerGetPlanQueryError = ErrorType<ErrorDto>


export function usePaymentsControllerGetPlan<TData = Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError = ErrorType<ErrorDto>>(
 tenancyId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerGetPlan>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerGetPlan>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerGetPlan<TData = Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError = ErrorType<ErrorDto>>(
 tenancyId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerGetPlan>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerGetPlan>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerGetPlan<TData = Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError = ErrorType<ErrorDto>>(
 tenancyId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The tenant's rent plan, allowed frequencies for the nation and next payments.
 */

export function usePaymentsControllerGetPlan<TData = Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError = ErrorType<ErrorDto>>(
 tenancyId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerGetPlan>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPaymentsControllerGetPlanQueryOptions(tenancyId,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Change frequency, autopay or reminders. Future scheduled payments are regenerated.
 */
export const paymentsControllerUpdatePlan = (
    tenancyId: string,
    updateRentPlanDto: UpdateRentPlanDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<RentPlanViewDto>(
      {url: `/payments/plan/${tenancyId}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateRentPlanDto
    },
      options);
    }
  


export const getPaymentsControllerUpdatePlanMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerUpdatePlan>>, TError,{tenancyId: string;data: UpdateRentPlanDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerUpdatePlan>>, TError,{tenancyId: string;data: UpdateRentPlanDto}, TContext> => {

const mutationKey = ['paymentsControllerUpdatePlan'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerUpdatePlan>>, {tenancyId: string;data: UpdateRentPlanDto}> = (props) => {
          const {tenancyId,data} = props ?? {};

          return  paymentsControllerUpdatePlan(tenancyId,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerUpdatePlanMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerUpdatePlan>>>
    export type PaymentsControllerUpdatePlanMutationBody = UpdateRentPlanDto
    export type PaymentsControllerUpdatePlanMutationError = ErrorType<ErrorDto>

    /**
 * @summary Change frequency, autopay or reminders. Future scheduled payments are regenerated.
 */
export const usePaymentsControllerUpdatePlan = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerUpdatePlan>>, TError,{tenancyId: string;data: UpdateRentPlanDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerUpdatePlan>>,
        TError,
        {tenancyId: string;data: UpdateRentPlanDto},
        TContext
      > => {

      const mutationOptions = getPaymentsControllerUpdatePlanMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary The tenant's payments, oldest due first.
 */
export const paymentsControllerMine = (
    params?: PaymentsControllerMineParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<StudentPaymentDto[]>(
      {url: `/payments/mine`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getPaymentsControllerMineQueryKey = (params?: PaymentsControllerMineParams,) => {
    return [
    `/payments/mine`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getPaymentsControllerMineQueryOptions = <TData = Awaited<ReturnType<typeof paymentsControllerMine>>, TError = ErrorType<unknown>>(params?: PaymentsControllerMineParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerMine>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPaymentsControllerMineQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof paymentsControllerMine>>> = ({ signal }) => paymentsControllerMine(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerMine>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PaymentsControllerMineQueryResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerMine>>>
export type PaymentsControllerMineQueryError = ErrorType<unknown>


export function usePaymentsControllerMine<TData = Awaited<ReturnType<typeof paymentsControllerMine>>, TError = ErrorType<unknown>>(
 params: undefined |  PaymentsControllerMineParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerMine>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerMine>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerMine>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerMine<TData = Awaited<ReturnType<typeof paymentsControllerMine>>, TError = ErrorType<unknown>>(
 params?: PaymentsControllerMineParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerMine>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerMine>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerMine>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerMine<TData = Awaited<ReturnType<typeof paymentsControllerMine>>, TError = ErrorType<unknown>>(
 params?: PaymentsControllerMineParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerMine>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The tenant's payments, oldest due first.
 */

export function usePaymentsControllerMine<TData = Awaited<ReturnType<typeof paymentsControllerMine>>, TError = ErrorType<unknown>>(
 params?: PaymentsControllerMineParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerMine>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPaymentsControllerMineQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Rent collected, expected and late for a month, with one row per payment.
 */
export const paymentsControllerLandlord = (
    params?: PaymentsControllerLandlordParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<LandlordPaymentsDto>(
      {url: `/payments/landlord`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getPaymentsControllerLandlordQueryKey = (params?: PaymentsControllerLandlordParams,) => {
    return [
    `/payments/landlord`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getPaymentsControllerLandlordQueryOptions = <TData = Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError = ErrorType<unknown>>(params?: PaymentsControllerLandlordParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPaymentsControllerLandlordQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof paymentsControllerLandlord>>> = ({ signal }) => paymentsControllerLandlord(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PaymentsControllerLandlordQueryResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerLandlord>>>
export type PaymentsControllerLandlordQueryError = ErrorType<unknown>


export function usePaymentsControllerLandlord<TData = Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError = ErrorType<unknown>>(
 params: undefined |  PaymentsControllerLandlordParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerLandlord<TData = Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError = ErrorType<unknown>>(
 params?: PaymentsControllerLandlordParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerLandlord<TData = Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError = ErrorType<unknown>>(
 params?: PaymentsControllerLandlordParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Rent collected, expected and late for a month, with one row per payment.
 */

export function usePaymentsControllerLandlord<TData = Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError = ErrorType<unknown>>(
 params?: PaymentsControllerLandlordParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPaymentsControllerLandlordQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary When Seek reminds your tenants: before the due date, on the day, three days late.
 */
export const paymentsControllerReminderSchedule = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ReminderScheduleDto>(
      {url: `/payments/landlord/reminder-schedule`, method: 'GET', signal
    },
      options);
    }
  



export const getPaymentsControllerReminderScheduleQueryKey = () => {
    return [
    `/payments/landlord/reminder-schedule`
    ] as const;
    }

    
export const getPaymentsControllerReminderScheduleQueryOptions = <TData = Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPaymentsControllerReminderScheduleQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>> = ({ signal }) => paymentsControllerReminderSchedule(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PaymentsControllerReminderScheduleQueryResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>>
export type PaymentsControllerReminderScheduleQueryError = ErrorType<unknown>


export function usePaymentsControllerReminderSchedule<TData = Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerReminderSchedule<TData = Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerReminderSchedule<TData = Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary When Seek reminds your tenants: before the due date, on the day, three days late.
 */

export function usePaymentsControllerReminderSchedule<TData = Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerReminderSchedule>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPaymentsControllerReminderScheduleQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Turn the automatic rent reminders on or off. The hourly sweep follows this setting.
 */
export const paymentsControllerUpdateReminderSchedule = (
    updateReminderScheduleDto: UpdateReminderScheduleDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<ReminderScheduleDto>(
      {url: `/payments/landlord/reminder-schedule`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateReminderScheduleDto
    },
      options);
    }
  


export const getPaymentsControllerUpdateReminderScheduleMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerUpdateReminderSchedule>>, TError,{data: UpdateReminderScheduleDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerUpdateReminderSchedule>>, TError,{data: UpdateReminderScheduleDto}, TContext> => {

const mutationKey = ['paymentsControllerUpdateReminderSchedule'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerUpdateReminderSchedule>>, {data: UpdateReminderScheduleDto}> = (props) => {
          const {data} = props ?? {};

          return  paymentsControllerUpdateReminderSchedule(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerUpdateReminderScheduleMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerUpdateReminderSchedule>>>
    export type PaymentsControllerUpdateReminderScheduleMutationBody = UpdateReminderScheduleDto
    export type PaymentsControllerUpdateReminderScheduleMutationError = ErrorType<unknown>

    /**
 * @summary Turn the automatic rent reminders on or off. The hourly sweep follows this setting.
 */
export const usePaymentsControllerUpdateReminderSchedule = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerUpdateReminderSchedule>>, TError,{data: UpdateReminderScheduleDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerUpdateReminderSchedule>>,
        TError,
        {data: UpdateReminderScheduleDto},
        TContext
      > => {

      const mutationOptions = getPaymentsControllerUpdateReminderScheduleMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Remind tenants whose rent is late. One reminder per tenant per 24 hours.
 */
export const paymentsControllerRemindLate = (
    remindLateDto: RemindLateDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<RemindLateResponseDto>(
      {url: `/payments/landlord/remind-late`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: remindLateDto, signal
    },
      options);
    }
  


export const getPaymentsControllerRemindLateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerRemindLate>>, TError,{data: RemindLateDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerRemindLate>>, TError,{data: RemindLateDto}, TContext> => {

const mutationKey = ['paymentsControllerRemindLate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerRemindLate>>, {data: RemindLateDto}> = (props) => {
          const {data} = props ?? {};

          return  paymentsControllerRemindLate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerRemindLateMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerRemindLate>>>
    export type PaymentsControllerRemindLateMutationBody = RemindLateDto
    export type PaymentsControllerRemindLateMutationError = ErrorType<unknown>

    /**
 * @summary Remind tenants whose rent is late. One reminder per tenant per 24 hours.
 */
export const usePaymentsControllerRemindLate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerRemindLate>>, TError,{data: RemindLateDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerRemindLate>>,
        TError,
        {data: RemindLateDto},
        TContext
      > => {

      const mutationOptions = getPaymentsControllerRemindLateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Start (or resume) Stripe payout setup. Returns the Stripe-hosted onboarding link.
 */
export const paymentsControllerConnectOnboard = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ConnectOnboardResponseDto>(
      {url: `/payments/connect/onboard`, method: 'POST', signal
    },
      options);
    }
  


export const getPaymentsControllerConnectOnboardMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerConnectOnboard>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerConnectOnboard>>, TError,void, TContext> => {

const mutationKey = ['paymentsControllerConnectOnboard'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerConnectOnboard>>, void> = () => {
          

          return  paymentsControllerConnectOnboard(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerConnectOnboardMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerConnectOnboard>>>
    
    export type PaymentsControllerConnectOnboardMutationError = ErrorType<ErrorDto>

    /**
 * @summary Start (or resume) Stripe payout setup. Returns the Stripe-hosted onboarding link.
 */
export const usePaymentsControllerConnectOnboard = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerConnectOnboard>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerConnectOnboard>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPaymentsControllerConnectOnboardMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Whether the landlord can take card payments and receive payouts.
 */
export const paymentsControllerConnectStatus = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ConnectStatusDto>(
      {url: `/payments/connect/status`, method: 'GET', signal
    },
      options);
    }
  



export const getPaymentsControllerConnectStatusQueryKey = () => {
    return [
    `/payments/connect/status`
    ] as const;
    }

    
export const getPaymentsControllerConnectStatusQueryOptions = <TData = Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPaymentsControllerConnectStatusQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>> = ({ signal }) => paymentsControllerConnectStatus(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PaymentsControllerConnectStatusQueryResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>>
export type PaymentsControllerConnectStatusQueryError = ErrorType<unknown>


export function usePaymentsControllerConnectStatus<TData = Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerConnectStatus>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerConnectStatus>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerConnectStatus<TData = Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerConnectStatus>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerConnectStatus>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerConnectStatus<TData = Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Whether the landlord can take card payments and receive payouts.
 */

export function usePaymentsControllerConnectStatus<TData = Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConnectStatus>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPaymentsControllerConnectStatusQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Pay with Stripe's hosted Checkout page. Returns its url; Seek's 1% fee goes to Seek, the rest to the landlord's connected account.
 */
export const paymentsControllerCheckout = (
    id: string,
    params?: PaymentsControllerCheckoutParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<CheckoutResponseDto>(
      {url: `/payments/${id}/checkout`, method: 'POST',
        params, signal
    },
      options);
    }
  


export const getPaymentsControllerCheckoutMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerCheckout>>, TError,{id: string;params?: PaymentsControllerCheckoutParams}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerCheckout>>, TError,{id: string;params?: PaymentsControllerCheckoutParams}, TContext> => {

const mutationKey = ['paymentsControllerCheckout'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerCheckout>>, {id: string;params?: PaymentsControllerCheckoutParams}> = (props) => {
          const {id,params} = props ?? {};

          return  paymentsControllerCheckout(id,params,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerCheckoutMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerCheckout>>>
    
    export type PaymentsControllerCheckoutMutationError = ErrorType<ErrorDto>

    /**
 * @summary Pay with Stripe's hosted Checkout page. Returns its url; Seek's 1% fee goes to Seek, the rest to the landlord's connected account.
 */
export const usePaymentsControllerCheckout = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerCheckout>>, TError,{id: string;params?: PaymentsControllerCheckoutParams}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerCheckout>>,
        TError,
        {id: string;params?: PaymentsControllerCheckoutParams},
        TContext
      > => {

      const mutationOptions = getPaymentsControllerCheckoutMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Called after Stripe redirects back: marks the payment paid and saves the card for autopay.
 */
export const paymentsControllerConfirmCheckout = (
    id: string,
    params: PaymentsControllerConfirmCheckoutParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PayResponseDto>(
      {url: `/payments/${id}/checkout/confirm`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getPaymentsControllerConfirmCheckoutQueryKey = (id?: string,
    params?: PaymentsControllerConfirmCheckoutParams,) => {
    return [
    `/payments/${id}/checkout/confirm`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getPaymentsControllerConfirmCheckoutQueryOptions = <TData = Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError = ErrorType<ErrorDto>>(id: string,
    params: PaymentsControllerConfirmCheckoutParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getPaymentsControllerConfirmCheckoutQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>> = ({ signal }) => paymentsControllerConfirmCheckout(id,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type PaymentsControllerConfirmCheckoutQueryResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>>
export type PaymentsControllerConfirmCheckoutQueryError = ErrorType<ErrorDto>


export function usePaymentsControllerConfirmCheckout<TData = Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: PaymentsControllerConfirmCheckoutParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerConfirmCheckout<TData = Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: PaymentsControllerConfirmCheckoutParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>,
          TError,
          Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function usePaymentsControllerConfirmCheckout<TData = Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: PaymentsControllerConfirmCheckoutParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Called after Stripe redirects back: marks the payment paid and saves the card for autopay.
 */

export function usePaymentsControllerConfirmCheckout<TData = Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: PaymentsControllerConfirmCheckoutParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof paymentsControllerConfirmCheckout>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getPaymentsControllerConfirmCheckoutQueryOptions(id,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Remind one tenant about one unpaid payment. One reminder per 24 hours.
 */
export const paymentsControllerRemind = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<RemindLateResponseDto>(
      {url: `/payments/${id}/remind`, method: 'POST', signal
    },
      options);
    }
  


export const getPaymentsControllerRemindMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerRemind>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerRemind>>, TError,{id: string}, TContext> => {

const mutationKey = ['paymentsControllerRemind'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerRemind>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  paymentsControllerRemind(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerRemindMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerRemind>>>
    
    export type PaymentsControllerRemindMutationError = ErrorType<ErrorDto>

    /**
 * @summary Remind one tenant about one unpaid payment. One reminder per 24 hours.
 */
export const usePaymentsControllerRemind = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerRemind>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerRemind>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getPaymentsControllerRemindMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Pay one instalment. Returns a Stripe client secret, or PAID straight away in local simulated mode.
 */
export const paymentsControllerPay = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PayResponseDto>(
      {url: `/payments/${id}/pay`, method: 'POST', signal
    },
      options);
    }
  


export const getPaymentsControllerPayMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerPay>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerPay>>, TError,{id: string}, TContext> => {

const mutationKey = ['paymentsControllerPay'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof paymentsControllerPay>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  paymentsControllerPay(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PaymentsControllerPayMutationResult = NonNullable<Awaited<ReturnType<typeof paymentsControllerPay>>>
    
    export type PaymentsControllerPayMutationError = ErrorType<ErrorDto>

    /**
 * @summary Pay one instalment. Returns a Stripe client secret, or PAID straight away in local simulated mode.
 */
export const usePaymentsControllerPay = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof paymentsControllerPay>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof paymentsControllerPay>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getPaymentsControllerPayMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    