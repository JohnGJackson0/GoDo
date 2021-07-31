import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  navTitle: string;
}

const initialState: AppState = {
  navTitle: "All",
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateAppTitle(state, action) {
      state.navTitle = action.payload;
    },
  },
});

export const { updateAppTitle } = AppSlice.actions;

export default AppSlice.reducer;
