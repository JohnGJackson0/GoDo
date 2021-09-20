import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { withTheme } from "react-native-paper";

const TextInput = ({ theme, errorText, description, ...props }) => {
  const { colors } = theme;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: 12,
    },
    input: {
      backgroundColor: colors.surface,
    },
    description: {
      fontSize: 13,
      color: colors.secondary,
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: colors.error,
      paddingTop: 8,
    },
  });
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default withTheme(TextInput);
