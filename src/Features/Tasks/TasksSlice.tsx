import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

let nextSessionId = 0;
export interface TasksState {
  tasks: Array<{ name: string; checked: boolean; id: number; list: any }>;
}

const initialState: TasksState = {
  tasks: [],
};

export const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (action.payload.name == "") {
        showMessage({
          message: "Please enter text in the task input.",
          type: "danger",
        });
      } else if (action.payload.name.length > 90) {
        showMessage({
          message: "Character limit on tasks are no more than 90.",
          type: "danger",
        });
      } else {
        state.tasks.push({
          name: action.payload.name,
          checked: false,
          id: nextSessionId,
          list: action.payload.onList,
        });
      }
      id: nextSessionId++;
    },
    updateTask: (state, action) => {
      state.tasks.forEach(function (arrayItem, index) {
        if (action.payload.id == state.tasks[index].id) {
          state.tasks[index].name = action.payload.name;
          state.tasks[index].list = action.payload.list;
          console.log("updated list ", state.tasks[index].list);
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
