import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { jsonServerApi, jsonBackOfficeServerApi } from '../services/apiStore';

export const store = configureStore({
  reducer: {
    [jsonServerApi.reducerPath]: jsonServerApi.reducer,
    [jsonBackOfficeServerApi.reducerPath]: jsonBackOfficeServerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonServerApi.middleware, jsonBackOfficeServerApi.middleware),
});

setupListeners(store.dispatch);
