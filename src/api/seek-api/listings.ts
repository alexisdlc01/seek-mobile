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
  CreateListingDto,
  ErrorDto,
  LikedListingsDto,
  Listing,
  ListingSearchResultDto,
  ListingsControllerGetFilteredListingsParams,
  Step2ListingDto,
  Step3ListingDto,
  Step4ListingDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export const listingsControllerCreateDraft = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<string>(
      {url: `/listings/draft`, method: 'POST', signal
    },
      options);
    }
  


export const getListingsControllerCreateDraftMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateDraft>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateDraft>>, TError,void, TContext> => {

const mutationKey = ['listingsControllerCreateDraft'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerCreateDraft>>, void> = () => {
          

          return  listingsControllerCreateDraft(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerCreateDraftMutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerCreateDraft>>>
    
    export type ListingsControllerCreateDraftMutationError = ErrorType<ErrorDto>

    export const useListingsControllerCreateDraft = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateDraft>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerCreateDraft>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getListingsControllerCreateDraftMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerCreateStep1 = (
    id: string,
    createListingDto: CreateListingDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/${id}/createStep1`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: createListingDto
    },
      options);
    }
  


export const getListingsControllerCreateStep1MutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep1>>, TError,{id: string;data: CreateListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep1>>, TError,{id: string;data: CreateListingDto}, TContext> => {

const mutationKey = ['listingsControllerCreateStep1'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerCreateStep1>>, {id: string;data: CreateListingDto}> = (props) => {
          const {id,data} = props ?? {};

          return  listingsControllerCreateStep1(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerCreateStep1MutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerCreateStep1>>>
    export type ListingsControllerCreateStep1MutationBody = CreateListingDto
    export type ListingsControllerCreateStep1MutationError = ErrorType<ErrorDto>

    export const useListingsControllerCreateStep1 = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep1>>, TError,{id: string;data: CreateListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerCreateStep1>>,
        TError,
        {id: string;data: CreateListingDto},
        TContext
      > => {

      const mutationOptions = getListingsControllerCreateStep1MutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerCreateStep2 = (
    id: string,
    step2ListingDto: Step2ListingDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/${id}/createStep2`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: step2ListingDto
    },
      options);
    }
  


export const getListingsControllerCreateStep2MutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep2>>, TError,{id: string;data: Step2ListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep2>>, TError,{id: string;data: Step2ListingDto}, TContext> => {

const mutationKey = ['listingsControllerCreateStep2'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerCreateStep2>>, {id: string;data: Step2ListingDto}> = (props) => {
          const {id,data} = props ?? {};

          return  listingsControllerCreateStep2(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerCreateStep2MutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerCreateStep2>>>
    export type ListingsControllerCreateStep2MutationBody = Step2ListingDto
    export type ListingsControllerCreateStep2MutationError = ErrorType<ErrorDto>

    export const useListingsControllerCreateStep2 = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep2>>, TError,{id: string;data: Step2ListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerCreateStep2>>,
        TError,
        {id: string;data: Step2ListingDto},
        TContext
      > => {

      const mutationOptions = getListingsControllerCreateStep2MutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerCreateStep3 = (
    id: string,
    step3ListingDto: Step3ListingDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/${id}/createStep3`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: step3ListingDto
    },
      options);
    }
  


export const getListingsControllerCreateStep3MutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep3>>, TError,{id: string;data: Step3ListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep3>>, TError,{id: string;data: Step3ListingDto}, TContext> => {

const mutationKey = ['listingsControllerCreateStep3'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerCreateStep3>>, {id: string;data: Step3ListingDto}> = (props) => {
          const {id,data} = props ?? {};

          return  listingsControllerCreateStep3(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerCreateStep3MutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerCreateStep3>>>
    export type ListingsControllerCreateStep3MutationBody = Step3ListingDto
    export type ListingsControllerCreateStep3MutationError = ErrorType<ErrorDto>

    export const useListingsControllerCreateStep3 = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep3>>, TError,{id: string;data: Step3ListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerCreateStep3>>,
        TError,
        {id: string;data: Step3ListingDto},
        TContext
      > => {

      const mutationOptions = getListingsControllerCreateStep3MutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerCreateStep4 = (
    id: string,
    step4ListingDto: Step4ListingDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/listings/${id}/createStep4`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: step4ListingDto
    },
      options);
    }
  


export const getListingsControllerCreateStep4MutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep4>>, TError,{id: string;data: Step4ListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep4>>, TError,{id: string;data: Step4ListingDto}, TContext> => {

const mutationKey = ['listingsControllerCreateStep4'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerCreateStep4>>, {id: string;data: Step4ListingDto}> = (props) => {
          const {id,data} = props ?? {};

          return  listingsControllerCreateStep4(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerCreateStep4MutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerCreateStep4>>>
    export type ListingsControllerCreateStep4MutationBody = Step4ListingDto
    export type ListingsControllerCreateStep4MutationError = ErrorType<unknown>

    export const useListingsControllerCreateStep4 = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerCreateStep4>>, TError,{id: string;data: Step4ListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerCreateStep4>>,
        TError,
        {id: string;data: Step4ListingDto},
        TContext
      > => {

      const mutationOptions = getListingsControllerCreateStep4MutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerPublish = (
    id: string,
    createListingDto: CreateListingDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/${id}/publish`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createListingDto, signal
    },
      options);
    }
  


export const getListingsControllerPublishMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerPublish>>, TError,{id: string;data: CreateListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerPublish>>, TError,{id: string;data: CreateListingDto}, TContext> => {

const mutationKey = ['listingsControllerPublish'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerPublish>>, {id: string;data: CreateListingDto}> = (props) => {
          const {id,data} = props ?? {};

          return  listingsControllerPublish(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerPublishMutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerPublish>>>
    export type ListingsControllerPublishMutationBody = CreateListingDto
    export type ListingsControllerPublishMutationError = ErrorType<ErrorDto>

    export const useListingsControllerPublish = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerPublish>>, TError,{id: string;data: CreateListingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerPublish>>,
        TError,
        {id: string;data: CreateListingDto},
        TContext
      > => {

      const mutationOptions = getListingsControllerPublishMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerDeleteListing = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getListingsControllerDeleteListingMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerDeleteListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerDeleteListing>>, TError,{id: string}, TContext> => {

const mutationKey = ['listingsControllerDeleteListing'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerDeleteListing>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  listingsControllerDeleteListing(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerDeleteListingMutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerDeleteListing>>>
    
    export type ListingsControllerDeleteListingMutationError = ErrorType<ErrorDto>

    export const useListingsControllerDeleteListing = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerDeleteListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerDeleteListing>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getListingsControllerDeleteListingMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Get a published and verified property
 */
export const listingsControllerGetById = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getListingsControllerGetByIdQueryKey = (id?: string,) => {
    return [
    `/listings/${id}`
    ] as const;
    }

    
export const getListingsControllerGetByIdQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerGetById>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetById>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerGetByIdQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerGetById>>> = ({ signal }) => listingsControllerGetById(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetById>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerGetByIdQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerGetById>>>
export type ListingsControllerGetByIdQueryError = ErrorType<ErrorDto>


export function useListingsControllerGetById<TData = Awaited<ReturnType<typeof listingsControllerGetById>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetById>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetById>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetById>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetById<TData = Awaited<ReturnType<typeof listingsControllerGetById>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetById>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetById>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetById>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetById<TData = Awaited<ReturnType<typeof listingsControllerGetById>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetById>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get a published and verified property
 */

export function useListingsControllerGetById<TData = Awaited<ReturnType<typeof listingsControllerGetById>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetById>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerGetByIdQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const listingsControllerMyListings = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Listing[]>(
      {url: `/listings/mine`, method: 'GET', signal
    },
      options);
    }
  



export const getListingsControllerMyListingsQueryKey = () => {
    return [
    `/listings/mine`
    ] as const;
    }

    
export const getListingsControllerMyListingsQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerMyListings>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerMyListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerMyListingsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerMyListings>>> = ({ signal }) => listingsControllerMyListings(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerMyListings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerMyListingsQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerMyListings>>>
export type ListingsControllerMyListingsQueryError = ErrorType<ErrorDto>


export function useListingsControllerMyListings<TData = Awaited<ReturnType<typeof listingsControllerMyListings>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerMyListings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerMyListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerMyListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerMyListings<TData = Awaited<ReturnType<typeof listingsControllerMyListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerMyListings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerMyListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerMyListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerMyListings<TData = Awaited<ReturnType<typeof listingsControllerMyListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerMyListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useListingsControllerMyListings<TData = Awaited<ReturnType<typeof listingsControllerMyListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerMyListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerMyListingsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const listingsControllerGetListing = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/mine/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getListingsControllerGetListingQueryKey = (id?: string,) => {
    return [
    `/listings/mine/${id}`
    ] as const;
    }

    
export const getListingsControllerGetListingQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerGetListing>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetListing>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerGetListingQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerGetListing>>> = ({ signal }) => listingsControllerGetListing(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetListing>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerGetListingQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerGetListing>>>
export type ListingsControllerGetListingQueryError = ErrorType<ErrorDto>


export function useListingsControllerGetListing<TData = Awaited<ReturnType<typeof listingsControllerGetListing>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetListing>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetListing>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetListing>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetListing<TData = Awaited<ReturnType<typeof listingsControllerGetListing>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetListing>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetListing>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetListing>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetListing<TData = Awaited<ReturnType<typeof listingsControllerGetListing>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetListing>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useListingsControllerGetListing<TData = Awaited<ReturnType<typeof listingsControllerGetListing>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetListing>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerGetListingQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const listingsControllerGetAllUnverifiedListings = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Listing[]>(
      {url: `/listings/allUnverified`, method: 'GET', signal
    },
      options);
    }
  



export const getListingsControllerGetAllUnverifiedListingsQueryKey = () => {
    return [
    `/listings/allUnverified`
    ] as const;
    }

    
export const getListingsControllerGetAllUnverifiedListingsQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerGetAllUnverifiedListingsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>> = ({ signal }) => listingsControllerGetAllUnverifiedListings(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerGetAllUnverifiedListingsQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>>
export type ListingsControllerGetAllUnverifiedListingsQueryError = ErrorType<ErrorDto>


export function useListingsControllerGetAllUnverifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetAllUnverifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetAllUnverifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useListingsControllerGetAllUnverifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllUnverifiedListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerGetAllUnverifiedListingsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary List published and verified properties
 */
export const listingsControllerGetAllVerifiedListings = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Listing[]>(
      {url: `/listings/allVerified`, method: 'GET', signal
    },
      options);
    }
  



export const getListingsControllerGetAllVerifiedListingsQueryKey = () => {
    return [
    `/listings/allVerified`
    ] as const;
    }

    
export const getListingsControllerGetAllVerifiedListingsQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerGetAllVerifiedListingsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>> = ({ signal }) => listingsControllerGetAllVerifiedListings(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerGetAllVerifiedListingsQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>>
export type ListingsControllerGetAllVerifiedListingsQueryError = ErrorType<ErrorDto>


export function useListingsControllerGetAllVerifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetAllVerifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetAllVerifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary List published and verified properties
 */

export function useListingsControllerGetAllVerifiedListings<TData = Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetAllVerifiedListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerGetAllVerifiedListingsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Filter published and verified properties
 */
export const listingsControllerGetFilteredListings = (
    params?: ListingsControllerGetFilteredListingsParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ListingSearchResultDto[]>(
      {url: `/listings/filter`, method: 'GET',
        params, signal
    },
      options);
    }
  



export const getListingsControllerGetFilteredListingsQueryKey = (params?: ListingsControllerGetFilteredListingsParams,) => {
    return [
    `/listings/filter`, ...(params ? [params]: [])
    ] as const;
    }

    
export const getListingsControllerGetFilteredListingsQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError = ErrorType<ErrorDto>>(params?: ListingsControllerGetFilteredListingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerGetFilteredListingsQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>> = ({ signal }) => listingsControllerGetFilteredListings(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerGetFilteredListingsQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>>
export type ListingsControllerGetFilteredListingsQueryError = ErrorType<ErrorDto>


export function useListingsControllerGetFilteredListings<TData = Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError = ErrorType<ErrorDto>>(
 params: undefined |  ListingsControllerGetFilteredListingsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetFilteredListings<TData = Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError = ErrorType<ErrorDto>>(
 params?: ListingsControllerGetFilteredListingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetFilteredListings<TData = Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError = ErrorType<ErrorDto>>(
 params?: ListingsControllerGetFilteredListingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Filter published and verified properties
 */

export function useListingsControllerGetFilteredListings<TData = Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError = ErrorType<ErrorDto>>(
 params?: ListingsControllerGetFilteredListingsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetFilteredListings>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerGetFilteredListingsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const listingsControllerGetLiked = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<LikedListingsDto>(
      {url: `/listings/like`, method: 'GET', signal
    },
      options);
    }
  



export const getListingsControllerGetLikedQueryKey = () => {
    return [
    `/listings/like`
    ] as const;
    }

    
export const getListingsControllerGetLikedQueryOptions = <TData = Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getListingsControllerGetLikedQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof listingsControllerGetLiked>>> = ({ signal }) => listingsControllerGetLiked(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ListingsControllerGetLikedQueryResult = NonNullable<Awaited<ReturnType<typeof listingsControllerGetLiked>>>
export type ListingsControllerGetLikedQueryError = ErrorType<ErrorDto>


export function useListingsControllerGetLiked<TData = Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetLiked>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetLiked>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetLiked<TData = Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listingsControllerGetLiked>>,
          TError,
          Awaited<ReturnType<typeof listingsControllerGetLiked>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useListingsControllerGetLiked<TData = Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useListingsControllerGetLiked<TData = Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof listingsControllerGetLiked>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getListingsControllerGetLikedQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Run the automatic check again on a listing (Seek staff). Never approves a listing by hand.
 */
export const listingsControllerVerifyListing = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<Listing>(
      {url: `/listings/verify/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getListingsControllerVerifyListingMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerVerifyListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerVerifyListing>>, TError,{id: string}, TContext> => {

const mutationKey = ['listingsControllerVerifyListing'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerVerifyListing>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  listingsControllerVerifyListing(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerVerifyListingMutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerVerifyListing>>>
    
    export type ListingsControllerVerifyListingMutationError = ErrorType<ErrorDto>

    /**
 * @summary Run the automatic check again on a listing (Seek staff). Never approves a listing by hand.
 */
export const useListingsControllerVerifyListing = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerVerifyListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerVerifyListing>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getListingsControllerVerifyListingMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerLikeListing = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/listings/like/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getListingsControllerLikeListingMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerLikeListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerLikeListing>>, TError,{id: string}, TContext> => {

const mutationKey = ['listingsControllerLikeListing'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerLikeListing>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  listingsControllerLikeListing(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerLikeListingMutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerLikeListing>>>
    
    export type ListingsControllerLikeListingMutationError = ErrorType<ErrorDto>

    export const useListingsControllerLikeListing = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerLikeListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerLikeListing>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getListingsControllerLikeListingMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const listingsControllerUnlikeListing = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/listings/unlike/${id}`, method: 'PATCH'
    },
      options);
    }
  


export const getListingsControllerUnlikeListingMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerUnlikeListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof listingsControllerUnlikeListing>>, TError,{id: string}, TContext> => {

const mutationKey = ['listingsControllerUnlikeListing'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof listingsControllerUnlikeListing>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  listingsControllerUnlikeListing(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ListingsControllerUnlikeListingMutationResult = NonNullable<Awaited<ReturnType<typeof listingsControllerUnlikeListing>>>
    
    export type ListingsControllerUnlikeListingMutationError = ErrorType<ErrorDto>

    export const useListingsControllerUnlikeListing = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof listingsControllerUnlikeListing>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof listingsControllerUnlikeListing>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getListingsControllerUnlikeListingMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    