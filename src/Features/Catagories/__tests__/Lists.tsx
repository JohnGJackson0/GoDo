import React from "react";
import { Host } from "react-native-portalize";
import { render } from "../../../../test-utils";
import Lists from "../Lists";

describe("src/Features/Catagories", () => {
  it("renders", () => {
    render(
      <Host>
        <Lists />
      </Host>
    );
  });

  
});
