import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Checkbox, Text, IconButton, withTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateChecked, removeTask } from "./TasksSlice";

const Task = (props: any) => {
  const dispatch = useDispatch();
  const { colors } = props.theme;

  const handleChange = () => {
    dispatch(
      updateChecked({ id: props.task.id, checked: !props.task.checked })
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: colors.background,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          handleChange();
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View style={{ justifyContent: "flex-start" }}>
          <Checkbox
            status={props.task.checked ? "checked" : "unchecked"}
            onPress={() => {
              handleChange();
            }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
          {props.task.checked ? (
            <Text
              numberOfLines={1}
              style={{
                margin: 5,
                color: colors.textHighEmpasis,
                textDecorationLine: "line-through",
                fontSize: 24,
              }}
            >
              {props.task.name}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              style={{ margin: 5, color: colors.textHighEmpasis, fontSize: 24 }}
            >
              {props.task.name}
            </Text>
          )}
        </View>
        <View style={{ justifyContent: "flex-end" }}>
          {props.task.checked ? (
            <IconButton
              icon="delete-outline"
              onPress={() => {
                dispatch(removeTask(props.task));
              }}
              color={colors.accent}
              size={20}
            />
          ) : (
            <IconButton
              icon="pencil-outline"
              color={colors.accent}
              onPress={() => {
                props.openEditModal(props.task);
              }}
              size={20}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(Task);
