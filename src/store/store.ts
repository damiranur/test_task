import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice"



export const store = configureStore({
    reducer: {
      user: userReducer,
      post: postReducer
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
    ],
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;