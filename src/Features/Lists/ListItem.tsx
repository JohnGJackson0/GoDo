import React, { useEffect, useState } from "react";
import { Theme } from "../../Theme";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateActiveCatagory } from "./ListsSlice";

const styles = StyleSheet.create({
  item: {
    backgroundColor: Theme.secondayBackgroundColor,
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / 2, // approximate a square
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

const ListItem = (props: any, { navigation }: any) => {
  const dispatch = useDispatch();

  if (props.list.editable == false) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          dispatch(updateActiveCatagory(props.list));
          props.goBack(props.list.name);
        }}
      >
        <Theme.themedTextHighEmpasis>
          {props.list.name}
        </Theme.themedTextHighEmpasis>
      </TouchableOpacity>
    );
  } else if (props.list.empty) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  } else if (props.list.key == "UIAdd") {
    return (
      <Theme.themedAddIcon
        style={[styles.item, styles.itemAdd]}
        onPress={() => {
          props.onAdd();
        }}
      />
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          dispatch(updateActiveCatagory(props.list));
          props.goBack(props.list.name);
        }}
      >
        <Theme.themedTextHighEmpasis>
          {props.list.name}
        </Theme.themedTextHighEmpasis>
        <View style={styles.editIcon}>
          <Theme.themedEditIcon
            onPress={() => {
              props.onEdit(props.list);
              Theme.changeNavigationBarName(props.list.name);
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
};

export default ListItem;
