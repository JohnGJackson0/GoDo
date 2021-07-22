import React, { useState, useEffect } from "react";
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
        value={taskInput}
      ></Theme.themedInput>
      <Theme.themedButton
        onClick={() => {
          dispatch(addTask(taskInput));
        }}
      >
        Add a Task
      </Theme.themedButton>
    </Theme.themedContainer>
  );
}
