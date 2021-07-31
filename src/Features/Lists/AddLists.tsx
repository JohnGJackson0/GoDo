import React, { useState } from "react";
import { View } from "react-native";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { addList } from "./ListsSlice";

export const AddLists = (props: any) => {
  const [listInput, setListInput] = useState("");
  const dispatch = useDispatch();

  const handleListName = (task: string) => {
    setListInput(task);
  };

  return (
    <Theme.themedContainer>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <Theme.themedInput
            placeholder="Add a catagory"
            onChangeText={handleListName}
            value={listInput}
          />
        </View>
        <Theme.themedEnter
          onPress={() => {
            dispatch(addList(listInput));
            props.onClose();
          }}
        />
      </View>
    </Theme.themedContainer>
  );
};
