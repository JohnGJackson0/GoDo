import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import {
  moveAllTasksOnListToAll,
  removeAllFromList,
  updateTasksInCloud,
  editCatagory,
  deleteCatagory,
  updateActiveCatagory,
} from "../Tasks/TasksSlice";
import { Portal } from "react-native-portalize";
import { updateAppTitle } from "../AppSlice";
import { TextInput, IconButton, Modal, Text, Button } from "react-native-paper";

const EditList = (props: any) => {
  const [listInput, setListInput] = useState(props.list.name);
  const dispatch = useDispatch();
  const [isDeleteOverlayVisible, setIsDeleteOverlayVisible] = useState(false);

  const handleListName = (list: string) => {
    setListInput(list);
  };

  return (
    <View
      style={{ width: "100%", backgroundColor: props.theme.colors.background }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <View style={{ margin: 5 }}>
            <TextInput
              theme={props.theme}
              placeholder={props.list.name}
              onChangeText={handleListName}
              value={listInput}
              dense={true}
            ></TextInput>
          </View>
        </View>
        <IconButton
          testID="submit"
          icon="arrow-right-circle-outline"
          color={props.theme.colors.accent}
          onPress={() => {
            dispatch(editCatagory({ id: props.list.id, name: listInput }));
            dispatch(updateTasksInCloud());
            props.onClose();
          }}
          size={30}
        />
      </View>
      <IconButton
        testID="delete"
        icon="delete-outline"
        color={props.theme.colors.accent}
        onPress={() => {
          setIsDeleteOverlayVisible(true);
        }}
        size={30}
      />

      <Portal>
        <Modal
          visible={isDeleteOverlayVisible}
          onDismiss={() => {
            setIsDeleteOverlayVisible(false);
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: props.theme.colors.background,
            }}
          >
            <Text
              numberOfLines={4}
              style={{
                margin: 5,
                color: props.theme.colors.textHighEmpasis,
                fontSize: 24,
              }}
            >
              Would you like to remove all tasks on the list, or move them to
              'all?'
            </Text>

            <View style={{ margin: 5 }}>
              <Button
                testID="removeAll"
                onPress={() => {
                  dispatch(deleteCatagory({ id: props.list.id }));
                  dispatch(removeAllFromList(props.list.id));
                  props.onClose();
                  dispatch(
                    updateActiveCatagory({
                      name: "All",
                      id: 0,
                      editable: false,
                    })
                  );
                  dispatch(updateTasksInCloud());
                }}
                mode="contained"
                dark={props.theme.colors}
                color={props.theme.colors.accent}
              >
                Remove all
              </Button>
            </View>
            <View style={{ margin: 5 }}>
              <Button
                testID="keepTasks"
                mode="contained"
                dark={props.theme.colors}
                color={props.theme.colors.accent}
                onPress={() => {
                  dispatch(deleteCatagory({ id: props.list.id }));
                  dispatch(moveAllTasksOnListToAll({ id: props.list.id }));
                  props.onClose();
                  dispatch(
                    updateActiveCatagory({
                      name: "All",
                      id: 0,
                      editable: false,
                    })
                  );
                  dispatch(updateAppTitle("All"));
                  dispatch(updateTasksInCloud());
                }}
              >
                Keep tasks, move them to 'All'
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default EditList;
