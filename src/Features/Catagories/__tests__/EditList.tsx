import React from "react";
import { render, waitFor } from "../../../../test-utils";
import { DarkTheme } from "../../Themes/Themes";
import { Host } from "react-native-portalize";

import EditList from "../EditList";
import { fireEvent } from "@testing-library/react-native";
import * as redux from "react-redux";

describe("Features/Catagories/EditLists", () => {
  afterEach(() => {    
    jest.clearAllMocks();
  });
  it("should render", () => {
    render(
      <Host>
        <EditList
          list={{ name: "all", id: 0, editable: false }}
          theme={DarkTheme}
        />
      </Host>
    );
  });

  it("displays the current list name and placeholder", () => {
    const { getByText, getByPlaceholderText } = render(
      <Host>
        <EditList
          list={{ name: "all", id: 0, editable: false }}
          theme={DarkTheme}
        />
      </Host>
    );

    getByPlaceholderText("all");

    expect(getByPlaceholderText("all").props.value).toEqual("all");
  });

  it("closes the modal when submiting", () => {
    const fakeClose = jest.fn();

    const { getByTestId } = render(
      <Host>
        <EditList
          onClose={fakeClose}
          list={{ name: "all", id: 0, editable: false }}
          theme={DarkTheme}
        />
      </Host>
    );

    fireEvent.press(getByTestId("submit"));

    expect(fakeClose).toHaveBeenCalledWith();
  });

  it("updates the state when submitted", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeClose = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <Host>
        <EditList
          onClose={fakeClose}
          list={{ name: "something", id: 2, editable: true }}
          theme={DarkTheme}
        />
      </Host>
    );

    fireEvent.changeText(getByPlaceholderText("something"), "NewList");
    fireEvent.press(getByTestId("submit"));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    });

    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: { id: 2, name: "NewList" },
      type: "tasks/editCatagory",
    });
  });

  it("the delete button closes the modal", () => {
    const fakeClose = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <Host>
        <EditList
          onClose={fakeClose}
          list={{ name: "something", id: 2, editable: true }}
          theme={DarkTheme}
        />
      </Host>
    );

    fireEvent.press(getByTestId("delete"));

    expect(fakeClose).toHaveBeenCalled;
  });

  it("pressing on the delete shows the modal", async () => {
    const fakeClose = jest.fn();

    const { getByTestId, getByText } = render(
      <Host>
        <EditList
          onClose={fakeClose}
          list={{ name: "something", id: 2, editable: true }}
          theme={DarkTheme}
        />
      </Host>
    );

    fireEvent.press(getByTestId("delete"));

    waitFor(() => {
      getByText(
        /would you like to remove all tasks on the list, or move them to/i
      );
    });
  });

  it("remove all tasks is called correctly when the option is selected", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeClose = jest.fn();

    const { getByTestId, getByText } = render(
      <Host>
        <EditList
          onClose={fakeClose}
          list={{ name: "something", id: 2, editable: true }}
          theme={DarkTheme}
        />
      </Host>
    );

    fireEvent.press(getByTestId("delete"));

    await waitFor(() => {
      fireEvent.press(getByTestId("removeAll"));
    });

    expect(fakeClose).toHaveBeenCalled;
    expect(mockDispatchFn).toHaveBeenCalledTimes(4);

    expect(JSON.stringify(mockDispatchFn.mock.calls)).toEqual(
      '[[{"type":"tasks/deleteCatagory","payload":{"id":2}}],[{"type":"tasks/removeAllFromList","payload":2}],[{"type":"tasks/updateActiveCatagory","payload":{"name":"All","id":0,"editable":false}}],[null]]'
    );
  });

  it("remove all tasks is called correctly when the option is selected", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeClose = jest.fn();

    const { getByTestId, getByText } = render(
      <Host>
        <EditList
          onClose={fakeClose}
          list={{ name: "something", id: 2, editable: true }}
          theme={DarkTheme}
        />
      </Host>
    );

    fireEvent.press(getByTestId("delete"));

    await waitFor(() => {
      fireEvent.press(getByTestId("keepTasks"));
    });

    expect(fakeClose).toHaveBeenCalled;
    expect(mockDispatchFn).toHaveBeenCalledTimes(5);

    expect(JSON.stringify(mockDispatchFn.mock.calls)).toEqual(
      '[[{"type":"tasks/deleteCatagory","payload":{"id":2}}],[{"type":"tasks/moveAllTasksOnListToAll","payload":{"id":2}}],[{"type":"tasks/updateActiveCatagory","payload":{"name":"All","id":0,"editable":false}}],[{"type":"app/updateAppTitle","payload":"All"}],[null]]'
    );
  });

  it("shows the modal", ()=>{
    
  })
});
