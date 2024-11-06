import { configureStore } from "@reduxjs/toolkit";
import sharedReducer from "./slices/sharedSlice";

const store = configureStore({
	reducer: {
		shared: sharedReducer
	}
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
