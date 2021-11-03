import React from "react";
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { IconButton, withTheme } from "react-native-paper";

const BackButton = ({ goBack, theme }) => {
  const { colors } = theme;
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 10 + getStatusBarHeight(),
      left: 4,
    },
  });

  return (
    <IconButton
      testID="back"
      onPress={goBack}
      style={styles.container}
      icon="arrow-left"
      color={colors.primary}
    />
  );
};

export default withTheme(BackButton);
