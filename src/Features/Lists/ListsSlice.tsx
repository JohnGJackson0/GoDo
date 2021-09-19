import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import firebase from "firebase/app";
import "firebase/firestore";
export interface ListsState {
  lists: Array<{ name: string; id: number; editable: boolean }>;
  count: number;
  selectedList: any;
}

export const updateListsInCloud = createAsyncThunk(
  "ListsSlice/setListsData",
  async (_: void, ThunkAPI: any) => {
    try {
      const userId = ThunkAPI.getState().authentication.userId;
      const lists = ThunkAPI.getState().lists;
      await firebase.firestore().doc(`${userId}/lists`).set(lists);
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: ListsState = {
  selectedList: { name: "All", id: 0, editable: false },
  lists: [
    { name: "All", id: 0, editable: false },
    { name: "Personal", id: 1, editable: true },
    { name: "Professional", id: 2, editable: true },
  ],
  count: 3,
};

export const ListsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    updateActiveCatagory(state, action) {
      if (typeof state.lists[action.payload.id] == undefined) {
        showMessage({
          message: "Catagory doesn't exist, something went wrong.",
          type: "danger",
        });
      } else {
        state.selectedList = action.payload;
      }
    },
    addList: (state, action) => {
      if (state.count >= 15) {
        showMessage({
          message: "Please limit to 15 catagories.",
          type: "danger",
        });
      } else {
        state.lists.push({
          name: action.payload,
          id: state.count,
          editable: true,
        });
        state.count++;
      }
    },
    editList: (state, action) => {
      //todo: edit list
      state.lists.forEach(function (arrayItem, index) {
        if (state.lists[action.payload.id].editable == false) {
          showMessage({
            message: "This catagory is not ediable.",
            type: "danger",
          });
        } else if (action.payload.id == state.lists[index].id) {
          state.lists[index].name = action.payload.name;
        }
      });
    },
    deleteList: (state, action) => {
      state.lists.forEach(function (arrayItem, index) {
        if (action.payload.id == state.lists[index].id) {
          state.lists.splice(index, 1);
          state.count--;
        }
      });
    },
    replaceAllLists: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const { addList, editList, deleteList, updateActiveCatagory, replaceAllLists } =
  ListsSlice.actions;

export default ListsSlice.reducer;
