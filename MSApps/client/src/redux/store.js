import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "../slice/photoSlice";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
});
