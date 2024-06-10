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
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `oauth/token/grant`,
        method: "POST",
        body: { 
          email: data.username,
          password: data.password,
          otp_code: data.otp,
          token_type: "personal",
        },
      }),
    }),
    getUserTransaction: builder.query({
      query: (token) => ({
        url: 'ewallet/me/transactions?include=user,entity,fees,items&currency_id=2&transaction_type=transfer,deposit',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getCurrencyList: builder.query({
      query: (token) => ({
        url: 'data/currencies',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getCountryList: builder.query({
      query: (token) => ({
        url: 'data/countries',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getRate: builder.query({
      query: (token) => ({
        url: 'ewallet/rates',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyOtpMutation, useGetUserTransactionQuery,useGetCurrencyListQuery,useGetCountryListQuery,useGetRateQuery } = jsonServerApi;
