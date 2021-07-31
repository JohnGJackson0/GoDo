import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";

export interface ListsState {
  lists: Array<{ name: string; id: number; editable: boolean }>;
  count: number;
  selectedList: any;
}

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
      //TODO: fix

      if (typeof state.lists[action.payload.id] == undefined) {
        showMessage({
          message: "Catagory doesn't exist, something went wrong.",
          type: "danger",
        });
      } else {
        console.log("selected list ", action.payload);
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
  },
});

export const { addList, editList, updateActiveCatagory } = ListsSlice.actions;

export default ListsSlice.reducer;
