import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export const Catagory = (props: any) => {
  return (
    <View
      style={{ width: "100%", backgroundColor: props.theme.colors.background }}
    >
      <TouchableOpacity
        onPress={() => {
          props.onSelected(props.list);
        }}
      >
        <Text
          numberOfLines={1}
          style={{ margin: 5, color: props.theme.colors.accent, fontSize: 24 }}
        >
          {props.list.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
