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
  ApplicationControllerApproveApplication200,
  ApplicationControllerJoinApplicationParams,
  ApplicationDto,
  CreateApplicationDto,
  ErrorDto,
  RejectApplicationDto,
  ScheduleViewingDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export const applicationControllerCreateApplication = (
    createApplicationDto: CreateApplicationDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ApplicationDto>(
      {url: `/application/create`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createApplicationDto, signal
    },
      options);
    }
  


export const getApplicationControllerCreateApplicationMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerCreateApplication>>, TError,{data: CreateApplicationDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerCreateApplication>>, TError,{data: CreateApplicationDto}, TContext> => {

const mutationKey = ['applicationControllerCreateApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerCreateApplication>>, {data: CreateApplicationDto}> = (props) => {
          const {data} = props ?? {};

          return  applicationControllerCreateApplication(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerCreateApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerCreateApplication>>>
    export type ApplicationControllerCreateApplicationMutationBody = CreateApplicationDto
    export type ApplicationControllerCreateApplicationMutationError = ErrorType<ErrorDto>

    export const useApplicationControllerCreateApplication = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerCreateApplication>>, TError,{data: CreateApplicationDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerCreateApplication>>,
        TError,
        {data: CreateApplicationDto},
        TContext
      > => {

      const mutationOptions = getApplicationControllerCreateApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const applicationControllerJoinApplication = (
    id: string,
    params: ApplicationControllerJoinApplicationParams,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/join`, method: 'PATCH',
        params
    },
      options);
    }
  


export const getApplicationControllerJoinApplicationMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerJoinApplication>>, TError,{id: string;params: ApplicationControllerJoinApplicationParams}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerJoinApplication>>, TError,{id: string;params: ApplicationControllerJoinApplicationParams}, TContext> => {

const mutationKey = ['applicationControllerJoinApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerJoinApplication>>, {id: string;params: ApplicationControllerJoinApplicationParams}> = (props) => {
          const {id,params} = props ?? {};

          return  applicationControllerJoinApplication(id,params,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerJoinApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerJoinApplication>>>
    
    export type ApplicationControllerJoinApplicationMutationError = ErrorType<ErrorDto>

    export const useApplicationControllerJoinApplication = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerJoinApplication>>, TError,{id: string;params: ApplicationControllerJoinApplicationParams}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerJoinApplication>>,
        TError,
        {id: string;params: ApplicationControllerJoinApplicationParams},
        TContext
      > => {

      const mutationOptions = getApplicationControllerJoinApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const applicationControllerCreateInvite = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/invite`, method: 'POST', signal
    },
      options);
    }
  


export const getApplicationControllerCreateInviteMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerCreateInvite>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerCreateInvite>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerCreateInvite'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerCreateInvite>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerCreateInvite(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerCreateInviteMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerCreateInvite>>>
    
    export type ApplicationControllerCreateInviteMutationError = ErrorType<unknown>

    export const useApplicationControllerCreateInvite = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerCreateInvite>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerCreateInvite>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerCreateInviteMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const applicationControllerLeaveApplication = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/leave`, method: 'PATCH'
    },
      options);
    }
  


export const getApplicationControllerLeaveApplicationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerLeaveApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerLeaveApplication>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerLeaveApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerLeaveApplication>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerLeaveApplication(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerLeaveApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerLeaveApplication>>>
    
    export type ApplicationControllerLeaveApplicationMutationError = ErrorType<unknown>

    export const useApplicationControllerLeaveApplication = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerLeaveApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerLeaveApplication>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerLeaveApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const applicationControllerSendApplication = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/send`, method: 'PATCH'
    },
      options);
    }
  


export const getApplicationControllerSendApplicationMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerSendApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerSendApplication>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerSendApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerSendApplication>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerSendApplication(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerSendApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerSendApplication>>>
    
    export type ApplicationControllerSendApplicationMutationError = ErrorType<ErrorDto>

    export const useApplicationControllerSendApplication = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerSendApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerSendApplication>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerSendApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Book or move the viewing. Landlord or a household member.
 */
export const applicationControllerScheduleViewing = (
    id: string,
    scheduleViewingDto: ScheduleViewingDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/viewing`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: scheduleViewingDto
    },
      options);
    }
  


export const getApplicationControllerScheduleViewingMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerScheduleViewing>>, TError,{id: string;data: ScheduleViewingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerScheduleViewing>>, TError,{id: string;data: ScheduleViewingDto}, TContext> => {

const mutationKey = ['applicationControllerScheduleViewing'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerScheduleViewing>>, {id: string;data: ScheduleViewingDto}> = (props) => {
          const {id,data} = props ?? {};

          return  applicationControllerScheduleViewing(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerScheduleViewingMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerScheduleViewing>>>
    export type ApplicationControllerScheduleViewingMutationBody = ScheduleViewingDto
    export type ApplicationControllerScheduleViewingMutationError = ErrorType<unknown>

    /**
 * @summary Book or move the viewing. Landlord or a household member.
 */
export const useApplicationControllerScheduleViewing = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerScheduleViewing>>, TError,{id: string;data: ScheduleViewingDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerScheduleViewing>>,
        TError,
        {id: string;data: ScheduleViewingDto},
        TContext
      > => {

      const mutationOptions = getApplicationControllerScheduleViewingMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Accept the next qualified household in the queue. Creates the tenancy and returns its id.
 */
export const applicationControllerApproveApplication = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<ApplicationControllerApproveApplication200>(
      {url: `/application/${id}/approve`, method: 'PATCH'
    },
      options);
    }
  


export const getApplicationControllerApproveApplicationMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerApproveApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerApproveApplication>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerApproveApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerApproveApplication>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerApproveApplication(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerApproveApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerApproveApplication>>>
    
    export type ApplicationControllerApproveApplicationMutationError = ErrorType<void>

    /**
 * @summary Accept the next qualified household in the queue. Creates the tenancy and returns its id.
 */
export const useApplicationControllerApproveApplication = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerApproveApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerApproveApplication>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerApproveApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Make an offer. The household has 15 days to accept; the holding deposit is recorded.
 */
export const applicationControllerOfferApplication = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ApplicationDto>(
      {url: `/application/${id}/offer`, method: 'POST', signal
    },
      options);
    }
  


export const getApplicationControllerOfferApplicationMutationOptions = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerOfferApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerOfferApplication>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerOfferApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerOfferApplication>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerOfferApplication(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerOfferApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerOfferApplication>>>
    
    export type ApplicationControllerOfferApplicationMutationError = ErrorType<void>

    /**
 * @summary Make an offer. The household has 15 days to accept; the holding deposit is recorded.
 */
export const useApplicationControllerOfferApplication = <TError = ErrorType<void>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerOfferApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerOfferApplication>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerOfferApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Accept an open offer. Creates the tenancy and returns its id.
 */
export const applicationControllerAcceptOffer = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/accept-offer`, method: 'PATCH'
    },
      options);
    }
  


export const getApplicationControllerAcceptOfferMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerAcceptOffer>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerAcceptOffer>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerAcceptOffer'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerAcceptOffer>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerAcceptOffer(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerAcceptOfferMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerAcceptOffer>>>
    
    export type ApplicationControllerAcceptOfferMutationError = ErrorType<unknown>

    /**
 * @summary Accept an open offer. Creates the tenancy and returns its id.
 */
export const useApplicationControllerAcceptOffer = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerAcceptOffer>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerAcceptOffer>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerAcceptOfferMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Decline the household, with an optional reason shown to them.
 */
export const applicationControllerRejectApplication = (
    id: string,
    rejectApplicationDto: RejectApplicationDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/reject`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: rejectApplicationDto
    },
      options);
    }
  


export const getApplicationControllerRejectApplicationMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerRejectApplication>>, TError,{id: string;data: RejectApplicationDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerRejectApplication>>, TError,{id: string;data: RejectApplicationDto}, TContext> => {

const mutationKey = ['applicationControllerRejectApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerRejectApplication>>, {id: string;data: RejectApplicationDto}> = (props) => {
          const {id,data} = props ?? {};

          return  applicationControllerRejectApplication(id,data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerRejectApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerRejectApplication>>>
    export type ApplicationControllerRejectApplicationMutationBody = RejectApplicationDto
    export type ApplicationControllerRejectApplicationMutationError = ErrorType<unknown>

    /**
 * @summary Decline the household, with an optional reason shown to them.
 */
export const useApplicationControllerRejectApplication = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerRejectApplication>>, TError,{id: string;data: RejectApplicationDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerRejectApplication>>,
        TError,
        {id: string;data: RejectApplicationDto},
        TContext
      > => {

      const mutationOptions = getApplicationControllerRejectApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const applicationControllerDeleteApplication = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/application/${id}/delete`, method: 'PATCH'
    },
      options);
    }
  


export const getApplicationControllerDeleteApplicationMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerDeleteApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof applicationControllerDeleteApplication>>, TError,{id: string}, TContext> => {

const mutationKey = ['applicationControllerDeleteApplication'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof applicationControllerDeleteApplication>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  applicationControllerDeleteApplication(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ApplicationControllerDeleteApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof applicationControllerDeleteApplication>>>
    
    export type ApplicationControllerDeleteApplicationMutationError = ErrorType<ErrorDto>

    export const useApplicationControllerDeleteApplication = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof applicationControllerDeleteApplication>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof applicationControllerDeleteApplication>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getApplicationControllerDeleteApplicationMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const applicationControllerGetAllForListing = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/application/listing/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getApplicationControllerGetAllForListingQueryKey = (id?: string,) => {
    return [
    `/application/listing/${id}`
    ] as const;
    }

    
export const getApplicationControllerGetAllForListingQueryOptions = <TData = Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApplicationControllerGetAllForListingQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>> = ({ signal }) => applicationControllerGetAllForListing(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApplicationControllerGetAllForListingQueryResult = NonNullable<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>>
export type ApplicationControllerGetAllForListingQueryError = ErrorType<unknown>


export function useApplicationControllerGetAllForListing<TData = Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetAllForListing>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetAllForListing>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetAllForListing<TData = Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetAllForListing>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetAllForListing>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetAllForListing<TData = Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useApplicationControllerGetAllForListing<TData = Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllForListing>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApplicationControllerGetAllForListingQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const applicationControllerGetByConversation = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ApplicationDto>(
      {url: `/application/conversation/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getApplicationControllerGetByConversationQueryKey = (id?: string,) => {
    return [
    `/application/conversation/${id}`
    ] as const;
    }

    
export const getApplicationControllerGetByConversationQueryOptions = <TData = Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApplicationControllerGetByConversationQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof applicationControllerGetByConversation>>> = ({ signal }) => applicationControllerGetByConversation(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApplicationControllerGetByConversationQueryResult = NonNullable<Awaited<ReturnType<typeof applicationControllerGetByConversation>>>
export type ApplicationControllerGetByConversationQueryError = ErrorType<ErrorDto>


export function useApplicationControllerGetByConversation<TData = Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetByConversation>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetByConversation>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetByConversation<TData = Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetByConversation>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetByConversation>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetByConversation<TData = Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useApplicationControllerGetByConversation<TData = Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetByConversation>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApplicationControllerGetByConversationQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const applicationControllerGetAllMyApplications = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ApplicationDto[]>(
      {url: `/application/mine`, method: 'GET', signal
    },
      options);
    }
  



export const getApplicationControllerGetAllMyApplicationsQueryKey = () => {
    return [
    `/application/mine`
    ] as const;
    }

    
export const getApplicationControllerGetAllMyApplicationsQueryOptions = <TData = Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApplicationControllerGetAllMyApplicationsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>> = ({ signal }) => applicationControllerGetAllMyApplications(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApplicationControllerGetAllMyApplicationsQueryResult = NonNullable<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>>
export type ApplicationControllerGetAllMyApplicationsQueryError = ErrorType<ErrorDto>


export function useApplicationControllerGetAllMyApplications<TData = Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetAllMyApplications<TData = Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetAllMyApplications<TData = Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useApplicationControllerGetAllMyApplications<TData = Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetAllMyApplications>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApplicationControllerGetAllMyApplicationsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const applicationControllerGetApplication = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ApplicationDto>(
      {url: `/application/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getApplicationControllerGetApplicationQueryKey = (id?: string,) => {
    return [
    `/application/${id}`
    ] as const;
    }

    
export const getApplicationControllerGetApplicationQueryOptions = <TData = Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getApplicationControllerGetApplicationQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof applicationControllerGetApplication>>> = ({ signal }) => applicationControllerGetApplication(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ApplicationControllerGetApplicationQueryResult = NonNullable<Awaited<ReturnType<typeof applicationControllerGetApplication>>>
export type ApplicationControllerGetApplicationQueryError = ErrorType<ErrorDto>


export function useApplicationControllerGetApplication<TData = Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetApplication>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetApplication>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetApplication<TData = Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof applicationControllerGetApplication>>,
          TError,
          Awaited<ReturnType<typeof applicationControllerGetApplication>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useApplicationControllerGetApplication<TData = Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useApplicationControllerGetApplication<TData = Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof applicationControllerGetApplication>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getApplicationControllerGetApplicationQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




