import React from "react";
import { View, Text, TextInput } from "react-native";
import { render } from "../../../../../test-utils";
import Background from "../Background";
import * as helpers from "../../../../../jest/helpers";

describe("Features/AuthenticationPortal/Components/Background", () => {
  it("renders", () => {
    const fakeChildren = <></>;
    render(<Background children={fakeChildren} />);
  });
  it("displays the children", () => {
    const fakeChildren = (
      <View>
        <Text>Children content</Text>
      </View>
    );
    const { getByText } = render(<Background children={fakeChildren} />);

    getByText(/children content/i);
  });
});
