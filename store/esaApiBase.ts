// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

// initialize an empty api service that we'll inject endpoints into later as needed
export const esaApiBase = createApi({
  reducerPath: 'esaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.esa.io/v1`,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Bearer " + process.env.NEXT_PUBLIC_ESA_TOKEN
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
});
