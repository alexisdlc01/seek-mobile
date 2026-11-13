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
  AddDocumentDto,
  CreateUserDto,
  DeleteAccountResultDto,
  DocumentShareDto,
  DocumentTypesDto,
  ErrorDto,
  InviteTeamMemberDto,
  PassportDto,
  PendingDocumentDto,
  RequestReferenceDto,
  SetProfilePicDto,
  SetUsernameDto,
  StudentEmailCodeDto,
  StudentEmailDto,
  StudentVerificationResultDto,
  TeamInviteDto,
  TeamMemberDto,
  UpdateUserProfileDto,
  UserDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Send a 6-digit code to your university email (valid 15 minutes) to get the verified student badge.
 */
export const usersControllerSendStudentEmailCode = (
    studentEmailDto: StudentEmailDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/users/me/student-email`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: studentEmailDto, signal
    },
      options);
    }
  


export const getUsersControllerSendStudentEmailCodeMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerSendStudentEmailCode>>, TError,{data: StudentEmailDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerSendStudentEmailCode>>, TError,{data: StudentEmailDto}, TContext> => {

const mutationKey = ['usersControllerSendStudentEmailCode'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerSendStudentEmailCode>>, {data: StudentEmailDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerSendStudentEmailCode(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerSendStudentEmailCodeMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerSendStudentEmailCode>>>
    export type UsersControllerSendStudentEmailCodeMutationBody = StudentEmailDto
    export type UsersControllerSendStudentEmailCodeMutationError = ErrorType<ErrorDto>

    /**
 * @summary Send a 6-digit code to your university email (valid 15 minutes) to get the verified student badge.
 */
export const useUsersControllerSendStudentEmailCode = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerSendStudentEmailCode>>, TError,{data: StudentEmailDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerSendStudentEmailCode>>,
        TError,
        {data: StudentEmailDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerSendStudentEmailCodeMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Check the code. 5 wrong tries and you need a new code.
 */
export const usersControllerVerifyStudentEmail = (
    studentEmailCodeDto: StudentEmailCodeDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<StudentVerificationResultDto>(
      {url: `/users/me/student-email/verify`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: studentEmailCodeDto, signal
    },
      options);
    }
  


export const getUsersControllerVerifyStudentEmailMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerVerifyStudentEmail>>, TError,{data: StudentEmailCodeDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerVerifyStudentEmail>>, TError,{data: StudentEmailCodeDto}, TContext> => {

const mutationKey = ['usersControllerVerifyStudentEmail'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerVerifyStudentEmail>>, {data: StudentEmailCodeDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerVerifyStudentEmail(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerVerifyStudentEmailMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerVerifyStudentEmail>>>
    export type UsersControllerVerifyStudentEmailMutationBody = StudentEmailCodeDto
    export type UsersControllerVerifyStudentEmailMutationError = ErrorType<ErrorDto>

    /**
 * @summary Check the code. 5 wrong tries and you need a new code.
 */
export const useUsersControllerVerifyStudentEmail = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerVerifyStudentEmail>>, TError,{data: StudentEmailCodeDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerVerifyStudentEmail>>,
        TError,
        {data: StudentEmailCodeDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerVerifyStudentEmailMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Delete your account (soft delete: you are signed out everywhere and cannot sign in again).
 */
export const usersControllerDeleteMe = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<DeleteAccountResultDto>(
      {url: `/users/me`, method: 'DELETE'
    },
      options);
    }
  


export const getUsersControllerDeleteMeMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerDeleteMe>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerDeleteMe>>, TError,void, TContext> => {

const mutationKey = ['usersControllerDeleteMe'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerDeleteMe>>, void> = () => {
          

          return  usersControllerDeleteMe(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerDeleteMeMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerDeleteMe>>>
    
    export type UsersControllerDeleteMeMutationError = ErrorType<ErrorDto>

    /**
 * @summary Delete your account (soft delete: you are signed out everywhere and cannot sign in again).
 */
export const useUsersControllerDeleteMe = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerDeleteMe>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerDeleteMe>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getUsersControllerDeleteMeMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const usersControllerUpdateCurrentUser = (
    updateUserProfileDto: UpdateUserProfileDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<UserDto>(
      {url: `/users/me`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateUserProfileDto
    },
      options);
    }
  


export const getUsersControllerUpdateCurrentUserMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerUpdateCurrentUser>>, TError,{data: UpdateUserProfileDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerUpdateCurrentUser>>, TError,{data: UpdateUserProfileDto}, TContext> => {

const mutationKey = ['usersControllerUpdateCurrentUser'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerUpdateCurrentUser>>, {data: UpdateUserProfileDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerUpdateCurrentUser(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerUpdateCurrentUserMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerUpdateCurrentUser>>>
    export type UsersControllerUpdateCurrentUserMutationBody = UpdateUserProfileDto
    export type UsersControllerUpdateCurrentUserMutationError = ErrorType<ErrorDto>

    export const useUsersControllerUpdateCurrentUser = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerUpdateCurrentUser>>, TError,{data: UpdateUserProfileDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerUpdateCurrentUser>>,
        TError,
        {data: UpdateUserProfileDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerUpdateCurrentUserMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary People you invited to help run your account. They never see payouts.
 */
export const usersControllerListTeam = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TeamMemberDto[]>(
      {url: `/users/me/team`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerListTeamQueryKey = () => {
    return [
    `/users/me/team`
    ] as const;
    }

    
export const getUsersControllerListTeamQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerListTeam>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerListTeamQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerListTeam>>> = ({ signal }) => usersControllerListTeam(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeam>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerListTeamQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerListTeam>>>
export type UsersControllerListTeamQueryError = ErrorType<unknown>


export function useUsersControllerListTeam<TData = Awaited<ReturnType<typeof usersControllerListTeam>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeam>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListTeam>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListTeam>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListTeam<TData = Awaited<ReturnType<typeof usersControllerListTeam>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeam>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListTeam>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListTeam>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListTeam<TData = Awaited<ReturnType<typeof usersControllerListTeam>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary People you invited to help run your account. They never see payouts.
 */

export function useUsersControllerListTeam<TData = Awaited<ReturnType<typeof usersControllerListTeam>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeam>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerListTeamQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Invite someone by email with the scopes they may help with (e.g. VIEWINGS_INBOX). No payouts scope exists.
 */
export const usersControllerInviteTeamMember = (
    inviteTeamMemberDto: InviteTeamMemberDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TeamMemberDto>(
      {url: `/users/me/team/invite`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: inviteTeamMemberDto, signal
    },
      options);
    }
  


export const getUsersControllerInviteTeamMemberMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerInviteTeamMember>>, TError,{data: InviteTeamMemberDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerInviteTeamMember>>, TError,{data: InviteTeamMemberDto}, TContext> => {

const mutationKey = ['usersControllerInviteTeamMember'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerInviteTeamMember>>, {data: InviteTeamMemberDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerInviteTeamMember(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerInviteTeamMemberMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerInviteTeamMember>>>
    export type UsersControllerInviteTeamMemberMutationBody = InviteTeamMemberDto
    export type UsersControllerInviteTeamMemberMutationError = ErrorType<ErrorDto>

    /**
 * @summary Invite someone by email with the scopes they may help with (e.g. VIEWINGS_INBOX). No payouts scope exists.
 */
export const useUsersControllerInviteTeamMember = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerInviteTeamMember>>, TError,{data: InviteTeamMemberDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerInviteTeamMember>>,
        TError,
        {data: InviteTeamMemberDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerInviteTeamMemberMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Team invites waiting for you (sent to your verified email). Nothing applies until you accept.
 */
export const usersControllerListTeamInvites = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<TeamInviteDto[]>(
      {url: `/users/me/team-invites`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerListTeamInvitesQueryKey = () => {
    return [
    `/users/me/team-invites`
    ] as const;
    }

    
export const getUsersControllerListTeamInvitesQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerListTeamInvitesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerListTeamInvites>>> = ({ signal }) => usersControllerListTeamInvites(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerListTeamInvitesQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerListTeamInvites>>>
export type UsersControllerListTeamInvitesQueryError = ErrorType<unknown>


export function useUsersControllerListTeamInvites<TData = Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListTeamInvites>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListTeamInvites>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListTeamInvites<TData = Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListTeamInvites>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListTeamInvites>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListTeamInvites<TData = Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Team invites waiting for you (sent to your verified email). Nothing applies until you accept.
 */

export function useUsersControllerListTeamInvites<TData = Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListTeamInvites>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerListTeamInvitesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Join the team of the landlord who invited you. You then act for them within the invited scopes.
 */
export const usersControllerAcceptTeamInvite = (
    ownerId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/users/me/team-invites/${ownerId}/accept`, method: 'POST', signal
    },
      options);
    }
  


export const getUsersControllerAcceptTeamInviteMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerAcceptTeamInvite>>, TError,{ownerId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerAcceptTeamInvite>>, TError,{ownerId: string}, TContext> => {

const mutationKey = ['usersControllerAcceptTeamInvite'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerAcceptTeamInvite>>, {ownerId: string}> = (props) => {
          const {ownerId} = props ?? {};

          return  usersControllerAcceptTeamInvite(ownerId,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerAcceptTeamInviteMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerAcceptTeamInvite>>>
    
    export type UsersControllerAcceptTeamInviteMutationError = ErrorType<ErrorDto>

    /**
 * @summary Join the team of the landlord who invited you. You then act for them within the invited scopes.
 */
export const useUsersControllerAcceptTeamInvite = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerAcceptTeamInvite>>, TError,{ownerId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerAcceptTeamInvite>>,
        TError,
        {ownerId: string},
        TContext
      > => {

      const mutationOptions = getUsersControllerAcceptTeamInviteMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Leave the team you joined. You act as yourself again.
 */
export const usersControllerLeaveTeam = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/users/me/team/leave`, method: 'POST', signal
    },
      options);
    }
  


export const getUsersControllerLeaveTeamMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerLeaveTeam>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerLeaveTeam>>, TError,void, TContext> => {

const mutationKey = ['usersControllerLeaveTeam'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerLeaveTeam>>, void> = () => {
          

          return  usersControllerLeaveTeam(requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerLeaveTeamMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerLeaveTeam>>>
    
    export type UsersControllerLeaveTeamMutationError = ErrorType<ErrorDto>

    /**
 * @summary Leave the team you joined. You act as yourself again.
 */
export const useUsersControllerLeaveTeam = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerLeaveTeam>>, TError,void, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerLeaveTeam>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getUsersControllerLeaveTeamMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Remove someone from your team.
 */
export const usersControllerRemoveTeamMember = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<unknown>(
      {url: `/users/me/team/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getUsersControllerRemoveTeamMemberMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemoveTeamMember>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemoveTeamMember>>, TError,{id: string}, TContext> => {

const mutationKey = ['usersControllerRemoveTeamMember'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerRemoveTeamMember>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  usersControllerRemoveTeamMember(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerRemoveTeamMemberMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerRemoveTeamMember>>>
    
    export type UsersControllerRemoveTeamMemberMutationError = ErrorType<ErrorDto>

    /**
 * @summary Remove someone from your team.
 */
export const useUsersControllerRemoveTeamMember = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRemoveTeamMember>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerRemoveTeamMember>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getUsersControllerRemoveTeamMemberMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const usersControllerDocumentTypes = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<DocumentTypesDto>(
      {url: `/users/document-types`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerDocumentTypesQueryKey = () => {
    return [
    `/users/document-types`
    ] as const;
    }

    
export const getUsersControllerDocumentTypesQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerDocumentTypesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerDocumentTypes>>> = ({ signal }) => usersControllerDocumentTypes(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerDocumentTypesQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerDocumentTypes>>>
export type UsersControllerDocumentTypesQueryError = ErrorType<ErrorDto>


export function useUsersControllerDocumentTypes<TData = Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerDocumentTypes>>,
          TError,
          Awaited<ReturnType<typeof usersControllerDocumentTypes>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerDocumentTypes<TData = Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerDocumentTypes>>,
          TError,
          Awaited<ReturnType<typeof usersControllerDocumentTypes>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerDocumentTypes<TData = Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUsersControllerDocumentTypes<TData = Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerDocumentTypes>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerDocumentTypesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const usersControllerCreate = (
    createUserDto: CreateUserDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<UserDto>(
      {url: `/users`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createUserDto, signal
    },
      options);
    }
  


export const getUsersControllerCreateMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: CreateUserDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: CreateUserDto}, TContext> => {

const mutationKey = ['usersControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerCreate>>, {data: CreateUserDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerCreate(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerCreate>>>
    export type UsersControllerCreateMutationBody = CreateUserDto
    export type UsersControllerCreateMutationError = ErrorType<ErrorDto>

    export const useUsersControllerCreate = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerCreate>>, TError,{data: CreateUserDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerCreate>>,
        TError,
        {data: CreateUserDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerCreateMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const usersControllerGetAllUsers = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<UserDto[]>(
      {url: `/users`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerGetAllUsersQueryKey = () => {
    return [
    `/users`
    ] as const;
    }

    
export const getUsersControllerGetAllUsersQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerGetAllUsersQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerGetAllUsers>>> = ({ signal }) => usersControllerGetAllUsers(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerGetAllUsersQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerGetAllUsers>>>
export type UsersControllerGetAllUsersQueryError = ErrorType<ErrorDto>


export function useUsersControllerGetAllUsers<TData = Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetAllUsers>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetAllUsers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetAllUsers<TData = Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetAllUsers>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetAllUsers>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetAllUsers<TData = Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUsersControllerGetAllUsers<TData = Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetAllUsers>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerGetAllUsersQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const usersControllerSetProfilePic = (
    setProfilePicDto: SetProfilePicDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<UserDto>(
      {url: `/users/setProfilePic`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: setProfilePicDto
    },
      options);
    }
  


export const getUsersControllerSetProfilePicMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerSetProfilePic>>, TError,{data: SetProfilePicDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerSetProfilePic>>, TError,{data: SetProfilePicDto}, TContext> => {

const mutationKey = ['usersControllerSetProfilePic'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerSetProfilePic>>, {data: SetProfilePicDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerSetProfilePic(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerSetProfilePicMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerSetProfilePic>>>
    export type UsersControllerSetProfilePicMutationBody = SetProfilePicDto
    export type UsersControllerSetProfilePicMutationError = ErrorType<ErrorDto>

    export const useUsersControllerSetProfilePic = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerSetProfilePic>>, TError,{data: SetProfilePicDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerSetProfilePic>>,
        TError,
        {data: SetProfilePicDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerSetProfilePicMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const usersControllerSetUsername = (
    setUsernameDto: SetUsernameDto,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<UserDto>(
      {url: `/users/setUsername`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: setUsernameDto
    },
      options);
    }
  


export const getUsersControllerSetUsernameMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerSetUsername>>, TError,{data: SetUsernameDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerSetUsername>>, TError,{data: SetUsernameDto}, TContext> => {

const mutationKey = ['usersControllerSetUsername'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerSetUsername>>, {data: SetUsernameDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerSetUsername(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerSetUsernameMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerSetUsername>>>
    export type UsersControllerSetUsernameMutationBody = SetUsernameDto
    export type UsersControllerSetUsernameMutationError = ErrorType<ErrorDto>

    export const useUsersControllerSetUsername = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerSetUsername>>, TError,{data: SetUsernameDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerSetUsername>>,
        TError,
        {data: SetUsernameDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerSetUsernameMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Invite a UK guarantor or ask a previous landlord, letting agent or academic for a reference. Seek emails them (replies go to you; a connected inbox files a reference into your passport) and the passport row reads PENDING with source "request" until a document arrives. Asking again for the same type replaces the request.
 */
export const usersControllerRequestReference = (
    requestReferenceDto: RequestReferenceDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PassportDto>(
      {url: `/users/me/passport/references`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: requestReferenceDto, signal
    },
      options);
    }
  


export const getUsersControllerRequestReferenceMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRequestReference>>, TError,{data: RequestReferenceDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerRequestReference>>, TError,{data: RequestReferenceDto}, TContext> => {

const mutationKey = ['usersControllerRequestReference'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerRequestReference>>, {data: RequestReferenceDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerRequestReference(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerRequestReferenceMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerRequestReference>>>
    export type UsersControllerRequestReferenceMutationBody = RequestReferenceDto
    export type UsersControllerRequestReferenceMutationError = ErrorType<ErrorDto>

    /**
 * @summary Invite a UK guarantor or ask a previous landlord, letting agent or academic for a reference. Seek emails them (replies go to you; a connected inbox files a reference into your passport) and the passport row reads PENDING with source "request" until a document arrives. Asking again for the same type replaces the request.
 */
export const useUsersControllerRequestReference = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRequestReference>>, TError,{data: RequestReferenceDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerRequestReference>>,
        TError,
        {data: RequestReferenceDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerRequestReferenceMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary The student's Seek Passport: every document, its status and readiness.
 */
export const usersControllerGetPassport = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PassportDto>(
      {url: `/users/me/passport`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerGetPassportQueryKey = () => {
    return [
    `/users/me/passport`
    ] as const;
    }

    
export const getUsersControllerGetPassportQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerGetPassport>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetPassport>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerGetPassportQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerGetPassport>>> = ({ signal }) => usersControllerGetPassport(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetPassport>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerGetPassportQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerGetPassport>>>
export type UsersControllerGetPassportQueryError = ErrorType<ErrorDto>


export function useUsersControllerGetPassport<TData = Awaited<ReturnType<typeof usersControllerGetPassport>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetPassport>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetPassport>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetPassport>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetPassport<TData = Awaited<ReturnType<typeof usersControllerGetPassport>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetPassport>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetPassport>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetPassport>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetPassport<TData = Awaited<ReturnType<typeof usersControllerGetPassport>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetPassport>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary The student's Seek Passport: every document, its status and readiness.
 */

export function useUsersControllerGetPassport<TData = Awaited<ReturnType<typeof usersControllerGetPassport>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetPassport>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerGetPassportQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Landlords who can currently (or could previously) open the student's documents.
 */
export const usersControllerListShares = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<DocumentShareDto[]>(
      {url: `/users/me/shares`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerListSharesQueryKey = () => {
    return [
    `/users/me/shares`
    ] as const;
    }

    
export const getUsersControllerListSharesQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerListShares>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListShares>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerListSharesQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerListShares>>> = ({ signal }) => usersControllerListShares(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerListShares>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerListSharesQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerListShares>>>
export type UsersControllerListSharesQueryError = ErrorType<ErrorDto>


export function useUsersControllerListShares<TData = Awaited<ReturnType<typeof usersControllerListShares>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListShares>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListShares>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListShares>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListShares<TData = Awaited<ReturnType<typeof usersControllerListShares>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListShares>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListShares>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListShares>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListShares<TData = Awaited<ReturnType<typeof usersControllerListShares>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListShares>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Landlords who can currently (or could previously) open the student's documents.
 */

export function useUsersControllerListShares<TData = Awaited<ReturnType<typeof usersControllerListShares>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListShares>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerListSharesQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




/**
 * @summary Stop a landlord from opening the student's documents.
 */
export const usersControllerRevokeShare = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/users/me/shares/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getUsersControllerRevokeShareMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRevokeShare>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerRevokeShare>>, TError,{id: string}, TContext> => {

const mutationKey = ['usersControllerRevokeShare'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerRevokeShare>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  usersControllerRevokeShare(id,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerRevokeShareMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerRevokeShare>>>
    
    export type UsersControllerRevokeShareMutationError = ErrorType<ErrorDto>

    /**
 * @summary Stop a landlord from opening the student's documents.
 */
export const useUsersControllerRevokeShare = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerRevokeShare>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerRevokeShare>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getUsersControllerRevokeShareMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Seek Passport uploads not yet marked as provided, oldest first (Seek staff, monitoring only).
 */
export const usersControllerListPendingDocuments = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PendingDocumentDto[]>(
      {url: `/users/documents/pending`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerListPendingDocumentsQueryKey = () => {
    return [
    `/users/documents/pending`
    ] as const;
    }

    
export const getUsersControllerListPendingDocumentsQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError = ErrorType<ErrorDto>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerListPendingDocumentsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>> = ({ signal }) => usersControllerListPendingDocuments(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerListPendingDocumentsQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>>
export type UsersControllerListPendingDocumentsQueryError = ErrorType<ErrorDto>


export function useUsersControllerListPendingDocuments<TData = Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError = ErrorType<ErrorDto>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListPendingDocuments>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListPendingDocuments>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListPendingDocuments<TData = Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerListPendingDocuments>>,
          TError,
          Awaited<ReturnType<typeof usersControllerListPendingDocuments>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerListPendingDocuments<TData = Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Seek Passport uploads not yet marked as provided, oldest first (Seek staff, monitoring only).
 */

export function useUsersControllerListPendingDocuments<TData = Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError = ErrorType<ErrorDto>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerListPendingDocuments>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerListPendingDocumentsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const usersControllerAddDocument = (
    addDocumentDto: AddDocumentDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/users/addDocument`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: addDocumentDto, signal
    },
      options);
    }
  


export const getUsersControllerAddDocumentMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerAddDocument>>, TError,{data: AddDocumentDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof usersControllerAddDocument>>, TError,{data: AddDocumentDto}, TContext> => {

const mutationKey = ['usersControllerAddDocument'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersControllerAddDocument>>, {data: AddDocumentDto}> = (props) => {
          const {data} = props ?? {};

          return  usersControllerAddDocument(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UsersControllerAddDocumentMutationResult = NonNullable<Awaited<ReturnType<typeof usersControllerAddDocument>>>
    export type UsersControllerAddDocumentMutationBody = AddDocumentDto
    export type UsersControllerAddDocumentMutationError = ErrorType<ErrorDto>

    export const useUsersControllerAddDocument = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersControllerAddDocument>>, TError,{data: AddDocumentDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof usersControllerAddDocument>>,
        TError,
        {data: AddDocumentDto},
        TContext
      > => {

      const mutationOptions = getUsersControllerAddDocumentMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const usersControllerGetUser = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<UserDto>(
      {url: `/users/${id}`, method: 'GET', signal
    },
      options);
    }
  



export const getUsersControllerGetUserQueryKey = (id?: string,) => {
    return [
    `/users/${id}`
    ] as const;
    }

    
export const getUsersControllerGetUserQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerGetUserQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerGetUser>>> = ({ signal }) => usersControllerGetUser(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerGetUserQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerGetUser>>>
export type UsersControllerGetUserQueryError = ErrorType<ErrorDto>


export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetUser>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetUser>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerGetUserQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




