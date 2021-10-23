import React, { useState, useRef, useEffect } from "react";
import { View, FlatList } from "react-native";
import EditTask from "./EditTask";
import CreateTask from "./CreateTask";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Task from "./Task";
import { Modalize } from "react-native-modalize";
import { withTheme, FAB } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateAppTitle } from "../AppSlice";

function Tasks(props: any) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState("");
  const modalizeRef = useRef<Modalize>(null);

  const selectedList = useSelector(
    (state: RootState) => state.tasks.selectedCatagory
  );
  const { colors } = props.theme;

  const onClose = () => {
    modalizeRef.current?.close();
  };

  useEffect(() => {
    dispatch(updateAppTitle(tasks.selectedCatagory.name));
  }, [tasks.selectedCatagory.name]);

  const renderItem = ({ item }: any) => {
    return <Task key={item.id} task={item} openEditModal={onModifyPressed} />;
  };

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

  const filterTasks = (item: Array<any>) => {
    var value: Array<any> = [];

    for (var i = 0; i < item.length; i++) {
      if (item[i].list.id == selectedList.id || selectedList.id == 0) {
        value.push(item[i]);
      }
    }

    return value;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        right: 0,
        left: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <FlatList
        style={{ flex: 1 }}
        scrollEnabled={true}
        data={filterTasks(tasks.tasks)}
        renderItem={renderItem}
      />

      <FAB
        testID="newTaskFab"
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

      <Modalize
        modalStyle={{ backgroundColor: colors.opactiyBackground }}
        adjustToContentHeight={true}
        ref={modalizeRef}
        overlayStyle={{ backgroundColor: colors.opactiyBackground }}
        withHandle={false}
      >
        {task == "" ? (
          <CreateTask theme={props.theme} onClose={onClose} />
        ) : (
          <EditTask task={task} theme={props.theme} onClose={onClose} />
        )}
      </Modalize>
    </View>
  );
}

export default withTheme(Tasks);
