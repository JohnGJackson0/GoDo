import React from "react";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { Provider } from "react-redux";
import { Host } from "react-native-portalize";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ThemedApp from "./src/Features/Themes/MainApp";
import AuthGateway from "./src/Features/AuthenticationPortal/gateway/authGateway";
import NavigationGateway from "./src/Features/NavigationGateway/NavigationGateway";

let persistor = persistStore(store);

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

export default function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Host>
            <NavigationGateway />
          </Host>
        </Provider>
      </SafeAreaProvider>
    </PersistGate>
  );
}
