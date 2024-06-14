import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {  jsonBackOfficeServerApi } from '../services/apiStore';

export const store = configureStore({
  reducer: {
    
    [jsonBackOfficeServerApi.reducerPath]: jsonBackOfficeServerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( jsonBackOfficeServerApi.middleware),
});

setupListeners(store.dispatch);
