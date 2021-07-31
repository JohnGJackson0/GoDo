import React, { useRef } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FAB, Text, Input } from "react-native-elements";
import { Checkbox, Button, IconButton } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "./store";

var primaryBackgroundColor = "#121212";
var primaryAccentColor = "rgba(245,0,87,1)";
var secondayBackgroundColor = "rgba(35,37,47,.4)";
var red = "rgba(247,65,45, 1)";

var textHighEmpasis = "rgba(255,255,255, 0.84)";
var textMediumEmpasis = "rgba(255,255,255, 0.60)";
var textLowEmpasis = "rgba(255,255,255, 0.38)";
var textOnDifferentBackgrounds = "#FFFFFF";
var darkTheme = true;
var appBarTitle = "All";

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
    ellipsizeMode: "head",
  },
  textHighEmpasis: {
    margin: 5,
    color: textHighEmpasis,
    ellipsizeMode: "head",
  },
  listLabel: {
    color: primaryAccentColor,
    ellipsizeMode: "Head",
  },
  textAccent: {
    margin: 5,
    color: primaryAccentColor,
    ellipsizeMode: "head",
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
    backgroundColor: "rgba(35,37,47,.5)",
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0)",
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
  containerOffsetBackground: {
    backgroundColor: secondayBackgroundColor,
    margin: 5,
  },
  flatList: {
    flex: 1,
  },
  listContainer: {
    margin: "5px",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
  },
});

export function changeNavigationBarName(newTitle: string) {
  appBarTitle = newTitle;
}

export function ThemedNavigationBarTasks({ navigation, previous }: any) {
  const navTitle = useSelector((state: RootState) => state.app.navTitle);
  return (
    <Appbar.Header style={{ backgroundColor: primaryBackgroundColor }}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      ) : (
        <Appbar.Action
          icon={"apps"}
          onPress={() => {
            navigation.navigate("Lists");
          }}
        />
      )}

      <Appbar.Content title={navTitle} />
    </Appbar.Header>
  );
}

const themedFlatList = (props: any) => {
  return <FlatList style={styles.flatList} {...props} />;
};

const ThemedCheckbox = (props: any) => {
  return (
    <Checkbox
      uncheckedColor={primaryAccentColor}
      color={primaryAccentColor}
      {...props}
    />
  );
};

const themedExtendedFab = (props: any) => {
  return <FAB {...props} color={primaryAccentColor} />;
};

const themedButton = (props: any) => {
  return (
    <View style={{ margin: 5 }}>
      <Button
        mode="contained"
        dark={darkTheme}
        color={primaryAccentColor}
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
        color={primaryAccentColor}
        {...props}
      ></Button>
    </View>
  );
};

const themedEditIcon = (props: any) => {
  return (
    <IconButton
      icon="pencil-outline"
      color={primaryAccentColor}
      {...props}
      size={20}
    />
  );
};

const themedListButton = (props: any) => {
  return (
    <View style={styles.listContainer}>
      <IconButton
        icon="view-list-outline"
        color={primaryAccentColor}
        {...props}
        size={30}
      />
      <Text numberOfLines={2} style={styles.listLabel}>
        {props.label}
      </Text>
    </View>
  );
};

const themedEnter = (props: any) => {
  return (
    <IconButton
      icon="arrow-right-circle-outline"
      color={primaryAccentColor}
      {...props}
      size={30}
    />
  );
};

const themedDeleteIcon = (props: any) => {
  return (
    <IconButton
      icon="delete-outline"
      color={primaryAccentColor}
      {...props}
      size={20}
    />
  );
};

const themedAddIcon = (props: any) => {
  return (
    <IconButton color={primaryAccentColor} icon="plus" {...props} size={90} />
  );
};

const themedFullScreenContainer = (props: any) => {
  return <View style={styles.containerFullScreen} {...props}></View>;
};

const themedOffsetBackground = (props: any) => {
  return <View style={styles.containerOffsetBackground} {...props}></View>;
};

const themedContainer = (props: any) => {
  return <View style={styles.container} {...props}></View>;
};
const themedContainerRow = (props: any) => {
  return <View style={styles.containerRow} {...props}></View>;
};

const themedTextHighEmpasis = (props: any) => {
  return (
    <Text h4 numberOfLines={1} style={styles.textHighEmpasis} {...props}></Text>
  );
};

const themedTextAccent = (props: any) => {
  return (
    <Text h4 numberOfLines={1} style={styles.textAccent} {...props}></Text>
  );
};

const themedTextHighEmpasisStrikeThrough = (props: any) => {
  return (
    <Text
      h4
      numberOfLines={1}
      style={styles.textHighEmpasisStrikeThrough}
      {...props}
    ></Text>
  );
};

const themedTextOnDifferentBackgrounds = (props: any) => {
  return (
    <Text
      numberOfLines={1}
      h4
      style={styles.textOnDifferentBackgrounds}
      {...props}
    ></Text>
  );
};

const themedModalStyle = styles.modal;
const themedModalBackgroundStyle = styles.modal;

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
  themedAddIcon,
  themedContainerRow,
  ThemedNavigationBarTasks,
  themedFlatList,
  secondayBackgroundColor,
  themedModalBackgroundStyle,
  changeNavigationBarName,
  appBarTitle,
  themedTextAccent,
  themedEnter,
  themedListButton,
};
