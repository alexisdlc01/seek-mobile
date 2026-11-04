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
  DocumentTypesDto,
  ErrorDto,
  SetProfilePicDto,
  SetUsernameDto,
  UpdateUserProfileDto,
  UserDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



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
  


export const getUsersControllerSetProfilePicMutationOptions = <TError = ErrorType<ErrorDto | ErrorDto | ErrorDto>,
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
    export type UsersControllerSetProfilePicMutationError = ErrorType<ErrorDto | ErrorDto | ErrorDto>

    export const useUsersControllerSetProfilePic = <TError = ErrorType<ErrorDto | ErrorDto | ErrorDto>,
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
  return usersControllerUpdateCurrentUser(data, requestOptions);
}

return { mutationFn, ...mutationOptions };
}

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
  


export const getUsersControllerSetUsernameMutationOptions = <TError = ErrorType<ErrorDto | ErrorDto | ErrorDto>,
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
    export type UsersControllerSetUsernameMutationError = ErrorType<ErrorDto | ErrorDto | ErrorDto>

    export const useUsersControllerSetUsername = <TError = ErrorType<ErrorDto | ErrorDto | ErrorDto>,
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

    
export const getUsersControllerGetUserQueryOptions = <TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto | ErrorDto>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUsersControllerGetUserQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof usersControllerGetUser>>> = ({ signal }) => usersControllerGetUser(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UsersControllerGetUserQueryResult = NonNullable<Awaited<ReturnType<typeof usersControllerGetUser>>>
export type UsersControllerGetUserQueryError = ErrorType<ErrorDto | ErrorDto>


export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto | ErrorDto>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetUser>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto | ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof usersControllerGetUser>>,
          TError,
          Awaited<ReturnType<typeof usersControllerGetUser>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto | ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUsersControllerGetUser<TData = Awaited<ReturnType<typeof usersControllerGetUser>>, TError = ErrorType<ErrorDto | ErrorDto>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof usersControllerGetUser>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUsersControllerGetUserQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}


