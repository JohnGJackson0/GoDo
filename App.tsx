import React from "react";
import { Tasks } from "./src/Features/Tasks/Tasks";
import { Lists } from "./src/Features/Lists/Lists";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { Host } from "react-native-portalize";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemedNavigationBarTasks } from "./src/Theme";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const Stack = createStackNavigator();
let persistor = persistStore(store);

export default function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Host>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Tasks"
                screenOptions={{
                  header: (props) => <ThemedNavigationBarTasks {...props} />,
                }}
              >
                <Stack.Screen name="Tasks" component={Tasks} />
                <Stack.Screen name="Lists" component={Lists} />
              </Stack.Navigator>
              <FlashMessage position="bottom" />
            </NavigationContainer>
          </Host>
        </Provider>
      </SafeAreaProvider>
    </PersistGate>
  );
}
