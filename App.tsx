import React from "react";
import { Tasks } from "./src/Features/Tasks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Tasks />
        <FlashMessage position="bottom" />
      </Provider>
    </SafeAreaProvider>
  );
}
