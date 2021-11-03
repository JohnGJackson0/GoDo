import React from "react";
import { StyleSheet, KeyboardAvoidingView, View, Platform } from "react-native";
import { withTheme } from "react-native-paper";

const Background = ({ children, theme }) => {
  const { colors } = theme;
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    container: {
      flex: 1,
      padding: 20,
      maxWidth: 600,
      width: "100%",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View
      source={require("../assets/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView
        testID="keyboardAvoidingView"
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

export default withTheme(Background);
