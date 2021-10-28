import React from "react";
import { View, TouchableOpacity } from "react-native";
import { withTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateTheme } from "../AppSlice";
import { DarkTheme, LightTheme } from "../Themes/Themes";

const ThemeCircle = (props: any) => {
  const { colors } = props.theme;
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      testID="circleClick"
      onPress={() => {
        if (props.variant == "dark") {
          dispatch(updateTheme(DarkTheme));
        }

        if (props.variant == "light") {
          dispatch(updateTheme(LightTheme));
        }
      }}
    >
      <View>
        {props.color == colors.background ? (
          <View
            style={{
              backgroundColor: props.color,
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              margin: 5,
              borderColor: colors.backgroundInvert,
              borderWidth: 2,
            }}
          ></View>
        ) : (
          <View
            style={{
              backgroundColor: props.color,
              width: 25,
              height: 25,
              borderRadius: 25 / 2,
              margin: 5,
            }}
          ></View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(ThemeCircle);
