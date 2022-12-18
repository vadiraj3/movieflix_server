import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/kfi-api/v1' }),
	endpoints: (builder) => ({
		//get authnetication Info
		getAuth: builder.query({
			query: () => `getAuth`,
		}),
	}),
});

export const { useGetAuthQuery } = authApi;
