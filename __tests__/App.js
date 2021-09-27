jest.useFakeTimers();
import "react-native";
import React from "react";
import App from "../App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { cleanup } from "@testing-library/react-native";
import { store } from "../src/store";

const Mockapp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe("app", () => {
  it("renders correctly", () => {
    renderer.create(<Mockapp />);
  });
  afterEach(cleanup);
});
