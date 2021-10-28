import React from "react";
import { render, fireEvent } from "../../../../test-utils";
import Account from "../Account";
import firebase from "firebase/app";
import { waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("firebase/app", () => {
  return {
    auth: jest.fn(),
  };
});

describe("Features/Settings/Account", () => {
  afterEach(() => {
    (firebase.auth as jest.Mocked<any>).mockClear();
  });

  it("should render", () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });

    render(<Account />);
  });

  it("should have a message about opting out when not logged in", () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({ currentUser: null });

    const { getByText } = render(<Account />);

    getByText(/Opt into an account for backup and sync across platforms/i);
  });

  it("should show login status when logged in", () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });
    const { getByText } = render(<Account />);

    getByText(/currently logged in/i);
    getByText(/example/i);
  });

  it("should route to login when opt in pressed", async () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: null,
    });

    const fakeNavigation = {
      reset: jest.fn(),
    };

    const { getByTestId } = render(<Account navigation={fakeNavigation} />);

    const optInButton = getByTestId("optIn");

    expect(fakeNavigation.reset).not.toHaveBeenCalled();

    fireEvent.press(optInButton);

    await waitFor(() => {
      expect(fakeNavigation.reset).toHaveBeenCalled();
    });
  });

  it("should route to loading when the sign out button is pressed", async () => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: "example@gmail.com", uid: 1, emailVerified: true },
    });

    const fakeNavigation = {
      reset: jest.fn(),
    };

    const { getByTestId } = render(<Account navigation={fakeNavigation} />);

    const logoutButton = getByTestId("logout");

    expect(fakeNavigation.reset).not.toHaveBeenCalled();

    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(fakeNavigation.reset).toHaveBeenCalled();
    });
  });
});
