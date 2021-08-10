import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { withTheme, Text } from "react-native-paper";
import { RootState } from "../../store";
import { Catagory } from "./Catagory";

const ListSelector = (props: any) => {
  const listData = useSelector((state: RootState) => state.lists);
  const { colors } = props.theme;
  console.log(props.theme);

  const renderItem = ({ item }: any) => (
    <Catagory list={item} onSelected={props.onSelected} theme={props.theme} />
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

export default ListSelector;
