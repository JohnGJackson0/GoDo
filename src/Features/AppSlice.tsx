import { createSlice } from "@reduxjs/toolkit";
import { configureFonts } from "react-native-paper";
import { LightTheme } from "./Themes/Themes";
export interface AppState {
  navTitle: string;
  theme: any;
}

const initialState: AppState = {
  navTitle: "All",
  theme: LightTheme,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTheme(state, action) {
      state.theme = action.payload;
    },
    updateAppTitle(state, action) {
      state.navTitle = action.payload;
    },
  },
});

export const { updateAppTitle, updateTheme } = AppSlice.actions;

export default AppSlice.reducer;
