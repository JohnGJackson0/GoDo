import { fireEvent } from "@testing-library/react-native";
import React from "react";
import { render } from "../../../../../test-utils";
import BackButton from "../BackButton";

describe("Features/AuthenticationPortal/Components/BackButton", () => {
  it("renders", () => {
    const fakeGoBack = jest.fn();

    render(<BackButton goBack={jest.fn()} />);
  });
  it("goes back", () => {
    const fakeGoBack = jest.fn();

    const { getByTestId } = render(<BackButton goBack={jest.fn()} />);

    fireEvent.press(getByTestId("back"));

    expect(fakeGoBack).toHaveBeenCalled;
  });
});
