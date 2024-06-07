import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `oauth/otp`,
        method: "POST",
        body: { email: data.username, password: data.password },
      }),
    }),
  }),
});

export const { useLoginMutation } = jsonServerApi;
