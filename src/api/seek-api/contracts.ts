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
  Contract,
  ContractTemplate,
  ContractsControllerDocumentParams,
  ContractsControllerPrescribedInformationParams,
  CreateContractDto,
  CreateContractTemplateDto,
  DeductionsDto,
  DefaultContractDto,
  ErrorDto,
  InventoryDto,
  RespondDeductionsDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Add a draft tenancy agreement to one of your tenancies.
 */
export const contractsControllerCreate = (
    createContractDto: CreateContractDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createContractDto, signal
    },
      options);
    }
  


export const getContractsControllerCreateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreate>>, TError,{data: CreateContractDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreate>>, TError,{data: CreateContractDto}, TContext> => {

const mutationKey = ['contractsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerCreate>>, {data: CreateContractDto}> = (props) => {
          const {data} = props ?? {};

          return  contractsControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerCreate>>>
    export type ContractsControllerCreateMutationBody = CreateContractDto
    export type ContractsControllerCreateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Add a draft tenancy agreement to one of your tenancies.
 */
export const useContractsControllerCreate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreate>>, TError,{data: CreateContractDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerCreate>>,
        TError,
        {data: CreateContractDto},
        TContext
      > => {

      const mutationOptions = getContractsControllerCreateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Draft Seek's own agreement for a tenancy: an assured periodic tenancy in England or a standard occupation contract in Wales. Its url and prescribedInformationUrl open as HTML.
 */
export const contractsControllerCreateDefault = (
    defaultContractDto: DefaultContractDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/default`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: defaultContractDto, signal
    },
      options);
    }
  


export const getContractsControllerCreateDefaultMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreateDefault>>, TError,{data: DefaultContractDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreateDefault>>, TError,{data: DefaultContractDto}, TContext> => {

const mutationKey = ['contractsControllerCreateDefault'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerCreateDefault>>, {data: DefaultContractDto}> = (props) => {
          const {data} = props ?? {};

          return  contractsControllerCreateDefault(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerCreateDefaultMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerCreateDefault>>>
    export type ContractsControllerCreateDefaultMutationBody = DefaultContractDto
    export type ContractsControllerCreateDefaultMutationError = ErrorType<ErrorDto>

    /**
 * @summary Draft Seek's own agreement for a tenancy: an assured periodic tenancy in England or a standard occupation contract in Wales. Its url and prescribedInformationUrl open as HTML.
 */
export const useContractsControllerCreateDefault = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreateDefault>>, TError,{data: DefaultContractDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerCreateDefault>>,
        TError,
        {data: DefaultContractDto},
        TContext
      > => {

      const mutationOptions = getContractsControllerCreateDefaultMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary The Seek agreement as HTML. Use the contract's url, which carries its signature.
 */
export const contractsControllerDocument = (
    id: string,
    params: ContractsControllerDocumentParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/contracts/${id}/document`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getContractsControllerDocumentQueryKey = (id?: string,
    params?: ContractsControllerDocumentParams,) => {
    return [
    `/contracts/${id}/document`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getContractsControllerDocumentQueryOptions = <TData = Awaited<ReturnType<typeof contractsControllerDocument>>, TError = ErrorType<ErrorDto>>(id: string,
    params: ContractsControllerDocumentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerDocument>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getContractsControllerDocumentQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof contractsControllerDocument>>> = ({ signal }) => contractsControllerDocument(id,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof contractsControllerDocument>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ContractsControllerDocumentQueryResult = NonNullable<Awaited<ReturnType<typeof contractsControllerDocument>>>
export type ContractsControllerDocumentQueryError = ErrorType<ErrorDto>


export function useContractsControllerDocument<TData = Awaited<ReturnType<typeof contractsControllerDocument>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerDocumentParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerDocument>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerDocument>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerDocument>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerDocument<TData = Awaited<ReturnType<typeof contractsControllerDocument>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerDocumentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerDocument>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerDocument>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerDocument>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerDocument<TData = Awaited<ReturnType<typeof contractsControllerDocument>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerDocumentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerDocument>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The Seek agreement as HTML. Use the contract's url, which carries its signature.
 */

export function useContractsControllerDocument<TData = Awaited<ReturnType<typeof contractsControllerDocument>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerDocumentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerDocument>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getContractsControllerDocumentQueryOptions(id,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary The deposit's prescribed information as HTML. Use the contract's prescribedInformationUrl.
 */
export const contractsControllerPrescribedInformation = (
    id: string,
    params: ContractsControllerPrescribedInformationParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/contracts/${id}/prescribed-information`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getContractsControllerPrescribedInformationQueryKey = (id?: string,
    params?: ContractsControllerPrescribedInformationParams,) => {
    return [
    `/contracts/${id}/prescribed-information`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getContractsControllerPrescribedInformationQueryOptions = <TData = Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError = ErrorType<ErrorDto>>(id: string,
    params: ContractsControllerPrescribedInformationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getContractsControllerPrescribedInformationQueryKey(id,params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>> = ({ signal }) => contractsControllerPrescribedInformation(id,params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ContractsControllerPrescribedInformationQueryResult = NonNullable<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>>
export type ContractsControllerPrescribedInformationQueryError = ErrorType<ErrorDto>


export function useContractsControllerPrescribedInformation<TData = Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerPrescribedInformationParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerPrescribedInformation<TData = Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerPrescribedInformationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerPrescribedInformation<TData = Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerPrescribedInformationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The deposit's prescribed information as HTML. Use the contract's prescribedInformationUrl.
 */

export function useContractsControllerPrescribedInformation<TData = Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError = ErrorType<ErrorDto>>(
 id: string,
    params: ContractsControllerPrescribedInformationParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerPrescribedInformation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getContractsControllerPrescribedInformationQueryOptions(id,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Record the check-in inventory. The tenants are told to check it.
 */
export const contractsControllerInventory = (
    id: string,
    inventoryDto: InventoryDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/${id}/inventory`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: inventoryDto
    },
      options);
    }
  


export const getContractsControllerInventoryMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerInventory>>, TError,{id: string;data: InventoryDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerInventory>>, TError,{id: string;data: InventoryDto}, TContext> => {

const mutationKey = ['contractsControllerInventory'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerInventory>>, {id: string;data: InventoryDto}> = (props) => {
          const {id,data} = props ?? {};

          return  contractsControllerInventory(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerInventoryMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerInventory>>>
    export type ContractsControllerInventoryMutationBody = InventoryDto
    export type ContractsControllerInventoryMutationError = ErrorType<ErrorDto>

    /**
 * @summary Record the check-in inventory. The tenants are told to check it.
 */
export const useContractsControllerInventory = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerInventory>>, TError,{id: string;data: InventoryDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerInventory>>,
        TError,
        {id: string;data: InventoryDto},
        TContext
      > => {

      const mutationOptions = getContractsControllerInventoryMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Propose end-of-tenancy deductions from the deposit (never more than the deposit). The tenants accept or dispute.
 */
export const contractsControllerDeductions = (
    id: string,
    deductionsDto: DeductionsDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/${id}/deductions`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: deductionsDto, signal
    },
      options);
    }
  


export const getContractsControllerDeductionsMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerDeductions>>, TError,{id: string;data: DeductionsDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerDeductions>>, TError,{id: string;data: DeductionsDto}, TContext> => {

const mutationKey = ['contractsControllerDeductions'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerDeductions>>, {id: string;data: DeductionsDto}> = (props) => {
          const {id,data} = props ?? {};

          return  contractsControllerDeductions(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerDeductionsMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerDeductions>>>
    export type ContractsControllerDeductionsMutationBody = DeductionsDto
    export type ContractsControllerDeductionsMutationError = ErrorType<ErrorDto>

    /**
 * @summary Propose end-of-tenancy deductions from the deposit (never more than the deposit). The tenants accept or dispute.
 */
export const useContractsControllerDeductions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerDeductions>>, TError,{id: string;data: DeductionsDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerDeductions>>,
        TError,
        {id: string;data: DeductionsDto},
        TContext
      > => {

      const mutationOptions = getContractsControllerDeductionsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Accept or dispute the proposed deductions. ACCEPTED once every tenant agrees; DISPUTED as soon as one disagrees.
 */
export const contractsControllerRespondToDeductions = (
    id: string,
    respondDeductionsDto: RespondDeductionsDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/${id}/deductions/respond`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: respondDeductionsDto, signal
    },
      options);
    }
  


export const getContractsControllerRespondToDeductionsMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerRespondToDeductions>>, TError,{id: string;data: RespondDeductionsDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerRespondToDeductions>>, TError,{id: string;data: RespondDeductionsDto}, TContext> => {

const mutationKey = ['contractsControllerRespondToDeductions'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerRespondToDeductions>>, {id: string;data: RespondDeductionsDto}> = (props) => {
          const {id,data} = props ?? {};

          return  contractsControllerRespondToDeductions(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerRespondToDeductionsMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerRespondToDeductions>>>
    export type ContractsControllerRespondToDeductionsMutationBody = RespondDeductionsDto
    export type ContractsControllerRespondToDeductionsMutationError = ErrorType<ErrorDto>

    /**
 * @summary Accept or dispute the proposed deductions. ACCEPTED once every tenant agrees; DISPUTED as soon as one disagrees.
 */
export const useContractsControllerRespondToDeductions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerRespondToDeductions>>, TError,{id: string;data: RespondDeductionsDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerRespondToDeductions>>,
        TError,
        {id: string;data: RespondDeductionsDto},
        TContext
      > => {

      const mutationOptions = getContractsControllerRespondToDeductionsMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Save an uploaded agreement as a reusable template.
 */
export const contractsControllerCreateTemplate = (
    createContractTemplateDto: CreateContractTemplateDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ContractTemplate>(
      {url: `/contracts/templates`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createContractTemplateDto, signal
    },
      options);
    }
  


export const getContractsControllerCreateTemplateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreateTemplate>>, TError,{data: CreateContractTemplateDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreateTemplate>>, TError,{data: CreateContractTemplateDto}, TContext> => {

const mutationKey = ['contractsControllerCreateTemplate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerCreateTemplate>>, {data: CreateContractTemplateDto}> = (props) => {
          const {data} = props ?? {};

          return  contractsControllerCreateTemplate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerCreateTemplateMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerCreateTemplate>>>
    export type ContractsControllerCreateTemplateMutationBody = CreateContractTemplateDto
    export type ContractsControllerCreateTemplateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Save an uploaded agreement as a reusable template.
 */
export const useContractsControllerCreateTemplate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerCreateTemplate>>, TError,{data: CreateContractTemplateDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerCreateTemplate>>,
        TError,
        {data: CreateContractTemplateDto},
        TContext
      > => {

      const mutationOptions = getContractsControllerCreateTemplateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary The landlord's saved agreement templates.
 */
export const contractsControllerTemplates = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ContractTemplate[]>(
      {url: `/contracts/templates`, method: 'GET', signal
    },
      options);
    }
  



export const getContractsControllerTemplatesQueryKey = () => {
    return [
    `/contracts/templates`
    ] as const;
    }

    
export const getContractsControllerTemplatesQueryOptions = <TData = Awaited<ReturnType<typeof contractsControllerTemplates>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerTemplates>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getContractsControllerTemplatesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof contractsControllerTemplates>>> = ({ signal }) => contractsControllerTemplates(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof contractsControllerTemplates>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ContractsControllerTemplatesQueryResult = NonNullable<Awaited<ReturnType<typeof contractsControllerTemplates>>>
export type ContractsControllerTemplatesQueryError = ErrorType<unknown>


export function useContractsControllerTemplates<TData = Awaited<ReturnType<typeof contractsControllerTemplates>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerTemplates>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerTemplates>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerTemplates>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerTemplates<TData = Awaited<ReturnType<typeof contractsControllerTemplates>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerTemplates>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerTemplates>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerTemplates>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerTemplates<TData = Awaited<ReturnType<typeof contractsControllerTemplates>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerTemplates>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The landlord's saved agreement templates.
 */

export function useContractsControllerTemplates<TData = Awaited<ReturnType<typeof contractsControllerTemplates>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerTemplates>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getContractsControllerTemplatesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Delete one of your templates. Contracts already created from it are unaffected.
 */
export const contractsControllerDeleteTemplate = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<unknown>(
      {url: `/contracts/templates/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getContractsControllerDeleteTemplateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerDeleteTemplate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerDeleteTemplate>>, TError,{id: string}, TContext> => {

const mutationKey = ['contractsControllerDeleteTemplate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerDeleteTemplate>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  contractsControllerDeleteTemplate(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerDeleteTemplateMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerDeleteTemplate>>>
    
    export type ContractsControllerDeleteTemplateMutationError = ErrorType<ErrorDto>

    /**
 * @summary Delete one of your templates. Contracts already created from it are unaffected.
 */
export const useContractsControllerDeleteTemplate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerDeleteTemplate>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerDeleteTemplate>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getContractsControllerDeleteTemplateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Every contract across the landlord's tenancies.
 */
export const contractsControllerLandlord = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract[]>(
      {url: `/contracts/landlord`, method: 'GET', signal
    },
      options);
    }
  



export const getContractsControllerLandlordQueryKey = () => {
    return [
    `/contracts/landlord`
    ] as const;
    }

    
export const getContractsControllerLandlordQueryOptions = <TData = Awaited<ReturnType<typeof contractsControllerLandlord>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getContractsControllerLandlordQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof contractsControllerLandlord>>> = ({ signal }) => contractsControllerLandlord(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof contractsControllerLandlord>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ContractsControllerLandlordQueryResult = NonNullable<Awaited<ReturnType<typeof contractsControllerLandlord>>>
export type ContractsControllerLandlordQueryError = ErrorType<unknown>


export function useContractsControllerLandlord<TData = Awaited<ReturnType<typeof contractsControllerLandlord>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerLandlord>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerLandlord<TData = Awaited<ReturnType<typeof contractsControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerLandlord>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerLandlord>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerLandlord>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerLandlord<TData = Awaited<ReturnType<typeof contractsControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Every contract across the landlord's tenancies.
 */

export function useContractsControllerLandlord<TData = Awaited<ReturnType<typeof contractsControllerLandlord>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerLandlord>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getContractsControllerLandlordQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Contracts for one tenancy.
 */
export const contractsControllerForTenancy = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract[]>(
      {url: `/contracts/tenancy/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getContractsControllerForTenancyQueryKey = (id?: string,) => {
    return [
    `/contracts/tenancy/${id}`
    ] as const;
    }

    
export const getContractsControllerForTenancyQueryOptions = <TData = Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getContractsControllerForTenancyQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof contractsControllerForTenancy>>> = ({ signal }) => contractsControllerForTenancy(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ContractsControllerForTenancyQueryResult = NonNullable<Awaited<ReturnType<typeof contractsControllerForTenancy>>>
export type ContractsControllerForTenancyQueryError = ErrorType<ErrorDto>


export function useContractsControllerForTenancy<TData = Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerForTenancy>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerForTenancy>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerForTenancy<TData = Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof contractsControllerForTenancy>>,
          TError,
          Awaited<ReturnType<typeof contractsControllerForTenancy>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useContractsControllerForTenancy<TData = Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Contracts for one tenancy.
 */

export function useContractsControllerForTenancy<TData = Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof contractsControllerForTenancy>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getContractsControllerForTenancyQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Send a draft contract to the tenants for signature.
 */
export const contractsControllerSend = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/${id}/send`, method: 'POST', signal
    },
      options);
    }
  


export const getContractsControllerSendMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerSend>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerSend>>, TError,{id: string}, TContext> => {

const mutationKey = ['contractsControllerSend'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerSend>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  contractsControllerSend(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerSendMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerSend>>>
    
    export type ContractsControllerSendMutationError = ErrorType<ErrorDto>

    /**
 * @summary Send a draft contract to the tenants for signature.
 */
export const useContractsControllerSend = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerSend>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerSend>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getContractsControllerSendMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Email the signing link again to tenants who have not signed a sent contract (once per 24 hours).
 */
export const contractsControllerRemind = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/${id}/remind`, method: 'POST', signal
    },
      options);
    }
  


export const getContractsControllerRemindMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerRemind>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerRemind>>, TError,{id: string}, TContext> => {

const mutationKey = ['contractsControllerRemind'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerRemind>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  contractsControllerRemind(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerRemindMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerRemind>>>
    
    export type ContractsControllerRemindMutationError = ErrorType<ErrorDto>

    /**
 * @summary Email the signing link again to tenants who have not signed a sent contract (once per 24 hours).
 */
export const useContractsControllerRemind = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerRemind>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerRemind>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getContractsControllerRemindMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Sign a sent contract. It becomes SIGNED when every tenant has signed.
 */
export const contractsControllerSign = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contract>(
      {url: `/contracts/${id}/sign`, method: 'POST', signal
    },
      options);
    }
  


export const getContractsControllerSignMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerSign>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contractsControllerSign>>, TError,{id: string}, TContext> => {

const mutationKey = ['contractsControllerSign'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contractsControllerSign>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  contractsControllerSign(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContractsControllerSignMutationResult = NonNullable<Awaited<ReturnType<typeof contractsControllerSign>>>
    
    export type ContractsControllerSignMutationError = ErrorType<ErrorDto>

    /**
 * @summary Sign a sent contract. It becomes SIGNED when every tenant has signed.
 */
export const useContractsControllerSign = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contractsControllerSign>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contractsControllerSign>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getContractsControllerSignMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    