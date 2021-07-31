import React from "react";
import { Theme } from "../../Theme";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TouchableOpacity } from "react-native";

const ListItem = (props: any) => {
  return (
    <Theme.themedContainer>
      <TouchableOpacity
        onPress={() => {
          props.onSelected(props.list);
        }}
      >
        <Theme.themedTextAccent>{props.list.name}</Theme.themedTextAccent>
      </TouchableOpacity>
    </Theme.themedContainer>
  );
};

const ListSelector = (props: any) => {
  const listData = useSelector((state: RootState) => state.lists);

  const renderItem = ({ item }: any) => (
    <ListItem list={item} onSelected={props.onSelected} />
  );

  return (
    <Theme.themedContainer>
      <Theme.themedFlatList
        data={listData.lists}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
      />
    </Theme.themedContainer>
  );
};

export default ListSelector;
