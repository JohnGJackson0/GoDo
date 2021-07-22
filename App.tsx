import React from "react";
import { Tasks } from "./src/Features/Tasks";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { Host } from "react-native-portalize";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Host>
          <Tasks />
          <FlashMessage position="bottom" />
        </Host>
      </Provider>
    </SafeAreaProvider>
  );
}
