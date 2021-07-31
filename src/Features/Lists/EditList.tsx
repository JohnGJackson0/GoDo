import React, { useState } from "react";
import { Theme } from "../../Theme";
import { useDispatch } from "react-redux";
import { editList } from "./ListsSlice";

const EditList = (props: any) => {
  const [listInput, setListInput] = useState(props.list.name);
  const dispatch = useDispatch();

  const handleListName = (list: string) => {
    setListInput(list);
  };

  return (
    <Theme.themedContainer>
      <Theme.themedTextHighEmpasis>Edit Catagory</Theme.themedTextHighEmpasis>
      <Theme.themedInput
        placeholder={props.list.name}
        onChangeText={handleListName}
        value={listInput}
      />
      <Theme.themedButton
        onPress={() => {
          dispatch(editList({ id: props.list.id, name: listInput }));
          props.onClose();
        }}
      >
        Edit catagory
      </Theme.themedButton>
    </Theme.themedContainer>
  );
};

export default EditList;
