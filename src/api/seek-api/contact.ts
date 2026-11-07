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
  ContactControllerContact201,
  ContactDto,
  ErrorDto,
  ReportDto
} from './model';

import { customInstance } from '../../utils/custom-axios';
import type { ErrorType } from '../../utils/custom-axios';



type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export const contactControllerContact = (
    contactDto: ContactDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<ContactControllerContact201>(
      {url: `/contact`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: contactDto, signal
    },
      options);
    }
  


export const getContactControllerContactMutationOptions = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contactControllerContact>>, TError,{data: ContactDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contactControllerContact>>, TError,{data: ContactDto}, TContext> => {

const mutationKey = ['contactControllerContact'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contactControllerContact>>, {data: ContactDto}> = (props) => {
          const {data} = props ?? {};

          return  contactControllerContact(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContactControllerContactMutationResult = NonNullable<Awaited<ReturnType<typeof contactControllerContact>>>
    export type ContactControllerContactMutationBody = ContactDto
    export type ContactControllerContactMutationError = ErrorType<ErrorDto>

    export const useContactControllerContact = <TError = ErrorType<ErrorDto>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contactControllerContact>>, TError,{data: ContactDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contactControllerContact>>,
        TError,
        {data: ContactDto},
        TContext
      > => {

      const mutationOptions = getContactControllerContactMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    export const contactControllerReport = (
    reportDto: ReportDto,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/contact/report`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: reportDto, signal
    },
      options);
    }
  


export const getContactControllerReportMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contactControllerReport>>, TError,{data: ReportDto}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof contactControllerReport>>, TError,{data: ReportDto}, TContext> => {

const mutationKey = ['contactControllerReport'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof contactControllerReport>>, {data: ReportDto}> = (props) => {
          const {data} = props ?? {};

          return  contactControllerReport(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type ContactControllerReportMutationResult = NonNullable<Awaited<ReturnType<typeof contactControllerReport>>>
    export type ContactControllerReportMutationBody = ReportDto
    export type ContactControllerReportMutationError = ErrorType<unknown>

    export const useContactControllerReport = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof contactControllerReport>>, TError,{data: ReportDto}, TContext>, request?: SecondParameter<typeof customInstance>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof contactControllerReport>>,
        TError,
        {data: ReportDto},
        TContext
      > => {

      const mutationOptions = getContactControllerReportMutationOptions(options);

      return useMutation(mutationOptions, queryClient);
    }
    