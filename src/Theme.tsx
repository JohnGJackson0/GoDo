import React, { useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { FAB, Text, Input } from "react-native-elements";
import { Checkbox, Button } from "react-native-paper";

import { Icon } from "react-native-elements";

var primaryBackgroundColor = "#121212";
var primaryButtonColor = "rgba(245,0,87,1)";
var secondayBackgroundColor = "rgba(35,37,47,1)";
var red = "rgba(247,65,45, 1)";

var textHighEmpasis = "rgba(255,255,255, 0.84)";
var textMediumEmpasis = "rgba(255,255,255, 0.60)";
var textLowEmpasis = "rgba(255,255,255, 0.38)";
var textOnDifferentBackgrounds = "#FFFFFF";
var darkTheme = true;

const styles = StyleSheet.create({
  containerFullScreen: {
    flex: 1,
    backgroundColor: primaryBackgroundColor,
  },
  container: {
    width: "100%",
    backgroundColor: primaryBackgroundColor,
  },
  containerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: primaryBackgroundColor,
  },
  textOnDifferentBackgrounds: {
    color: textOnDifferentBackgrounds,
  },
  textHighEmpasisStrikeThrough: {
    margin: 5,
    color: textHighEmpasis,
    textDecorationLine: "line-through",
  },
  textHighEmpasis: {
    margin: 5,
    color: textHighEmpasis,
  },
  textMediumEmpasis: {
    margin: 5,
    color: textMediumEmpasis,
  },
  textLowEmpasis: {
    margin: 5,
    color: textLowEmpasis,
  },
  inputText: {
    color: textMediumEmpasis,
  },
  inputContainer: {
    //corrects padding left-right on react-native-elements
    //regular padding doesn't work
    paddingHorizontal: 0,
    justifyContent: "center",
    alignSelf: "center",
  },
  inputMarginContainer: {
    margin: 5,
  },
  modal: {
    backgroundColor: secondayBackgroundColor,
  },
  button: {
    margin: 5,
  },
  redButton: {
    backgroundColor: red,
    margin: 5,
  },
  checkboxContainer: {
    margin: 10,
  },
  containerBackground: {
    backgroundColor: secondayBackgroundColor,
    margin: 5,
  },
});

const ThemedCheckbox = (props: any) => {
  return (
    <Checkbox
      uncheckedColor={primaryButtonColor}
      color={primaryButtonColor}
      {...props}
    />
  );
};

const themedExtendedFab = (props: any) => {
  return <FAB {...props} color={primaryButtonColor} />;
};

const themedButton = (props: any) => {
  return (
    <View style={{ margin: 5 }}>
      <Button
        mode="contained"
        dark={darkTheme}
        color={primaryButtonColor}
        {...props}
      ></Button>
    </View>
  );
};
const themedVariantButton = (props: any) => {
  return (
    <View style={{ margin: 5 }}>
      <Button
        mode="text"
        dark={darkTheme}
        color={primaryButtonColor}
        {...props}
      ></Button>
    </View>
  );
};

const themedEditIcon = (props: any) => {
  return (
    <Icon
      color={primaryButtonColor}
      name="edit"
      type="material"
      {...props}
      size="20"
    />
  );
};

const themedDeleteIcon = (props: any) => {
  return (
    <Icon
      color={primaryButtonColor}
      name="remove"
      type="material"
      {...props}
      size="20px"
    />
  );
};

const themedFullScreenContainer = (props: any) => {
  return <View style={styles.containerFullScreen} {...props}></View>;
};

const themedOffsetBackground = (props: any) => {
  return <View style={styles.containerBackground} {...props}></View>;
};

const themedContainer = (props: any) => {
  return <View style={styles.container} {...props}></View>;
};
const themedContainerRow = (props: any) => {
  return <View style={styles.containerRow} {...props}></View>;
};

const themedTextHighEmpasis = (props: any) => {
  return <Text h4 style={styles.textHighEmpasis} {...props}></Text>;
};

const themedTextHighEmpasisStrikeThrough = (props: any) => {
  return (
    <Text h4 style={styles.textHighEmpasisStrikeThrough} {...props}></Text>
  );
};

const themedTextOnDifferentBackgrounds = (props: any) => {
  return <Text h4 style={styles.textOnDifferentBackgrounds} {...props}></Text>;
};

const themedModalStyle = styles.modal;

const themedInput = (props: any) => {
  return (
    <View style={styles.inputMarginContainer}>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        {...props}
      ></Input>
    </View>
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
  themedVariantButton,
  ThemedCheckbox,
  themedOffsetBackground,
  textHighEmpasis,
  themedTextHighEmpasisStrikeThrough,
  themedEditIcon,
  themedDeleteIcon,
  themedContainerRow,
};
