import React from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import Background from "../components/Background";
import { theme } from "../core/theme";
import { useSelector } from "react-redux";

const AuthLoadingScreen = ({ navigation }) => {
  const authentication = useSelector((state) => state.authentication);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tasks" }],
      });
    } else if (authentication.hasOptedOut) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tasks" }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default AuthLoadingScreen;
