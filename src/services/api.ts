import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IAllResponse, IPeopleResponse } from './types';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchPeople: builder.query<
      IAllResponse,
      { searchText: string; page: number }
    >({
      query: ({ searchText, page }) => ({
        url: 'people/',
        params: { search: searchText, page },
      }),
    }),
    fetchPerson: builder.query<IPeopleResponse, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useFetchPeopleQuery, useFetchPersonQuery } = peopleApi;
export default peopleApi;
