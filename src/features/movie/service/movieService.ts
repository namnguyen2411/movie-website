import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { createApi } from '@reduxjs/toolkit/query/react'
import { MovieResponseType } from '../types/movie.type'
import { QueryParamsType } from '../types/queryParams.type'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const result = await axios<unknown>({
        url: baseUrl + url,
        method,
        data: data as unknown,
        params: params as Record<string, unknown>
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL as string }),
  endpoints: (builder) => ({
    getMovieDetail: builder.query<MovieResponseType, string>({
      query: (slug: string) => ({
        url: `/phim/${slug}`,
        method: 'GET'
      })
    }),
    getMoviesByCountry: builder.query<MovieResponseType, { country: string; params?: QueryParamsType }>({
      query: ({ country, params }) => ({
        url: `/v1/api/quoc-gia/${country}`,
        method: 'GET',
        params
      })
    })
  })
})

export const { useGetMovieDetailQuery, useGetMoviesByCountryQuery } = movieApi
