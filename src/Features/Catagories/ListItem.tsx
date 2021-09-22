import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateAppTitle } from "../AppSlice";
import { Surface, withTheme, Text, IconButton } from "react-native-paper";
import { updateActiveCatagory } from "../Tasks/TasksSlice";

const styles = StyleSheet.create({
  item: {
    height: Dimensions.get("window").width / 2 - 6,
    width: Dimensions.get("window").width / 2 - 6,
    margin: 2,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemAdd: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

const ListItem = (props: any) => {
  const dispatch = useDispatch();
  const [taskCount, setTaskCount] = useState(props.taskCount);
  const { colors } = props.theme;

  var height = Dimensions.get("window").width / 2 - 6;
  var width = Dimensions.get("window").width / 2 - 6;

  useEffect(() => {
    setTaskCount(props.taskCount);
  }, [props.taskCount]);

  useEffect(() => {
    height = Dimensions.get("window").width / 2 - 6;
    width = Dimensions.get("window").width / 2 - 6;
    console.log("Changed");
  }, [Dimensions.get("window").width]);

  if (props.list.editable == false) {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(updateActiveCatagory(props.list));
          dispatch(updateAppTitle(props.list.name));
          props.goBack();
        }}
        style={styles.item}
      >
        <Surface style={[{ elevation: 4 }, styles.item]}>
          <Text
            numberOfLines={1}
            style={{ margin: 5, color: colors.accent, fontSize: 24 }}
          >
            {props.list.name}
          </Text>
          <Text
            style={{ margin: 5, color: colors.textMediumEmpasis, fontSize: 24 }}
          >
            {"\n Tasks " + taskCount}
          </Text>
        </Surface>
      </TouchableOpacity>
    );
  } else if (props.list.empty) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  } else if (props.list.key == "UIAdd") {
    return (
      <IconButton
        style={[styles.item, styles.itemAdd]}
        color={colors.accent}
        onPress={() => {
          props.onAdd();
        }}
        icon="plus"
        size={90}
      />
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(updateActiveCatagory(props.list));
          dispatch(updateAppTitle(props.list.name));
          props.goBack();
        }}
        style={styles.item}
      >
        <Surface style={[{ elevation: 4 }, styles.item]}>
          <Text style={{ margin: 5, color: colors.accent, fontSize: 24 }}>
            {props.list.name}
          </Text>
          <Text
            style={{ margin: 5, color: colors.textMediumEmpasis, fontSize: 24 }}
          >
            {"\n Tasks " + props.taskCount}
          </Text>
          <View style={styles.editIcon}>
            <IconButton
              icon="pencil-outline"
              color={colors.accent}
              size={20}
              onPress={() => {
                props.onEdit(props.list);
              }}
            />
          </View>
        </Surface>
      </TouchableOpacity>
    );
  }
};

export default withTheme(ListItem);
