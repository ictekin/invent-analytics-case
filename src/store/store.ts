import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import streamsReducer from "./slices/streamsSlice";
import streamDetailReducer from "./slices/streamDetailSlice";
import seriesDetailReducer from "./slices/seriesDetailSlice";

export const store = configureStore({
  reducer: {
    streams: streamsReducer,
    streamDetail: streamDetailReducer,
    seriesDetail: seriesDetailReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
