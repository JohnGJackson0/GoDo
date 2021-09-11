import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { withTheme } from "react-native-paper";

const Button = ({ mode, style, ...props }) => {
  const { colors } = props.theme;

  const styles = StyleSheet.create({
    button: {
      width: "100%",
      marginVertical: 10,
      paddingVertical: 2,
    },
    text: {
      fontWeight: "bold",
      fontSize: 15,
      lineHeight: 26,
    },
  });
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
};

export default withTheme(Button);
