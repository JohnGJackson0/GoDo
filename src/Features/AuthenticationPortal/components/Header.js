import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { withTheme } from "react-native-paper";

const Header = (props) => {
  const { colors } = props.theme;
  const styles = StyleSheet.create({
    header: {
      fontSize: 21,
      color: colors.primary,
      textAlign: "center",
      fontWeight: "bold",
      paddingVertical: 12,
    },
  });
  return <Text style={styles.header} {...props} />;
};

export default withTheme(Header);
