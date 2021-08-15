import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import ThemeCircle from "./ThemeCircle";
import { Text, withTheme } from "react-native-paper";

const Settings = (props: any) => {
  const { colors } = props.theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      flexDirection: "row",
    },
    label: {
      margin: 5,
      fontSize: 24,
    },
  });

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.label}>
        Themes
      </Text>
      <ThemeCircle color={"#121212"} variant={"dark"} />
      <ThemeCircle color={"#f6f6f6"} variant={"light"} />
    </View>
  );
};

export default withTheme(Settings);
