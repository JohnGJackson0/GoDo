import React, { useState } from "react";
import { Tasks } from "./src/Features/Tasks/Tasks";
import { Lists } from "./src/Features/Lists/Lists";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootState, store } from "./src/store";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { Host } from "react-native-portalize";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Theme, ThemedNavigationBarTasks } from "./src/Theme";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider as PaperProvider, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { Appbar, Menu } from "react-native-paper";
import Header from "./src/Features/Tasks/Header";
import settings from "./src/Features/Settings/settings";

const Stack = createStackNavigator();
let persistor = persistStore(store);

export default function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <PaperProvider theme={Theme.paperTheme}>
          <Provider store={store}>
            <Host>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Tasks"
                  screenOptions={{
                    header: (props) => <Header {...props} />,
                  }}
                >
                  <Stack.Screen name="Tasks" component={Tasks} />
                  <Stack.Screen name="Lists" component={Lists} />
                  <Stack.Screen name="Settings" component={settings} />
                </Stack.Navigator>
                <FlashMessage position="bottom" />
              </NavigationContainer>
            </Host>
          </Provider>
        </PaperProvider>
      </SafeAreaProvider>
    </PersistGate>
  );
}
