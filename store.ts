import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./services/pokemon";
import { emptySplitApi } from "./store/emptyApi";
import { createWrapper, Context } from "next-redux-wrapper";
import { esaApi } from "./store/esaApi";

const makeStore = (_: Context) => {
  const store = configureStore({
    reducer: {
      [esaApi.reducerPath]: esaApi.reducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(esaApi.middleware)
        .concat(pokemonApi.middleware)
        .concat(emptySplitApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(makeStore, {
  serializeState: (state) =>
    typeof window === "undefined"
      ? JSON.stringify(state)
      : state,
  deserializeState: (state) =>
    typeof state === "string" ? JSON.parse(state) : state,
  // debug: true,
});
