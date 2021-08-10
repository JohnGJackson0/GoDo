import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../Settings/Settings";
import Tasks from "../Tasks/Tasks";
import Lists from "../Lists/Lists";
import Header from "../Tasks/Header";
import FlashMessage from "react-native-flash-message";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ThemedApp = () => {
  const Stack = createStackNavigator();
  const theme = useSelector((state: RootState) => state.app.theme);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Tasks"
          screenOptions={{
            header: (props) => <Header {...props} />,
          }}
        >
          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="Lists" component={Lists} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ThemedApp;
