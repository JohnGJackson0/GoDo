import React from "react";
import AddLists from "../AddLists";
import { render, fireEvent, waitFor } from "../../../../test-utils";
import * as redux from "react-redux";

describe("Features/Catagories/AddLists", () => {
  afterEach(() => {    
    jest.clearAllMocks();
  });
  
  it("should render", () => {
    render(<AddLists />);
  });

  it("shows placeholder insutructions", () => {
    const { getByPlaceholderText } = render(<AddLists />);

    getByPlaceholderText(/add a catagory/i);
  });

  it("displays the correct input the user types", () => {
    const { getByPlaceholderText, getByText } = render(<AddLists />);

    getByPlaceholderText(/add a catagory/i);

    fireEvent.changeText(
      getByPlaceholderText(/add a catagory/i),
      "User Typed content"
    );

    expect(getByPlaceholderText(/add a catagory/i).props.value).toEqual(
      "User Typed content"
    );
  });

  it("closes when submitting", () => {
    const fakeClose = jest.fn();

    const { getByTestId } = render(<AddLists onClose={fakeClose} />);

    fireEvent.press(getByTestId("submit"));

    expect(fakeClose).toHaveBeenCalled;
  });

  it("updates the catagory correctly", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeClose = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <AddLists onClose={fakeClose} />
    );

    fireEvent.changeText(
      getByPlaceholderText(/add a catagory/i),
      "User Typed content"
    );

    fireEvent.press(getByTestId("submit"));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledWith({
        payload: "User Typed content",
        type: "tasks/addCatagory",
      });
    });

    useDispatchSpy.mockClear();
  });

  it("updates the cloud", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const fakeClose = jest.fn();

    const { getByTestId, getByPlaceholderText } = render(
      <AddLists onClose={fakeClose} />
    );

    fireEvent.changeText(
      getByPlaceholderText(/add a catagory/i),
      "User Typed content"
    );

    fireEvent.press(getByTestId("submit"));

    await waitFor(() => {
      expect(mockDispatchFn).toHaveBeenCalledTimes(2);
    });

    useDispatchSpy.mockClear();
  });
});
