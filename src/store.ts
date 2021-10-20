import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import tasksReducer from "./Features/Tasks/TasksSlice";
import AppReducer from "./Features/AppSlice";
import AuthenticationReducer from "./Features/AuthenticationPortal/AuthenticationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  tasks: tasksReducer,
  authentication: AuthenticationReducer,
  app: AppReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => customizedMiddleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
