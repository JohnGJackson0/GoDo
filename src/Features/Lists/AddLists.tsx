import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { addList } from "./ListsSlice";
import { withTheme, TextInput, IconButton } from "react-native-paper";

const AddLists = (props: any) => {
  const { colors } = props.theme;
  const [listInput, setListInput] = useState("");
  const dispatch = useDispatch();

  const handleListName = (task: string) => {
    setListInput(task);
  };

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1, margin: 5 }}>
          <TextInput
            theme={props.theme}
            dense={true}
            placeholder="Add a catagory"
            onChangeText={handleListName}
            value={listInput}
          ></TextInput>
        </View>

        <IconButton
          icon="arrow-right-circle-outline"
          color={colors.accent}
          size={30}
          onPress={() => {
            dispatch(addList(listInput));
            props.onClose();
          }}
        />
      </View>
    </View>
  );
};
export default withTheme(AddLists);
