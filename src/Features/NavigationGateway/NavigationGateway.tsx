import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AuthLoadingScreen,
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  StartScreen,
} from "../AuthenticationPortal/screens";
import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_CONFIG } from "../AuthenticationPortal/core/config";
import Header from "../Tasks/Header";
import Tasks from "../Tasks/Tasks";
import Lists from "../Catagories/Lists";
import Settings from "../Settings/Settings";
import FlashMessage from "react-native-flash-message";

const NavigationGateway = () => {
  const Stack = createStackNavigator();
  const theme = useSelector((state: RootState) => state.app.theme);

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: (props) => <Header {...props} />,
          }}
          initialRouteName={
            authentication.hasOptedOut === true ? "Tasks" : "AuthLoadingScreen"
          }
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="Lists" component={Lists} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="bottom" />
    </PaperProvider>
  );
};

export default NavigationGateway;
