import React, { useRef } from "react";
import { Theme } from "../Theme";
import { Modalize } from "react-native-modalize";
import { CreateTask } from "./CreateTask";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Task from "./Task";

export function Tasks(props: any) {
  const modalizeRef = useRef<Modalize>(null);
  const tasks = useSelector((state: RootState) => state.tasks);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  function renderTaskList() {
    const items: any = [];

    tasks.tasks.map((item: any, pos) => {
      items.push(<Task key={pos} task={item}></Task>);
    });

    return items;
  }

  return (
    <Theme.themedFullScreenContainer>
      {renderTaskList()}
      <Theme.themedExtendedFab title="Add" placement="right" onPress={onOpen} />
      <Modalize
        modalStyle={Theme.themedModalStyle}
        adjustToContentHeight={true}
        ref={modalizeRef}
      >
        <CreateTask />
      </Modalize>
    </Theme.themedFullScreenContainer>
  );
}
