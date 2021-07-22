import React, { useState } from "react";
import { Theme } from "../Theme";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "./TasksSlice";

export function EditTask(props: any) {
  const [taskInput, setTaskInput] = useState(props.task.name || "");
  const dispatch = useDispatch();

  const handleCreatetask = (task: string) => {
    setTaskInput(task);
  };

  return (
    <Theme.themedContainer>
      <Theme.themedTextHighEmpasis>Edit a Task</Theme.themedTextHighEmpasis>
      <Theme.themedInput
        placeholder="enter a task"
        onChangeText={handleCreatetask}
        value={taskInput}
      ></Theme.themedInput>
      {props.taskId !== -1 ? (
        <Theme.themedButton
          onClick={() => {
            dispatch(updateTask({ name: taskInput, id: props.task.id }));
          }}
        >
          Update Task
        </Theme.themedButton>
      ) : (
        <Theme.themedButton
          onClick={() => {
            dispatch(addTask(taskInput));
          }}
        >
          Add a Task
        </Theme.themedButton>
      )}
    </Theme.themedContainer>
  );
}
