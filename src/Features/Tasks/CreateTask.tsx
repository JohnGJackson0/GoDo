import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { addTask } from "./TasksSlice";
import ListSelector from "../SelectLists/ListSelector";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function CreateTask(props: any) {
  const listData = useSelector((state: RootState) => state.lists);
  const [taskInput, setTaskInput] = useState("");
  const [list, setList] = useState(listData.selectedList);
  const dispatch = useDispatch();
  const [displayListsSelector, setDisplayListsSelector] = useState(false);

  useEffect(() => {
    setList(listData.selectedList);
  }, [listData.selectedList]);

  const handleCreatetask = (task: string) => {
    setTaskInput(task);
  };

  const onSelected = (list: any) => {
    setList(list);
    setDisplayListsSelector(false);
  };

  const task = (
    <Theme.themedContainer>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <Theme.themedInput
            placeholder="enter a task"
            onChangeText={handleCreatetask}
            value={taskInput}
          ></Theme.themedInput>
        </View>

        <Theme.themedEnter
          onPress={() => {
            dispatch(addTask({ name: taskInput, onList: list }));
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Theme.themedListButton
          onPress={() => {
            setDisplayListsSelector(!displayListsSelector);
          }}
          label={list.name}
        ></Theme.themedListButton>
      </View>
    </Theme.themedContainer>
  );
  return (
    <>
      {displayListsSelector == true ? (
        <Theme.themedFullScreenContainer>
          <ScrollView>
            <ListSelector onSelected={onSelected} />
          </ScrollView>
          {task}
        </Theme.themedFullScreenContainer>
      ) : (
        <Theme.themedContainer>{task}</Theme.themedContainer>
      )}
    </>
  );
}
