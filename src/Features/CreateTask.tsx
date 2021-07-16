import React, { useState } from "react";
import { Theme } from "../Theme";
import { useDispatch } from "react-redux";
import { addTask } from "./TasksSlice";

export function CreateTask(props: any) {
  const [taskInput, setTaskInput] = useState("");

  const dispatch = useDispatch();

  const handleCreatetask = (task: string) => {
    setTaskInput(task);
  };

  return (
    <Theme.themedContainer>
      <Theme.themedTextHighEmpasis>Create a Task</Theme.themedTextHighEmpasis>
      <Theme.themedInput
        placeholder="enter a task"
        onChangeText={handleCreatetask}
      ></Theme.themedInput>
      <Theme.themedButton
        title="Add a Task"
        onPress={() => {
          dispatch(addTask(taskInput));
        }}
      ></Theme.themedButton>
    </Theme.themedContainer>
  );
}
