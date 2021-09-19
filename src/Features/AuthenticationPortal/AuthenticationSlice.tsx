import { createSlice } from "@reduxjs/toolkit";

export interface AuthenticationState {
  hasOptedOut: boolean;
  userId: string;
}

const initialState: AuthenticationState = {
  hasOptedOut: false,
  userId: "",
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { optOut, optIn, setUserId } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
