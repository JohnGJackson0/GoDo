import { createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  hasOptedOut: boolean;
}

const initialState: AuthenticationState = {
  hasOptedOut: false,
};

export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    optOut: (state) => {
      state.hasOptedOut = true;
    },
    optIn: (state) => {
      state.hasOptedOut = false;
    },
  },
});

export const { optOut, optIn } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
