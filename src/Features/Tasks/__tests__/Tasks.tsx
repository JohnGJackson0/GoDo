import React from "react";
import "@testing-library/jest-native";
import Tasks from "../Tasks";
import { render } from "../../../../test-utils";
import "@testing-library/jest-dom";

describe("tasks", () => {
  it("renders", () => {
    render(<Tasks />);
  });
});
