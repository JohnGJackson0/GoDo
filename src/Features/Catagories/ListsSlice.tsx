import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import firebase from "firebase/app";
import "firebase/firestore";
export interface ListsState {
  catagory: Array<{ name: string; id: number; editable: boolean }>;
  catagoryCount: number;
  selectedCatagory: any;
}

const initialState: ListsState = {
  selectedCatagory: { name: "All", id: 0, editable: false },
  catagory: [
    { name: "All", id: 0, editable: false },
    { name: "Personal", id: 1, editable: true },
    { name: "Professional", id: 2, editable: true },
  ],
  catagoryCount: 3,
};

export const ListsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
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
    addList: (state, action) => {
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
    editList: (state, action) => {
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
    deleteList: (state, action) => {
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
  },
});

export const {
  addList,
  editList,
  deleteList,
  updateActiveCatagory,
  replaceAllLists,
} = ListsSlice.actions;

export default ListsSlice.reducer;
