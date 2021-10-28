jest.useFakeTimers();
import "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../store";
// Note: test renderer must be required after react-native.
import CreateTask from "../CreateTask";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import renderer from "react-test-renderer";

const MockTask = () => {
  return (
    <Provider store={store}>
      <CreateTask />
    </Provider>
  );
};

describe("Features/tasks/CreateTask", () => {
  it("renders correctly", () => {
    renderer.create(<MockTask />);
  });
  it("displays the input the user types", () => {
    const { getByPlaceholderText } = render(<MockTask />);

    fireEvent.changeText(getByPlaceholderText("enter a task"), "My new task");
    expect(getByPlaceholderText("enter a task").props.value).toEqual(
      "My new task"
    );
  });

  it("uses the onClose function prop when pressing enter", () => {
    const onClose = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <CreateTask onClose={onClose} />
      </Provider>
    );
    fireEvent.changeText(getByPlaceholderText("enter a task"), "My new task");
    fireEvent.press(getByTestId("enter"));

    expect(onClose).toHaveBeenCalled();
  });
  it("the display list is visble when it is pressed", () => {
    const { getByTestId } = render(<MockTask />);

    fireEvent.press(getByTestId("displayListSelectorButton"));

    expect(getByTestId("showLists"));
  });
  it("the display list is NOT visble when it is pressed", () => {
    const { queryByTestId } = render(<MockTask />);
    //queryby does not throw error right away,
    //so it can be tested against not having a document
    expect(queryByTestId("showLists")).toBeNull;
  });
  it("displays the current list selected", () => {
    const { getByTestId, getByText } = render(<MockTask />);
    fireEvent.press(getByTestId("displayListSelectorButton"));
    fireEvent.press(getByText("Professional"));
    expect(getByText("Professional"));
    fireEvent.press(getByTestId("displayListSelectorButton"));
    fireEvent.press(getByText("Personal"));
    expect(getByText("Personal"));
  });
  it("the input displays nothing after enter", () => {
    const onClose = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <CreateTask onClose={onClose} />
      </Provider>
    );
    fireEvent.changeText(getByPlaceholderText("enter a task"), "My new task");
    expect(getByPlaceholderText("enter a task").props.value).toEqual(
      "My new task"
    );
    fireEvent.press(getByTestId("enter"));

    expect(getByPlaceholderText("enter a task").props.value).toEqual("");
  });

});
