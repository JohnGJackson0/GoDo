import React from "react";
import { render, fireEvent, waitFor } from "../../../../test-utils";
import Task from "../Task";
import * as redux from "react-redux";

describe("Features/Tasks/task", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders", () => {
    render(<Task task={{ checked: false, name: "theName" }} />);
  });
  it("displays the name correctly", () => {
    const { getByText } = render(
      <Task task={{ checked: false, name: "theName" }} />
    );
    getByText(/theName/i);
  });
  it("when checked is true prop shows line-through", () => {
    const { getByText } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    expect(getByText("theName")).toHaveStyle({
      textDecorationLine: "line-through",
    });
  });

  it("when checked is false prop doesn't show line-through", () => {
    const { getByText } = render(
      <Task task={{ checked: false, name: "theName" }} />
    );

    expect(getByText("theName")).not.toHaveStyle({
      textDecorationLine: "line-through",
    });
  });

  it("not checked has no text through style ", async () => {
    const { getByText, getByTestId } = render(
      <Task task={{ checked: false, name: "theName" }} />
    );

    expect(getByText("theName")).not.toHaveStyle({
      textDecorationLine: "line-through",
    });
  });

  it("checked has text through style ", async () => {
    const { getByText, getByTestId } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    expect(getByText("theName")).toHaveStyle({
      textDecorationLine: "line-through",
    });
  });

  it("clicking the task checkbox will invert it", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByText, getByTestId } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    fireEvent.press(getByTestId("checkBox"));

    await waitFor(() => {
      expect(JSON.stringify(mockDispatchFn.mock.calls)).toEqual(
        '[[{"type":"tasks/updateChecked","payload":{"checked":false}}],[null]]'
      );
    });
  });

  it("clicking the task will invert it", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByText, getByTestId } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    fireEvent.press(getByTestId("taskCheckBox"));

    await waitFor(() => {
      expect(JSON.stringify(mockDispatchFn.mock.calls)).toEqual(
        '[[{"type":"tasks/updateChecked","payload":{"checked":false}}],[null]]'
      );
    });
  });

  it("shows delete ICON when checked is true ", async () => {
    const { getByTestId } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    getByTestId("deleteIconButton");
  });
  it("does not show delete ICON when checked is false ", async () => {
    const { queryByTestId } = render(
      <Task task={{ checked: false, name: "theName" }} />
    );

    expect(queryByTestId("deleteIconButton")).toBeNull;
  });
  it("does show the edit ICON when checked is false", () => {
    const { getByTestId } = render(
      <Task task={{ checked: false, name: "theName" }} />
    );
    getByTestId("editIconButton");
  });

  it("does not show the edit ICON when checked is true", () => {
    const { queryByTestId } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );
    expect(queryByTestId("editIconButton")).toBeNull;
  });

  it("pressing on the delete icon removes the task", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByText, getByTestId, queryByText } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    getByText("theName");

    fireEvent.press(getByTestId("deleteIconButton"));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledWith({
        payload: { checked: true, name: "theName" },
        type: "tasks/removeTask",
      });
    });
  });
  it("pressing the edit icon calls on the openEditModal", async () => {
    const openEditModal = jest.fn();

    const { getByPlaceholderText, getByTestId, queryByText } = render(
      <Task
        task={{ checked: false, name: "theName" }}
        openEditModal={openEditModal}
      />
    );
    expect(openEditModal).not.toHaveBeenCalled();

    fireEvent.press(getByTestId("editIconButton"));

    await waitFor(() => {
      expect(openEditModal).toHaveBeenCalled();
    });
  });
});
