import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { useDispatch } from "react-redux";
import { optOut } from "../AuthenticationSlice";

const StartScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <Background>
      <Logo />
      <Header>Enable Cross Platform Sync and Backup of ToDos</Header>
      <Paragraph>
        Please note that opting out does not backup or sync your data on
        multiple platforms.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>

      <Button mode="outlined" onPress={() => dispatch(optOut())}>
        Opt Out
      </Button>
    </Background>
  );
};

export default StartScreen;
