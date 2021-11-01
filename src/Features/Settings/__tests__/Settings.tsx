import React from "react";
import { render } from "../../../../test-utils";
import Settings from "../Settings";
import firebase from "firebase/app";

jest.mock("firebase/app", () => {
  return {
    auth: jest.fn(),
  };
});

describe("Features/Settings/Settings", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders", () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });
    render(<Settings />);
  });
  it("contains account section", () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });
    const { getByText } = render(<Settings />);
    getByText(/account/i);
  });
  it("contains themes section", () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });
    const { getByText } = render(<Settings />);
    getByText(/themes/i);
  });
});
