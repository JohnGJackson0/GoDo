import React, { useState } from "react";
import { View } from "react-native";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { editList, deleteList, updateActiveCatagory } from "./ListsSlice";
import {
  moveAllTasksOnListToAll,
  removeAllFromList,
} from "../Tasks/TasksSlice";
import { Portal } from "react-native-portalize";
import { updateAppTitle } from "../AppSlice";

const EditList = (props: any) => {
  const [listInput, setListInput] = useState(props.list.name);
  const dispatch = useDispatch();
  const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState(false);

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
          setIsDeleteOverlayVisible(true);
          //props.onClose();
        }}
      ></Theme.themedLargeDeleteIcon>

      <Portal>
        <Theme.themedOverlay
          visible={isDeleteOverlayVisible}
          onDismiss={() => {
            setIsDeleteOverlayVisible(false);
          }}
        >
          <Theme.themedTextHighEmpasisMultiLine>
            Would you like to remove all tasks on the list, or move them to
            'all?'
          </Theme.themedTextHighEmpasisMultiLine>

          <Theme.themedButton
            onPress={() => {
              dispatch(deleteList({ id: props.list.id }));
              dispatch(removeAllFromList(props.list.id));
              props.onClose();
              dispatch(updateActiveCatagory({ id: 0 }));
              dispatch(updateAppTitle("All"));
            }}
          >
            Remove all
          </Theme.themedButton>

          <Theme.themedButton
            onPress={() => {
              dispatch(deleteList({ id: props.list.id }));
              dispatch(moveAllTasksOnListToAll({ id: props.list.id }));
              props.onClose();
              dispatch(updateActiveCatagory({ id: 0 }));
              dispatch(updateAppTitle("All"));
            }}
          >
            Keep tasks, move them to 'All'
          </Theme.themedButton>
        </Theme.themedOverlay>
      </Portal>
    </Theme.themedContainer>
  );
};

export default EditList;
