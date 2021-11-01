import React from "react";
import ThemeCircle from "../ThemeCircle";
import { render, fireEvent, waitFor } from "../../../../test-utils";
import * as redux from "react-redux";

describe("Features/Settings/ThemeCircle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders", () => {
    render(<ThemeCircle />);
  });

  it("updates the theme with light variant", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(<ThemeCircle variant="light" />);

    fireEvent.press(getByTestId("circleClick"));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalled();
    });

    useDispatchSpy.mockClear();
  });

  it("updates the theme with dark variant", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const { getByTestId } = render(<ThemeCircle variant="dark" />);

    fireEvent.press(getByTestId("circleClick"));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalled();
    });

    useDispatchSpy.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
