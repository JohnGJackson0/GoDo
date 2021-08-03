import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
export interface TasksState {
  tasks: Array<{ name: string; checked: boolean; id: number; list: any }>;
  lastId: number;
}

const initialState: TasksState = {
  tasks: [],
  lastId: 0,
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
          id: state.lastId + 1,
          list: action.payload.onList,
        });
        state.lastId = state.lastId + 1;
      }
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
    removeAllFromList: (state, action) => {
      for (var i = state.tasks.length - 1; i >= 0; i--) {
        if (action.payload == state.tasks[i].list.id) {
          state.tasks.splice(i, 1);
        }
      }
    },
    moveAllTasksOnListToAll: (state, action) => {
      state.tasks.forEach(function (item, index) {
        if (action.payload.id == state.tasks[index].list.id) {
          state.tasks[index].list.id = 0;
        }
      });
    },
    removeChecked: (state, action) => {
      for (var i = state.tasks.length - 1; i >= 0; i--) {
        if (
          action.payload.id == state.tasks[i].list.id ||
          action.payload.id == 0
        ) {
          if (state.tasks[i].checked) {
            state.tasks.splice(i, 1);
          }
        }
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  updateChecked,
  updateTask,
  removeAllFromList,
  moveAllTasksOnListToAll,
  removeChecked,
} = TasksSlice.actions;

export default TasksSlice.reducer;
