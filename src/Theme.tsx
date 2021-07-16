import React, { useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { FAB, Text, Input, Button } from "react-native-elements";

var primaryBackgroundColor = "#121212";
var primaryButtonColor = "#CA71EB";
var secondayBackgroundColor = "#101010";

var textHighEmpasis = "rgba(255,255,255, 0.84)";
var textMediumEmpasis = "rgba(255,255,255, 0.60)";
var textLowEmpasis = "rgba(255,255,255, 0.38)";
var textOnDifferentBackgrounds = "#FFFFFF";

const styles = StyleSheet.create({
  containerFullScreen: {
    flex: 1,
    backgroundColor: primaryBackgroundColor,
  },
  container: {
    backgroundColor: primaryBackgroundColor,
  },
  textOnDifferentBackgrounds: {
    color: textOnDifferentBackgrounds,
  },
  textHighEmpasis: {
    margin: "5px",
    color: textHighEmpasis,
  },
  textMediumEmpasis: {
    margin: "5px",
    color: textMediumEmpasis,
  },
  textLowEmpasis: {
    margin: "5px",
    color: textLowEmpasis,
  },
  inputText: {
    color: textMediumEmpasis,
  },
  inputContainer: {
    margin: "5px",
    //corrects padding left-right on react-native-elements
    //regular padding doesn't work
    paddingHorizontal: 0,
  },
  modal: {
    backgroundColor: secondayBackgroundColor,
  },
  button: {
    backgroundColor: primaryButtonColor,
    margin: "5px",
  },
});

export type ModalProps = {
  isVisible: boolean;
};

const themedExtendedFab = (props: any) => {
  return <FAB {...props} color={primaryButtonColor} />;
};

const themedButton = (props: any) => {
  return <Button buttonStyle={styles.button} {...props}></Button>;
};

const themedFullScreenContainer = (props: any) => {
  return <View style={styles.containerFullScreen} {...props}></View>;
};

const themedContainer = (props: any) => {
  return <View style={styles.container} {...props}></View>;
};

const themedTextHighEmpasis = (props: any) => {
  return <Text h4 style={styles.textHighEmpasis} {...props}></Text>;
};

const themedTextOnDifferentBackgrounds = (props: any) => {
  return <Text h4 style={styles.textOnDifferentBackgrounds} {...props}></Text>;
};

const themedModalStyle = styles.modal;

const themedInput = (props: any) => {
  return (
    <Input
      containerStyle={styles.inputContainer}
      inputStyle={styles.inputText}
      {...props}
    ></Input>
  );
};

export const Theme = {
  themedFullScreenContainer,
  themedExtendedFab,
  themedTextHighEmpasis,
  themedModalStyle,
  themedContainer,
  themedTextOnDifferentBackgrounds,
  themedInput,
  themedButton,
};
