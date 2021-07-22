import { createSlice, current } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

let nextSessionId = 0;
export interface TasksState {
  tasks: Array<{ name: string; checked: boolean; id: number }>;
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
        state.tasks.push({
          name: action.payload,
          checked: false,
          id: nextSessionId,
        });
      }
      id: nextSessionId++;
    },
    updateTask: (state, action) => {
      state.tasks.forEach(function (arrayItem, index) {
        if (action.payload.id == state.tasks[index].id) {
          state.tasks[index].name = action.payload.name;
        }
      });
    },
    updateChecked: (state, action) => {
      state.tasks.forEach(function (arrayItem, index) {
        if (action.payload.id == state.tasks[index].id) {
          state.tasks[index].checked = action.payload.checked;
        }
      });
    },
    removeTask: (state, action) => {
      state.tasks.forEach(function (arrayItem, index) {
        if (action.payload.id == state.tasks[index].id) {
          state.tasks.splice(index, 1);
        }
      });
    },
  },
});

export const { addTask, removeTask, updateChecked, updateTask } =
  TasksSlice.actions;

export default TasksSlice.reducer;
