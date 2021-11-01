import React from "react";
import { render, fireEvent } from "../../../../test-utils";
import ListItem from "../ListItem";
import * as redux from "react-redux";
import "@testing-library/jest-native";

describe("Features/Catagories/Listitem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    render(<ListItem list={{ name: "all", id: 0, editable: false }} />);
  });

  it("doesn't show edit icon if the list is not editable", () => {
    const { queryByTestId } = render(
      <ListItem list={{ name: "all", id: 0, editable: false }} />
    );

    expect(queryByTestId("edit")).toEqual(null);
  });
  it("does show the edit icon if the list is editable", () => {
    const { queryByTestId } = render(
      <ListItem list={{ name: "all", id: 1, editable: true }} />
    );

    expect(queryByTestId("edit")).not.toEqual(null);
  });
  it("closes and updates active list when the list is clicked", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeGoBack = jest.fn();

    const { getByTestId } = render(
      <ListItem
        goBack={fakeGoBack}
        list={{ name: "all", id: 1, editable: true }}
      />
    );

    fireEvent.press(getByTestId("editableList"));

    expect(fakeGoBack).toHaveBeenCalledTimes(1);

    expect(mockDispatchFn.mock.calls).toEqual([
      [
        {
          payload: { editable: true, id: 1, name: "all" },
          type: "tasks/updateActiveCatagory",
        },
      ],
      [{ payload: "all", type: "app/updateAppTitle" }],
    ]);

    useDispatchSpy.mockClear();
  });

  it("closes and updates active list when the list is clicked for non editable lists", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeGoBack = jest.fn();

    const { getByTestId } = render(
      <ListItem
        goBack={fakeGoBack}
        list={{ name: "all", id: 0, editable: false }}
      />
    );

    fireEvent.press(getByTestId("nonEditableList"));

    expect(fakeGoBack).toHaveBeenCalledTimes(1);

    expect(mockDispatchFn.mock.calls).toEqual([
      [
        {
          payload: { editable: false, id: 0, name: "all" },
          type: "tasks/updateActiveCatagory",
        },
      ],
      [{ payload: "all", type: "app/updateAppTitle" }],
    ]);

    useDispatchSpy.mockClear();
  });

  it("displays the task count and list name", () => {
    const fakeGoBack = jest.fn();

    const { getByText } = render(
      <ListItem
        goBack={fakeGoBack}
        list={{ name: "all", id: 0, editable: false }}
        taskCount={20}
      />
    );
    getByText(/20/);
    getByText(/all/i);
  });

  it("calls on add item if list is UIAdd as key", () => {
    const fakeGoBack = jest.fn();
    const fakeOnAdd = jest.fn();

    const { getByTestId } = render(
      <ListItem goBack={fakeGoBack} list={{ key: "UIAdd" }} onAdd={fakeOnAdd} />
    );

    fireEvent.press(getByTestId("plus"));

    expect(fakeOnAdd).toHaveBeenCalledTimes(1);
  });
  it("empty lists are transparent", () => {
    const fakeGoBack = jest.fn();
    const fakeOnAdd = jest.fn();

    const { getByTestId } = render(<ListItem list={{ empty: true }} />);

    expect(getByTestId("empty")).toHaveStyle({
      backgroundColor: "transparent",
    });
  });

  it("edits the list when edit icon pressed", () => {
    const fakeOnEdit = jest.fn();

    const { getByTestId } = render(
      <ListItem
        list={{ name: "all", id: 1, editable: true }}
        onEdit={fakeOnEdit}
      />
    );

    expect(fakeOnEdit).toHaveBeenCalledTimes(0);

    fireEvent.press(getByTestId("edit"));

    expect(fakeOnEdit).toHaveBeenCalledTimes(1);
  });
});
