import React, { useState, useRef, useEffect } from "react";
import { Theme } from "../Theme";
import { EditTask } from "./EditTask";
import { CreateTask } from "./CreateTask";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Task from "./Task";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

export function Tasks(props: any) {
  const tasks = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState("");

  useEffect(() => {
    modalizeRef.current?.open();
  }, [task]);

  function renderTaskList() {
    const items: any = [];

    tasks.tasks.map((item: any, pos) => {
      items.push(
        <Task key={item.id} task={item} openEditModal={onModifyPressed}></Task>
      );
    });

    return items;
  }

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    setTask("");
    modalizeRef.current?.open();
  };

  const onModifyPressed = (taskToUpdate: any) => {
    if (taskToUpdate == task) {
      modalizeRef.current?.open();
    }
    setTask(taskToUpdate);
  };

  return (
    <Theme.themedFullScreenContainer>
      {renderTaskList()}

      <Theme.themedExtendedFab
        title="Add"
        placement="right"
        onPress={() => {
          onOpen();
        }}
      />

      <Portal>
        <Modalize
          modalStyle={Theme.themedModalStyle}
          adjustToContentHeight={true}
          ref={modalizeRef}
        >
          {task == "" ? <CreateTask /> : <EditTask task={task} />}
        </Modalize>
      </Portal>
    </Theme.themedFullScreenContainer>
  );
}
