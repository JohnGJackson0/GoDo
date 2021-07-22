import React from "react";
import { Theme } from "../Theme";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateChecked, removeTask } from "./TasksSlice";

const Task = (props: any) => {
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateChecked({ id: props.task.id, checked: event.target.checked })
    );
  };

  return (
    <Theme.themedContainer>
      <View
        style={{
          flexDirection: "row",
          paddingEnd: "10px",
          paddingStart: "10px",
        }}
      >
        <TouchableOpacity style={{ width: "80%" }}>
          {props.task.checked ? (
            <Theme.themedCheckbox
              label={
                <Theme.themedTextHighEmpasisStrikeThrough>
                  {props.task.name}
                </Theme.themedTextHighEmpasisStrikeThrough>
              }
              onChange={handleChange}
              checked={props.task.checked}
            />
          ) : (
            <Theme.themedCheckbox
              label={
                <Theme.themedTextHighEmpasis>
                  {props.task.name}
                </Theme.themedTextHighEmpasis>
              }
              onChange={handleChange}
              checked={props.task.checked}
            />
          )}
        </TouchableOpacity>
        <View style={{ width: "20%", justifyContent: "center" }}>
          {props.task.checked ? (
            <Theme.themedVariantButton
              onClick={() => {
                dispatch(removeTask(props.task));
              }}
            >
              <Theme.themedDeleteIcon />
            </Theme.themedVariantButton>
          ) : (
            <Theme.themedVariantButton
              onClick={() => {
                props.openEditModal(props.task);
              }}
            >
              <Theme.themedEditIcon />
            </Theme.themedVariantButton>
          )}
        </View>
      </View>
    </Theme.themedContainer>
  );
};

export default Task;
