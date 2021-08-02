import React, { useState } from "react";
import { View } from "react-native";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { editList, deleteList } from "./ListsSlice";

const EditList = (props: any) => {
  const [listInput, setListInput] = useState(props.list.name);
  const dispatch = useDispatch();

  const handleListName = (list: string) => {
    setListInput(list);
  };

  return (
    <Theme.themedContainer>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <Theme.themedInput
            placeholder={props.list.name}
            onChangeText={handleListName}
            value={listInput}
          />
        </View>
        <Theme.themedEnter
          onPress={() => {
            dispatch(editList({ id: props.list.id, name: listInput }));
            props.onClose();
          }}
        ></Theme.themedEnter>
      </View>
      <Theme.themedLargeDeleteIcon
        onPress={() => {
          console.log("delete icon clicked");
          dispatch(deleteList({ id: props.list.id }));
          props.onClose();
        }}
      ></Theme.themedLargeDeleteIcon>
    </Theme.themedContainer>
  );
};

export default EditList;
