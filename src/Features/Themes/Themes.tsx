import { configureFonts } from "react-native-paper";

export const LightTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: "#6200ee",
    accent: "#6200ee",
    background: "#f6f6f6",
    backgroundInvert: "#000000",
    opactiyBackground: "rgba(35,37,47,.6)",
    surface: "#ffffff",
    error: "#B00020",
    text: "#000000",
    textHighEmpasis: "#000000",
    textMediumEmpasis: "#000000",
    textLowEmpasis: "#000000",
    onSurface: "#000000",
    disabled: "rgba(0, 0, 0, 0.26)",
    placeholder: "rgba(0, 0, 0, 0.54)",
    backdrop: "rgba(0, 0, 0, 0.50)",
    red: "rgba(247,65,45, 1)",
  },
  fonts: configureFonts(),
  animation: {
    scale: 1.0,
  },
};

export const DarkTheme = {
  ...LightTheme,
  dark: true,
  mode: "adaptive",
  colors: {
    ...LightTheme.colors,
    primary: "rgba(245,0,87,1)",
    accent: "rgba(245,0,87,1)",
    background: "#121212",
    backgroundInvert: "#f6f6f6",
    opactiyBackground: "rgba(35,37,47,.4)",
    surface: "#121212",
    error: "#CF6679",
    onSurface: "#FFFFFF",
    text: "#FFFFFF",
    textHighEmpasis: "rgba(255,255,255, 0.84)",
    textMediumEmpasis: "rgba(255,255,255, 0.60)",
    textLowEmpasis: "rgba(255,255,255, 0.38)",
    disabled: "rgba(255,255,255, 0.38)",
    placeholder: "rgba(255,255,255, 0.54)",
    backdrop: "rgba(0,0,0, 0.50)",
    notification: "#ff80AB",
    red: "rgba(247,65,45, 1)",
  },
};
