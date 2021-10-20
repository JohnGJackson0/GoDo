import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./src/Features/Tasks/TasksSlice";
import AppReducer from "./src/Features/AppSlice";
import { Provider } from "react-redux";
import { render as rntlRender } from "@testing-library/react-native";

function render(
  ui: any,
  {
    //@ts-ignore
    preloadedState,
    store = configureStore({
      reducer: { tasks: tasksReducer, app: AppReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rntlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react-native";

export { render };
