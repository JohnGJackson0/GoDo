import React from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { withTheme } from "react-native-paper";

const Toast = ({ theme, type = "error", message, onDismiss }) => {
  const { colors } = theme;

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 80 + getStatusBarHeight(),
      width: "100%",
    },
    content: {
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={3000}
        onDismiss={onDismiss}
        style={{
          backgroundColor: type === "error" ? colors.error : colors.success,
        }}
      >
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  );
};

export default withTheme(Toast);
