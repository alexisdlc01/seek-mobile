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
  AddTenancyDocumentDto,
  CreateTenancyDto,
  DepositReceivedDto,
  ErrorDto,
  PrescribedInfoDto,
  Tenancy,
  UpdateDepositDto,
  UpdateEnergyAllowanceDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Tenancies the student lives in, with compliance status.
 */
export const tenanciesControllerMine = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy[]>(
      {url: `/tenancies/mine`, method: 'GET', signal
    },
      options);
    }
  



export const getTenanciesControllerMineQueryKey = () => {
    return [
    `/tenancies/mine`
    ] as const;
    }

    
export const getTenanciesControllerMineQueryOptions = <TData = Awaited<ReturnType<typeof tenanciesControllerMine>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerMine>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTenanciesControllerMineQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof tenanciesControllerMine>>> = ({ signal }) => tenanciesControllerMine(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerMine>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TenanciesControllerMineQueryResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerMine>>>
export type TenanciesControllerMineQueryError = ErrorType<unknown>


export function useTenanciesControllerMine<TData = Awaited<ReturnType<typeof tenanciesControllerMine>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerMine>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof tenanciesControllerMine>>,
          TError,
          Awaited<ReturnType<typeof tenanciesControllerMine>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTenanciesControllerMine<TData = Awaited<ReturnType<typeof tenanciesControllerMine>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerMine>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof tenanciesControllerMine>>,
          TError,
          Awaited<ReturnType<typeof tenanciesControllerMine>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTenanciesControllerMine<TData = Awaited<ReturnType<typeof tenanciesControllerMine>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerMine>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Tenancies the student lives in, with compliance status.
 */

export function useTenanciesControllerMine<TData = Awaited<ReturnType<typeof tenanciesControllerMine>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerMine>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTenanciesControllerMineQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary The landlord's tenancies, with compliance status.
 */
export const tenanciesControllerLandlord = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy[]>(
      {url: `/tenancies/landlord`, method: 'GET', signal
    },
      options);
    }
  



export const getTenanciesControllerLandlordQueryKey = () => {
    return [
    `/tenancies/landlord`
    ] as const;
    }

    
export const getTenanciesControllerLandlordQueryOptions = <TData = Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTenanciesControllerLandlordQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof tenanciesControllerLandlord>>> = ({ signal }) => tenanciesControllerLandlord(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TenanciesControllerLandlordQueryResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerLandlord>>>
export type TenanciesControllerLandlordQueryError = ErrorType<unknown>


export function useTenanciesControllerLandlord<TData = Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof tenanciesControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof tenanciesControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTenanciesControllerLandlord<TData = Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof tenanciesControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof tenanciesControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTenanciesControllerLandlord<TData = Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The landlord's tenancies, with compliance status.
 */

export function useTenanciesControllerLandlord<TData = Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTenanciesControllerLandlordQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary One tenancy: listing, people, deposit, documents, compliance.
 */
export const tenanciesControllerGet = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getTenanciesControllerGetQueryKey = (id?: string,) => {
    return [
    `/tenancies/${id}`
    ] as const;
    }

    
export const getTenanciesControllerGetQueryOptions = <TData = Awaited<ReturnType<typeof tenanciesControllerGet>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTenanciesControllerGetQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof tenanciesControllerGet>>> = ({ signal }) => tenanciesControllerGet(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerGet>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TenanciesControllerGetQueryResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerGet>>>
export type TenanciesControllerGetQueryError = ErrorType<ErrorDto>


export function useTenanciesControllerGet<TData = Awaited<ReturnType<typeof tenanciesControllerGet>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerGet>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof tenanciesControllerGet>>,
          TError,
          Awaited<ReturnType<typeof tenanciesControllerGet>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTenanciesControllerGet<TData = Awaited<ReturnType<typeof tenanciesControllerGet>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerGet>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof tenanciesControllerGet>>,
          TError,
          Awaited<ReturnType<typeof tenanciesControllerGet>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTenanciesControllerGet<TData = Awaited<ReturnType<typeof tenanciesControllerGet>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary One tenancy: listing, people, deposit, documents, compliance.
 */

export function useTenanciesControllerGet<TData = Awaited<ReturnType<typeof tenanciesControllerGet>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof tenanciesControllerGet>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTenanciesControllerGetQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Create a tenancy for one of your listings. From an ACCEPTED application its applicants become the tenants and rent is scheduled. By hand, the students are invited (PENDING_ACCEPTANCE) and rent starts once all have accepted.
 */
export const tenanciesControllerCreate = (
    createTenancyDto: CreateTenancyDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createTenancyDto, signal
    },
      options);
    }
  


export const getTenanciesControllerCreateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerCreate>>, TError,{data: CreateTenancyDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerCreate>>, TError,{data: CreateTenancyDto}, TContext> => {

const mutationKey = ['tenanciesControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerCreate>>, {data: CreateTenancyDto}> = (props) => {
          const {data} = props ?? {};

          return  tenanciesControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerCreate>>>
    export type TenanciesControllerCreateMutationBody = CreateTenancyDto
    export type TenanciesControllerCreateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Create a tenancy for one of your listings. From an ACCEPTED application its applicants become the tenants and rent is scheduled. By hand, the students are invited (PENDING_ACCEPTANCE) and rent starts once all have accepted.
 */
export const useTenanciesControllerCreate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerCreate>>, TError,{data: CreateTenancyDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerCreate>>,
        TError,
        {data: CreateTenancyDto},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerCreateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Accept a tenancy you were invited to. Rent is scheduled when every invited student has accepted.
 */
export const tenanciesControllerAccept = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}/accept`, method: 'POST', signal
    },
      options);
    }
  


export const getTenanciesControllerAcceptMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerAccept>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerAccept>>, TError,{id: string}, TContext> => {

const mutationKey = ['tenanciesControllerAccept'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerAccept>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  tenanciesControllerAccept(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerAcceptMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerAccept>>>
    
    export type TenanciesControllerAcceptMutationError = ErrorType<ErrorDto>

    /**
 * @summary Accept a tenancy you were invited to. Rent is scheduled when every invited student has accepted.
 */
export const useTenanciesControllerAccept = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerAccept>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerAccept>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerAcceptMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Record where the deposit is protected.
 */
export const tenanciesControllerDeposit = (
    id: string,
    updateDepositDto: UpdateDepositDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}/deposit`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateDepositDto
    },
      options);
    }
  


export const getTenanciesControllerDepositMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerDeposit>>, TError,{id: string;data: UpdateDepositDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerDeposit>>, TError,{id: string;data: UpdateDepositDto}, TContext> => {

const mutationKey = ['tenanciesControllerDeposit'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerDeposit>>, {id: string;data: UpdateDepositDto}> = (props) => {
          const {id,data} = props ?? {};

          return  tenanciesControllerDeposit(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerDepositMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerDeposit>>>
    export type TenanciesControllerDepositMutationBody = UpdateDepositDto
    export type TenanciesControllerDepositMutationError = ErrorType<ErrorDto>

    /**
 * @summary Record where the deposit is protected.
 */
export const useTenanciesControllerDeposit = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerDeposit>>, TError,{id: string;data: UpdateDepositDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerDeposit>>,
        TError,
        {id: string;data: UpdateDepositDto},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerDepositMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Set or remove the household's monthly energy fair-use allowance.
 */
export const tenanciesControllerEnergyAllowance = (
    id: string,
    updateEnergyAllowanceDto: UpdateEnergyAllowanceDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}/energy-allowance`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateEnergyAllowanceDto
    },
      options);
    }
  


export const getTenanciesControllerEnergyAllowanceMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerEnergyAllowance>>, TError,{id: string;data: UpdateEnergyAllowanceDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerEnergyAllowance>>, TError,{id: string;data: UpdateEnergyAllowanceDto}, TContext> => {

const mutationKey = ['tenanciesControllerEnergyAllowance'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerEnergyAllowance>>, {id: string;data: UpdateEnergyAllowanceDto}> = (props) => {
          const {id,data} = props ?? {};

          return  tenanciesControllerEnergyAllowance(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerEnergyAllowanceMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerEnergyAllowance>>>
    export type TenanciesControllerEnergyAllowanceMutationBody = UpdateEnergyAllowanceDto
    export type TenanciesControllerEnergyAllowanceMutationError = ErrorType<ErrorDto>

    /**
 * @summary Set or remove the household's monthly energy fair-use allowance.
 */
export const useTenanciesControllerEnergyAllowance = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerEnergyAllowance>>, TError,{id: string;data: UpdateEnergyAllowanceDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerEnergyAllowance>>,
        TError,
        {id: string;data: UpdateEnergyAllowanceDto},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerEnergyAllowanceMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Record the day the deposit was received. The 30-day protection deadline runs from it.
 */
export const tenanciesControllerDepositReceived = (
    id: string,
    depositReceivedDto: DepositReceivedDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}/deposit-received`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: depositReceivedDto
    },
      options);
    }
  


export const getTenanciesControllerDepositReceivedMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerDepositReceived>>, TError,{id: string;data: DepositReceivedDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerDepositReceived>>, TError,{id: string;data: DepositReceivedDto}, TContext> => {

const mutationKey = ['tenanciesControllerDepositReceived'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerDepositReceived>>, {id: string;data: DepositReceivedDto}> = (props) => {
          const {id,data} = props ?? {};

          return  tenanciesControllerDepositReceived(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerDepositReceivedMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerDepositReceived>>>
    export type TenanciesControllerDepositReceivedMutationBody = DepositReceivedDto
    export type TenanciesControllerDepositReceivedMutationError = ErrorType<ErrorDto>

    /**
 * @summary Record the day the deposit was received. The 30-day protection deadline runs from it.
 */
export const useTenanciesControllerDepositReceived = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerDepositReceived>>, TError,{id: string;data: DepositReceivedDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerDepositReceived>>,
        TError,
        {id: string;data: DepositReceivedDto},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerDepositReceivedMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Record that the tenants were sent the deposit scheme's prescribed information.
 */
export const tenanciesControllerPrescribedInfo = (
    id: string,
    prescribedInfoDto: PrescribedInfoDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}/prescribed-info`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: prescribedInfoDto, signal
    },
      options);
    }
  


export const getTenanciesControllerPrescribedInfoMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerPrescribedInfo>>, TError,{id: string;data: PrescribedInfoDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerPrescribedInfo>>, TError,{id: string;data: PrescribedInfoDto}, TContext> => {

const mutationKey = ['tenanciesControllerPrescribedInfo'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerPrescribedInfo>>, {id: string;data: PrescribedInfoDto}> = (props) => {
          const {id,data} = props ?? {};

          return  tenanciesControllerPrescribedInfo(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerPrescribedInfoMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerPrescribedInfo>>>
    export type TenanciesControllerPrescribedInfoMutationBody = PrescribedInfoDto
    export type TenanciesControllerPrescribedInfoMutationError = ErrorType<ErrorDto>

    /**
 * @summary Record that the tenants were sent the deposit scheme's prescribed information.
 */
export const useTenanciesControllerPrescribedInfo = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerPrescribedInfo>>, TError,{id: string;data: PrescribedInfoDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerPrescribedInfo>>,
        TError,
        {id: string;data: PrescribedInfoDto},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerPrescribedInfoMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Add a document (agreement, certificate, inventory...) to the tenancy.
 */
export const tenanciesControllerAddDocument = (
    id: string,
    addTenancyDocumentDto: AddTenancyDocumentDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Tenancy>(
      {url: `/tenancies/${id}/documents`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: addTenancyDocumentDto, signal
    },
      options);
    }
  


export const getTenanciesControllerAddDocumentMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerAddDocument>>, TError,{id: string;data: AddTenancyDocumentDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerAddDocument>>, TError,{id: string;data: AddTenancyDocumentDto}, TContext> => {

const mutationKey = ['tenanciesControllerAddDocument'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof tenanciesControllerAddDocument>>, {id: string;data: AddTenancyDocumentDto}> = (props) => {
          const {id,data} = props ?? {};

          return  tenanciesControllerAddDocument(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type TenanciesControllerAddDocumentMutationResult = NonNullable<Awaited<ReturnType<typeof tenanciesControllerAddDocument>>>
    export type TenanciesControllerAddDocumentMutationBody = AddTenancyDocumentDto
    export type TenanciesControllerAddDocumentMutationError = ErrorType<ErrorDto>

    /**
 * @summary Add a document (agreement, certificate, inventory...) to the tenancy.
 */
export const useTenanciesControllerAddDocument = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof tenanciesControllerAddDocument>>, TError,{id: string;data: AddTenancyDocumentDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof tenanciesControllerAddDocument>>,
        TError,
        {id: string;data: AddTenancyDocumentDto},
        TContext
      > => {

      const mutationOptions = getTenanciesControllerAddDocumentMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    