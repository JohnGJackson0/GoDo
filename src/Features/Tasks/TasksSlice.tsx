import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import firebase from "firebase/app";
import "firebase/firestore";
export interface TasksState {
  tasks: Array<{ name: string; checked: boolean; id: number; list: any }>;
  uniqueTaskId: number;
  catagory: Array<{ name: string; id: number; editable: boolean }>;
  //this part should really be tested
  catagoryCount: number;
  selectedCatagory: { name: string; id: number; editable: boolean };
}

const initialState: TasksState = {
  tasks: [],
  uniqueTaskId: 0,
  selectedCatagory: { name: "All", id: 0, editable: false },
  catagory: [
    { name: "All", id: 0, editable: false },
    { name: "Personal", id: 1, editable: true },
    { name: "Professional", id: 2, editable: true },
  ],
  catagoryCount: 3,
};

export const updateTasksInCloud = createAsyncThunk(
  "TasksSlice/setTasksData",
  async (_: void, ThunkAPI: any) => {
    try {
      const userId = ThunkAPI.getState().authentication.userId;
      const tasks = ThunkAPI.getState().tasks; /*The whole task state*/
      await firebase.firestore().doc(`${userId}/tasks`).set(tasks);
    } catch (e) {
      return ThunkAPI.rejectWithValue(e);
    }
  }
);

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
        state.uniqueTaskId = state.uniqueTaskId + 1;
        state.tasks.push({
          name: action.payload.name,
          id: state.uniqueTaskId,
          checked: false,
          list: action.payload.onList,
        });
      }
    },
    updateTask: (state, action) => {
      state.tasks.forEach(function (arrayItem, index) {
        if (action.payload.id == state.tasks[index].id) {
          state.tasks[index].name = action.payload.name;
          state.tasks[index].list = action.payload.list;
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
          // state.uniqueTaskId do not decrement, you don't always remove last id
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
    //catagories
    updateActiveCatagory(state, action) {
      if (typeof state.catagory[action.payload.id] == undefined) {
        showMessage({
          message: "Catagory doesn't exist, something went wrong.",
          type: "danger",
        });
      } else {
        state.selectedCatagory = action.payload;
      }
    },
    addCatagory: (state, action) => {
      if (state.catagoryCount >= 15) {
        showMessage({
          message: "Please limit to 15 catagories.",
          type: "danger",
        });
      } else {
        state.catagory.push({
          name: action.payload,
          id: state.catagoryCount,
          editable: true,
        });
        state.catagoryCount++;
      }
    },
    editCatagory: (state, action) => {
      //todo: edit list
      state.catagory.forEach(function (arrayItem, index) {
        if (state.catagory[action.payload.id].editable == false) {
          showMessage({
            message: "This catagory is not ediable.",
            type: "danger",
          });
        } else if (action.payload.id == state.catagory[index].id) {
          state.catagory[index].name = action.payload.name;
        }
      });
    },
    deleteCatagory: (state, action) => {
      state.catagory.forEach(function (arrayItem, index) {
        if (action.payload.id == state.catagory[index].id) {
          state.catagory.splice(index, 1);
          state.catagoryCount--;
        }
      });
    },
    replaceAllLists: (state, action) => {
      state.catagory = action.payload;
    },
    reloadState: (state, action) => {
      state.tasks = action.payload.tasks;
      state.catagory = action.payload.catagory;
      state.catagoryCount = action.payload.catagoryCount;
      state.selectedCatagory = { id: 0, name: "All", editable: false };

      console.log("the payload", action.payload);
      console.log("the state", state.tasks);
    },
  },
});

export const {
  //task
  addTask,
  removeTask,
  updateChecked,
  updateTask,
  removeAllFromList,
  moveAllTasksOnListToAll,
  removeChecked,
  //catagory
  addCatagory,
  editCatagory,
  deleteCatagory,
  updateActiveCatagory,
  //both
  replaceAllLists,
  reloadState,
} = TasksSlice.actions;

export default TasksSlice.reducer;
