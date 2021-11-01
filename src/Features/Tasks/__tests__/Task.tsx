import React from "react";
import { render, fireEvent, waitFor } from "../../../../test-utils";
import Task from "../Task";

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

  it("inverts checked vs not checked when pressed ", async () => {
    const { getByText } = render(
      <Task task={{ checked: false, name: "theName" }} />
    );

    expect(getByText("theName")).not.toHaveStyle({
      textDecorationLine: "line-through",
    });

    fireEvent.press(getByText("theName"));

    waitFor(() => {
      expect(getByText("theName")).toHaveStyle({
        textDecorationLine: "line-through",
      });
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
    const { getByText, getByTestId, queryByText } = render(
      <Task task={{ checked: true, name: "theName" }} />
    );

    getByText("theName");

    fireEvent.press(getByTestId("deleteIconButton"));

    waitFor(() => {
      expect(queryByText("theName")).toEqual(null);
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
    console.log(openEditModal);
    expect(openEditModal).not.toHaveBeenCalled();

    fireEvent.press(getByTestId("editIconButton"));

    waitFor(() => {
      expect(openEditModal).toHaveBeenCalled();
    });
  });
});
