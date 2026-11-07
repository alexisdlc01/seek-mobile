/**
 * import { AxiosError, AxiosResponse } from 'axios';
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryClient,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import type {
  AdviceRequestDto,
  AdviceResponseDto,
  ErrorDto,
  SearchChatDto,
  SearchChatResponseDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Describe the home you want in words; returns the filters understood and matching listings.
 */
export const aiControllerSearchChat = (
    searchChatDto: SearchChatDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<SearchChatResponseDto>(
      {url: `/ai/search-chat`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: searchChatDto, signal
    },
      options);
    }
  


export const getAiControllerSearchChatMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof aiControllerSearchChat>>, TError,{data: SearchChatDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof aiControllerSearchChat>>, TError,{data: SearchChatDto}, TContext> => {

const mutationKey = ['aiControllerSearchChat'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof aiControllerSearchChat>>, {data: SearchChatDto}> = (props) => {
          const {data} = props ?? {};

          return  aiControllerSearchChat(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AiControllerSearchChatMutationResult = NonNullable<Awaited<ReturnType<typeof aiControllerSearchChat>>>
    export type AiControllerSearchChatMutationBody = SearchChatDto
    export type AiControllerSearchChatMutationError = ErrorType<ErrorDto>

    /**
 * @summary Describe the home you want in words; returns the filters understood and matching listings.
 */
export const useAiControllerSearchChat = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof aiControllerSearchChat>>, TError,{data: SearchChatDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof aiControllerSearchChat>>,
        TError,
        {data: SearchChatDto},
        TContext
      > => {

      const mutationOptions = getAiControllerSearchChatMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    /**
 * @summary Short guidance on a tenancy topic, based on your tenancy, bills, payments and inbox.
 */
export const aiControllerAdvice = (
    adviceRequestDto: AdviceRequestDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<AdviceResponseDto>(
      {url: `/ai/advice`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: adviceRequestDto, signal
    },
      options);
    }
  


export const getAiControllerAdviceMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof aiControllerAdvice>>, TError,{data: AdviceRequestDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof aiControllerAdvice>>, TError,{data: AdviceRequestDto}, TContext> => {

const mutationKey = ['aiControllerAdvice'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof aiControllerAdvice>>, {data: AdviceRequestDto}> = (props) => {
          const {data} = props ?? {};

          return  aiControllerAdvice(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AiControllerAdviceMutationResult = NonNullable<Awaited<ReturnType<typeof aiControllerAdvice>>>
    export type AiControllerAdviceMutationBody = AdviceRequestDto
    export type AiControllerAdviceMutationError = ErrorType<ErrorDto>

    /**
 * @summary Short guidance on a tenancy topic, based on your tenancy, bills, payments and inbox.
 */
export const useAiControllerAdvice = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof aiControllerAdvice>>, TError,{data: AdviceRequestDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof aiControllerAdvice>>,
        TError,
        {data: AdviceRequestDto},
        TContext
      > => {

      const mutationOptions = getAiControllerAdviceMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    