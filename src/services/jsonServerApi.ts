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
        url: '/departments/1/currencies/rates?include=currency',
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
    getTransactionDetail: builder.query({
      query: ({token,transactionId}) => ({
        url: `ewallet/me/transactions/${transactionId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserList: builder.query({
      query: ({token}) => ({
        url: `users`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserInfo: builder.query({
      query: (token) => ({
        url: `me`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const jsonBackOfficeServerApi = createApi({
  reducerPath: "jsonBackOfficeServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BACKOFFICE }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (token) => ({
        url: `me`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      
    }),
    createRemittance: builder.mutation({
      query: ({data,token}) => ({
        url: `remittance/create`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    })
    
  }),
});

export const { useLoginMutation, useVerifyOtpMutation, useGetUserTransactionQuery,useGetCurrencyListQuery,useGetCountryListQuery,useGetRateQuery,useGetTransactionDetailQuery,
  useGetUserListQuery
 } = jsonServerApi;

 export const {useGetUserInfoQuery,useCreateRemittanceMutation} = jsonBackOfficeServerApi