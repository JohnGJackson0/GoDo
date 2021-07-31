import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./Features/Tasks/TasksSlice";
import ListsReducer from "./Features/Lists/ListsSlice";
import AppReducer from "./Features/AppSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: ListsReducer,
    app: AppReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
