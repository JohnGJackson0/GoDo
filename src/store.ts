import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Features/Tasks/TasksSlice";
import ListsReducer from "./Features/Lists/ListsSlice";
import AppReducer from "./Features/AppSlice";
import AuthenticationReducer from "./Features/AuthenticationPortal/AuthenticationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  tasks: tasksReducer,
  lists: ListsReducer,
  authentication: AuthenticationReducer,
  app: AppReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
