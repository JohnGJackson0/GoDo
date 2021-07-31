import React from "react";
import { Theme } from "../../Theme";
import { TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateChecked, removeTask } from "./TasksSlice";

const Task = (props: any) => {
  const dispatch = useDispatch();

  const handleChange = () => {
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
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "15%" }}>
          <Theme.ThemedCheckbox
            status={props.task.checked ? "checked" : "unchecked"}
            onPress={() => {
              handleChange();
            }}
          />
        </View>
        <View style={{ width: "70%" }}>
          {props.task.checked ? (
            <Theme.themedTextHighEmpasisStrikeThrough>
              {props.task.name}
            </Theme.themedTextHighEmpasisStrikeThrough>
          ) : (
            <Theme.themedTextHighEmpasis>
              {props.task.name}
            </Theme.themedTextHighEmpasis>
          )}
        </View>
        <View style={{ width: "15%" }}>
          {props.task.checked ? (
            <Theme.themedDeleteIcon
              onPress={() => {
                dispatch(removeTask(props.task));
              }}
            ></Theme.themedDeleteIcon>
          ) : (
            <Theme.themedEditIcon
              onPress={() => {
                props.openEditModal(props.task);
              }}
            ></Theme.themedEditIcon>
          )}
        </View>
      </TouchableOpacity>
    </Theme.themedContainerRow>
  );
};

export default Task;
