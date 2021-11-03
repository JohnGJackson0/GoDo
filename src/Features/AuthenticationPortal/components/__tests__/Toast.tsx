import React from "react";
import { render } from "../../../../../test-utils";
import Toast from "../Toast";

describe("Features/AuthenticationPortal/Components/TextInput", () => {
  it("renders", () => {
    render(<Toast message="example" onDismiss={jest.fn()} />);
  });
});
