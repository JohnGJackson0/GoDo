import React, { useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { FAB, Text, Input } from "react-native-elements";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Button } from "@material-ui/core";
import { AiOutlineEdit } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { IconContext } from "react-icons";

var primaryBackgroundColor = "#121212";
var primaryButtonColor = "rgba(245,0,87,1)";
var secondayBackgroundColor = "rgba(35,37,47,1)";
var red = "rgba(247,65,45, 1)";

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
    width: "100%",
    backgroundColor: primaryBackgroundColor,
  },
  textOnDifferentBackgrounds: {
    color: textOnDifferentBackgrounds,
  },
  textHighEmpasisStrikeThrough: {
    margin: "5px",
    color: textHighEmpasis,
    textDecorationLine: "line-through",
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
    //corrects padding left-right on react-native-elements
    //regular padding doesn't work
    paddingHorizontal: 0,
    justifyContent: "center",
    alignSelf: "center",
  },
  inputMarginContainer: {
    margin: "5px",
  },
  modal: {
    backgroundColor: secondayBackgroundColor,
  },
  button: {
    margin: "5px",
  },
  redButton: {
    backgroundColor: red,
    margin: "5px",
  },
  checkboxContainer: {
    margin: "10px",
  },
  containerBackground: {
    backgroundColor: secondayBackgroundColor,
    margin: "5px",
  },
});

const ThemedCheckBox = withStyles({
  root: {
    color: primaryButtonColor,
    "&$checked": {
      color: primaryButtonColor,
    },
  },
  checked: {},
})((props: any) => <Checkbox color="default" {...props} />);

const themedCheckbox = (props: any) => {
  return (
    <View style={styles.checkboxContainer}>
      <FormGroup>
        <FormControlLabel
          control={<ThemedCheckBox name="checkedG" />}
          color={textHighEmpasis}
          {...props}
        />
      </FormGroup>
    </View>
  );
};

const themedExtendedFab = (props: any) => {
  return <FAB {...props} color={primaryButtonColor} />;
};

const themedButton = (props: any) => {
  return (
    <View style={{ margin: "5px" }}>
      <Button variant="contained" color="secondary" {...props}></Button>
    </View>
  );
};
const themedVariantButton = (props: any) => {
  return (
    <View style={{ margin: "5px" }}>
      <Button color="secondary" {...props}></Button>
    </View>
  );
};

const themedEditIcon = (props: any) => {
  return (
    <IconContext.Provider value={{ color: primaryButtonColor, size: "28px" }}>
      <AiOutlineEdit />
    </IconContext.Provider>
  );
};

const themedDeleteIcon = (props: any) => {
  return (
    <IconContext.Provider value={{ color: primaryButtonColor, size: "28px" }}>
      <TiDeleteOutline />
    </IconContext.Provider>
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
  themedCheckbox,
  themedOffsetBackground,
  textHighEmpasis,
  themedTextHighEmpasisStrikeThrough,
  themedEditIcon,
  themedDeleteIcon,
};
