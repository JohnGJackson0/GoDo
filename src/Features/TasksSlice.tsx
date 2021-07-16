import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

export interface Task {
  name: string;
}

export interface TasksState {
  tasks: Array<Task>;
}

const initialState: TasksState = {
  tasks: [],
};

export const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (action.payload == "") {
        showMessage({
          message: "Please enter text in the task input.",
          type: "danger",
        });
      } else if (action.payload.length > 90) {
        showMessage({
          message: "Character limit on tasks are no more than 90.",
          type: "danger",
        });
      } else {
        state.tasks.push(action.payload);
      }
    },
  },
});

export const { addTask } = TasksSlice.actions;

export default TasksSlice.reducer;
