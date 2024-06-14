import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const jsonBackOfficeServerApi = createApi({
  reducerPath: "jsonBackOfficeServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BACKOFFICE }),
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
        url: 'transactions?user_id=1&include=items,entity,user',
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

    createRemittance: builder.mutation({
      query: ({data,token}) => ({
        url: `remittance/create`,
        method: "POST",
        body: data,
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

    getCurrencyList: builder.query({
      query: (token) => ({
        url: `/departments/${import.meta.env.VITE_DEPARTMENT_ID}/currencies/rates?include=currency`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getUserList: builder.query({
      query: ({token,search}) => ({
        url: `crm/entities?q=${search}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    fileUpload: builder.mutation({
      query: ({data,token}) => ({
        url: `files`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getTransactionDetail: builder.query({
      query: ({token,transactionId}) => ({
        url: `transactions/${transactionId}?include=items,department,user,entity,fees,files,flows`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});


 export const {
  useGetUserInfoQuery,
  useGetUserTransactionQuery,
  useCreateRemittanceMutation,
  useGetCountryListQuery,
  useGetCurrencyListQuery,
  useGetUserListQuery,
  useFileUploadMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useGetTransactionDetailQuery
 } = jsonBackOfficeServerApi