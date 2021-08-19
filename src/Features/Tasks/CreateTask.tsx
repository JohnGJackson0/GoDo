import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./TasksSlice";
import { RootState } from "../../store";
import { withTheme, TextInput, IconButton, Text } from "react-native-paper";
import ListSelector from "../SelectLists/ListSelector";
import { updateActiveCatagory } from "../Lists/ListsSlice";

function CreateTask(props: any) {
  const listData = useSelector((state: RootState) => state.lists);
  const [taskInput, setTaskInput] = useState("");
  const [list, setList] = useState(listData.selectedList);
  const dispatch = useDispatch();
  const [displayListsSelector, setDisplayListsSelector] = useState(false);

  const handleCreatetask = (task: string) => {
    setTaskInput(task);
  };

  const onSelected = (list: any) => {
    setList(list);
    setDisplayListsSelector(false);
  };

  const task = (
    <View
      style={{
        width: "100%",
        backgroundColor: props.theme.colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexGrow: 1, margin: 5 }}>
          <TextInput
            theme={props.theme}
            dense={true}
            placeholder="enter a task"
            onChangeText={handleCreatetask}
            value={taskInput}
          ></TextInput>
        </View>

        <IconButton
          icon="arrow-right-circle-outline"
          color={props.theme.colors.accent}
          {...props}
          size={30}
          onPress={() => {
            dispatch(addTask({ name: taskInput, onList: list }));
            dispatch(updateActiveCatagory(list));
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            margin: "5px",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
          }}
        >
          <IconButton
            icon="view-list-outline"
            color={props.theme.colors.accent}
            {...props}
            size={30}
            onPress={() => {
              setDisplayListsSelector(!displayListsSelector);
            }}
          ></IconButton>

          <Text numberOfLines={2} style={{ color: props.theme.colors.accent }}>
            {list.name}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <>
      {displayListsSelector == true ? (
        <View
          style={{ flex: 1, backgroundColor: props.theme.colors.background }}
        >
          <ScrollView>
            <ListSelector onSelected={onSelected} theme={props.theme} />
          </ScrollView>
          {task}
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            backgroundColor: props.theme.colors.background,
          }}
        >
          {task}
        </View>
      )}
    </>
  );
}

export default withTheme(CreateTask);
