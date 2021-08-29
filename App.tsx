import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { Provider } from "react-redux";
import { Host } from "react-native-portalize";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ThemedApp from "./src/Features/Themes/ThemedApp";
import AuthGateway from "./src/Features/AuthenticationPortal/gateway/authGateway";

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
            <AuthGateway />
          </Host>
        </Provider>
      </SafeAreaProvider>
    </PersistGate>
  );
}
