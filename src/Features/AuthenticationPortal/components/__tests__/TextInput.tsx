import React from "react";
import { render } from "../../../../../test-utils";
import TextInput from "../TextInput";

describe("Features/AuthenticationPortal/Components/TextInput", () => {
  it("renders", () => {
    render(<TextInput />);
  });

  it("displays error message", () => {
    const { getByText } = render(<TextInput errorText="this is the error" />);

    getByText("this is the error");
  });
  it("displays a message", () => {
    const { getByText } = render(<TextInput description="example" />);

    getByText("example");
  });
});
