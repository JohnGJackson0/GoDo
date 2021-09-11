import React from "react";
import { StyleSheet } from "react-native";
import { Text, withTheme } from "react-native-paper";

const Paragraph = (props) => {
  const { colors } = props.theme;
  return (
    <Text
      style={{
        margin: 5,
        color: colors.textHighEmpasis,
        fontSize: 15,
        lineHeight: 21,
        textAlign: "center",
        marginBottom: 12,
      }}
      {...props}
    />
  );
};

export default withTheme(Paragraph);
