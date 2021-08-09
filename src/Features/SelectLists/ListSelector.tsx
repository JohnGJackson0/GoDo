import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { withTheme, Text } from "react-native-paper";
import { RootState } from "../../store";

const ListItem = (props: any) => {
  return (
    <View style={{ width: "100%", backgroundColor: props.colors.background }}>
      <TouchableOpacity
        onPress={() => {
          props.onSelected(props.list);
        }}
      >
        <Text
          numberOfLines={1}
          style={{ margin: 5, color: props.colors.accent, fontSize: 24 }}
        >
          {props.list.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ListSelector = (props: any) => {
  const listData = useSelector((state: RootState) => state.lists);
  const { colors } = props.theme;

  const renderItem = ({ item }: any) => (
    <ListItem
      list={item}
      onSelected={props.onSelected}
      colors={colors}
      theme={props.theme}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        style={{ flex: 1 }}
        data={listData.lists}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </View>
  );
};

export default withTheme(ListSelector);
