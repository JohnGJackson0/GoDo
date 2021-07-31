import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { updateTask } from "./TasksSlice";
import ListSelector from "../SelectLists/ListSelector";

export function EditTask(props: any) {
  const [taskInput, setTaskInput] = useState(props.task.name || "");
  const dispatch = useDispatch();
  const [displayListsSelector, setDisplayListsSelector] = useState(false);
  const [selectedList, setSelectedList] = useState(props.task.list);

  const handleCreatetask = (task: string) => {
    setTaskInput(task);
  };

  const onSelected = (list: any) => {
    setSelectedList(list);
    setDisplayListsSelector(false);
  };

  const editTask = (
    <Theme.themedContainer>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <Theme.themedInput
            placeholder="edit a task"
            onChangeText={handleCreatetask}
            value={taskInput}
          ></Theme.themedInput>
        </View>
        <Theme.themedEnter
          onPress={() => {
            dispatch(
              updateTask({
                name: taskInput,
                id: props.task.id,
                list: selectedList,
              })
            );
          }}
        />
      </View>
      {console.log("selected list ", selectedList)}
      <Theme.themedListButton
        onPress={() => {
          setDisplayListsSelector(!displayListsSelector);
        }}
        label={selectedList.name}
      ></Theme.themedListButton>
    </Theme.themedContainer>
  );
  return (
    <>
      {displayListsSelector == true ? (
        <Theme.themedFullScreenContainer>
          <ScrollView>
            <ListSelector onSelected={onSelected} />
          </ScrollView>
          {editTask}
        </Theme.themedFullScreenContainer>
      ) : (
        <Theme.themedContainer>{editTask}</Theme.themedContainer>
      )}
    </>
  );
}
