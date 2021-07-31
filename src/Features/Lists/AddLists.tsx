import React, { useState } from "react";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { addList } from "./ListsSlice";

export const AddLists = (props: any) => {
  const [listInput, setListInput] = useState("");
  const dispatch = useDispatch();

  const handleListName = (task: string) => {
    setListInput(task);
  };

  return (
    <Theme.themedContainer>
      <Theme.themedTextHighEmpasis>Add Catagory</Theme.themedTextHighEmpasis>
      <Theme.themedInput
        placeholder="Add a task"
        onChangeText={handleListName}
        value={listInput}
      />
      <Theme.themedButton
        onPress={() => {
          dispatch(addList(listInput));
          props.onClose();
        }}
      >
        Add catagory
      </Theme.themedButton>
    </Theme.themedContainer>
  );
};
