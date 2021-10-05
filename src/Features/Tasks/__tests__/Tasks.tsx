import React from "react";
import { View } from "react-native";
import "@testing-library/jest-native";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../../store";
import { cleanup, render, fireEvent } from "@testing-library/react-native";
import Tasks from "../Tasks";
import * as redux from "react-redux";
import { withTheme } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { configureFonts } from "react-native-paper";
import { Host } from "react-native-portalize";
import { TasksState } from "../TasksSlice";


describe("tasks", () => {
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  }));

  const State:{
    Tasks: {
      Tasks: [],
      uniqueTaskId: 0,
      selectedCatagory: { name: "All", id: 0, editable: false },
      catagory: [
        { name: "All", id: 0, editable: false },
        { name: "Personal", id: 1, editable: true },
        { name: "Professional", id: 2, editable: true },
      ],
      catagoryCount: 3,
    }
  } 
  

  State.Tasks.Tasks.push({
    name: "ex",
    id: 2,
    checked: false,
    list: { name: "All", id: 0, editable: false },
  });

  const spy = jest.spyOn(redux, "useSelector");
  spy.mockReturnValue({
    state: {
      initialState,
    },
  });

  it.only("renders", () => {
    const MockTask = () => {
      return (
        <Provider store={store}>
          <PaperProvider theme={LightTheme}>
            <Host>
              <Tasks />
            </Host>
          </PaperProvider>
        </Provider>
      );
    };

    console.log(
      "items ",
      useSelector((state: RootState) => state.tasks.tasks)
    );

    const item = useSelector((state: RootState) => state.tasks.tasks);

    console.log(item[0]);

    const { getByTestId, toJSON } = render(<MockTask />);

    getByTestId("tasks");
  });

  afterEach(cleanup);
});
