import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { withTheme, TextInput, IconButton } from "react-native-paper";
import { addCatagory, updateTasksInCloud } from "../Tasks/TasksSlice";

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
            dispatch(addCatagory(listInput));
            dispatch(updateTasksInCloud());
            props.onClose();
          }}
        />
      </View>
    </View>
  );
};
export default withTheme(AddLists);
