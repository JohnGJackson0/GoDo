import React from "react";
import { Theme } from "../Theme";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateChecked, removeTask } from "./TasksSlice";
import { Checkbox } from "react-native-paper";

const Task = (props: any) => {
  const dispatch = useDispatch();

  const handleChange = () => {
    console.log("sajdhaskj");
    dispatch(
      updateChecked({ id: props.task.id, checked: !props.task.checked })
    );
  };

  return (
    <Theme.themedContainerRow>
      <TouchableOpacity
        onPress={() => {
          handleChange();
        }}
        style={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {props.task.checked ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Theme.ThemedCheckbox
              status={props.task.checked ? "checked" : "unchecked"}
              onPress={() => {
                handleChange();
              }}
            />
            <Theme.themedTextHighEmpasisStrikeThrough>
              {props.task.name}
            </Theme.themedTextHighEmpasisStrikeThrough>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Theme.ThemedCheckbox
              status={props.task.checked ? "checked" : "unchecked"}
              onPress={() => {
                handleChange();
              }}
            />
            <Theme.themedTextHighEmpasis>
              {props.task.name}
            </Theme.themedTextHighEmpasis>
          </View>
        )}
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        {props.task.checked ? (
          <Theme.themedVariantButton
            onPress={() => {
              dispatch(removeTask(props.task));
            }}
          >
            <Theme.themedDeleteIcon />
          </Theme.themedVariantButton>
        ) : (
          <Theme.themedVariantButton
            onPress={() => {
              props.openEditModal(props.task);
            }}
          >
            <Theme.themedEditIcon />
          </Theme.themedVariantButton>
        )}
      </View>
    </Theme.themedContainerRow>
  );
};

export default Task;
