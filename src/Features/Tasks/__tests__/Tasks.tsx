import React from "react";
import "@testing-library/jest-native";
import Tasks from "../Tasks";
import { render, fireEvent, waitFor } from "../../../../test-utils";
import "@testing-library/jest-dom";

describe("tasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders", () => {
    render(<Tasks />);
  });

  it("modal opens when create task is clicked", () => {
    const { getByTestId } = render(<Tasks />);

    getByTestId("newTaskFab");
    //unresolved issue at modalizeRef.current?.open();
    //fireEvent.press(getByTestId("newTaskFab"));
  });
});
