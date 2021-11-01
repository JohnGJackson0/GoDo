jest.useFakeTimers();
import "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../store";
// Note: test renderer must be required after react-native.
import EditTask from "../EditTask";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import renderer from "react-test-renderer";

const MockTask = () => {
  const fakeTask = {
    name: "The name",
    list: {
      name: "all",
      id: 1,
      editable: false,
    },
  };

  return (
    <Provider store={store}>
      <EditTask task={fakeTask} />
    </Provider>
  );
};

describe("Features/Tasks/EditTask", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders correctly", () => {
    renderer.create(<MockTask />);
  });
  it("displays the name it was passed", () => {
    const fakeTaskTwo = {
      name: "The name",
      list: {
        name: "all",
        id: 1,
        editable: false,
      },
    };
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <EditTask task={fakeTaskTwo} />
      </Provider>
    );

    expect(getByPlaceholderText("edit a task").props.value).toEqual("The name");
  });
  it("accepts what the user types", () => {
    const fakeTaskTwo = {
      name: "The name",
      list: {
        name: "all",
        id: 1,
        editable: false,
      },
    };

    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <EditTask task={fakeTaskTwo} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("edit a task"), "new name");
    expect(getByPlaceholderText("edit a task").props.value).not.toEqual(
      "The name"
    );

    expect(getByPlaceholderText("edit a task").props.value).toEqual("new name");
  });

  it("when pressing enter the list name is cleared", () => {
    const fakeTaskTwo = {
      name: "The name",
      list: {
        name: "all",
        id: 1,
        editable: false,
      },
    };

    const onClose = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <EditTask task={fakeTaskTwo} onClose={onClose} />
      </Provider>
    );

    expect(getByPlaceholderText("edit a task").props.value).toEqual("The name");

    fireEvent.press(getByTestId("enter"));

    expect(getByPlaceholderText("edit a task").props.value).toEqual("");
  });
  it("calls the props.onClose when the enter button is pressed", () => {
    const fakeTaskTwo = {
      name: "The name",
      list: {
        name: "all",
        id: 1,
        editable: false,
      },
    };

    const onClose = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <EditTask task={fakeTaskTwo} onClose={onClose} />
      </Provider>
    );

    fireEvent.changeText(getByPlaceholderText("edit a task"), "My new task");
    fireEvent.press(getByTestId("enter"));

    expect(onClose).toHaveBeenCalled();
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

  afterEach(cleanup);
});
