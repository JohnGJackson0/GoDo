import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateTask, updateTasksInCloud } from "./TasksSlice";
import ListSelector from "../SelectLists/ListSelector";
import { withTheme, TextInput, IconButton, Text } from "react-native-paper";
import { updateActiveCatagory } from "../Lists/ListsSlice";
import { updateAppTitle } from "../AppSlice";

function EditTask(props: any) {
  const [taskInput, setTaskInput] = useState(props.task.name || "");
  const dispatch = useDispatch();
  const [displayListsSelector, setDisplayListsSelector] = useState(false);
  const [list, setList] = useState(props.task.list);

  const handleCreatetask = (task: string) => {
    setTaskInput(task);
  };

  const onSelected = (list: any) => {
    setList(list);
    setDisplayListsSelector(false);
  };

  const editTask = (
    <View
      style={{
        width: "100%",
        backgroundColor: props.theme.colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <TextInput
            theme={props.theme}
            dense={true}
            placeholder="edit a task"
            onChangeText={handleCreatetask}
            value={taskInput}
          ></TextInput>
        </View>

        <IconButton
          icon="arrow-right-circle-outline"
          color={props.theme.colors.accent}
          size={30}
          onPress={() => {
            dispatch(
              updateTask({
                name: taskInput,
                id: props.task.id,
                list: list,
              })
            );
            dispatch(
              updateActiveCatagory({
                name: list.name,
                id: list.id,
                editable: list.editable,
              })
            );
            dispatch(updateAppTitle(list.name));
            dispatch(updateTasksInCloud());
            props.onClose();
          }}
        />
      </View>

      <View
        style={{
          margin: 5,
          justifyContent: "center",
          alignItems: "center",
          width: "20%",
        }}
      >
        <IconButton
          icon="view-list-outline"
          color={props.theme.colors.accent}
          size={30}
          onPress={() => {
            setDisplayListsSelector(!displayListsSelector);
          }}
        />
        <Text numberOfLines={2} style={{ color: props.theme.colors.accent }}>
          {list.name}
        </Text>
      </View>
    </View>
  );
  return (
    <>
      {displayListsSelector == true ? (
        <View
          style={{
            flex: 1,
            backgroundColor: props.theme.colors.background,
          }}
        >
          <ScrollView>
            <ListSelector onSelected={onSelected} theme={props.theme} />
          </ScrollView>
          {editTask}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: props.theme.colors.background,
          }}
        >
          {editTask}
        </View>
      )}
    </>
  );
}

export default withTheme(EditTask);
