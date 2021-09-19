import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import ThemeCircle from "./ThemeCircle";
import { Text, withTheme } from "react-native-paper";
import Account from "./Account";
import { useDispatch } from "react-redux";
import { updateAppTitle } from "../AppSlice";

const Settings = (props: any) => {
  const dispatch = useDispatch();
  const { colors } = props.theme;

  useEffect(() => {
    dispatch(updateAppTitle("Settings"));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      flexDirection: "column",
    },
    label: {
      margin: 5,
      fontSize: 24,
    },
    themesContainer: {
      flexDirection: "row",
    },
    accountContainer: {
      flexDirection: "column",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <Text numberOfLines={1} style={styles.label}>
          Account {"\n"}
        </Text>
        <Account navigation={props.navigation}></Account>
      </View>

      <View style={styles.themesContainer}>
        <Text numberOfLines={1} style={styles.label}>
          Themes
        </Text>
        <ThemeCircle color={"#121212"} variant={"dark"} />
        <ThemeCircle color={"#f6f6f6"} variant={"light"} />
      </View>
    </View>
  );
};

export default withTheme(Settings);
