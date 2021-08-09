import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView } from "react-native";
import EditTask from "./EditTask";
import CreateTask from "./CreateTask";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Task from "./Task";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { withTheme, FAB, Text } from "react-native-paper";

function Tasks(props: any) {
  const tasks = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState("");
  const modalizeRef = useRef<Modalize>(null);
  const selectedList = useSelector(
    (state: RootState) => state.lists.selectedList
  );
  const { colors } = props.theme;

  useEffect(() => {
    modalizeRef.current?.open();
  }, [task]);

  function renderTaskList() {
    const items: any = [];

    tasks.tasks.map((item: any, pos) => {
      if (item.list.id == selectedList.id || selectedList.id == 0) {
        items.push(
          <Task key={item.id} task={item} openEditModal={onModifyPressed} />
        );
      }
    });

    return items;
  }

  const onOpen = () => {
    if (task == "") {
      modalizeRef.current?.open();
    }
    setTask("");
  };

  const onModifyPressed = (taskToUpdate: any) => {
    if (taskToUpdate == task) {
      modalizeRef.current?.open();
    }
    setTask(taskToUpdate);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <ScrollView>{renderTaskList()}</ScrollView>

        <FAB
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: colors.accent,
          }}
          icon="plus"
          onPress={() => {
            onOpen();
          }}
        />

        <Portal>
          <Modalize
            modalStyle={{ backgroundColor: colors.opactiyBackground }}
            adjustToContentHeight={true}
            ref={modalizeRef}
            overlayStyle={{ backgroundColor: colors.opactiyBackground }}
            withHandle={false}
          >
            {task == "" ? (
              <CreateTask theme={props.theme} />
            ) : (
              <EditTask task={task} theme={props.theme} />
            )}
          </Modalize>
        </Portal>
      </View>
    </View>
  );
}

export default withTheme(Tasks);
