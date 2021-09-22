import React, { useRef, useState, useEffect } from "react";
import ListItem from "./ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Modalize } from "react-native-modalize";
import AddLists from "./AddLists";
import EditList from "./EditList";
import { Portal } from "react-native-portalize";
import { View, FlatList } from "react-native";
import { withTheme } from "react-native-paper";

const formatData = (data: Array<any>, numColumns: number) => {
  var value = [...data];

  value.push({ key: "UIAdd" });

  const numberOfFullRows = Math.floor(value.length / numColumns);

  let numberOfElementsLastRow = value.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    value.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return value;
};

function Lists(props: any) {
  const [list, setList] = useState("");
  const taskData = useSelector((state: RootState) => state.tasks);
  const { colors } = props.theme;

  useEffect(() => {
    modalizeRef.current?.open();
  }, [list]);

  const getTaskCount = (id: number) => {
    var result: number = 0;

    taskData.tasks.forEach(function (item, index) {
      if (id == 0) {
        result++;
      } else if (id == item.list.id) {
        result++;
      }
    });
    return result;
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <ListItem
        key={item.id}
        list={item}
        taskCount={getTaskCount(item.id)}
        onAdd={onAdd}
        onEdit={onEdit}
        goBack={goBack}
        theme={props.theme}
      ></ListItem>
    );
  };
  const modalizeRef = useRef<Modalize>(null);

  const onAdd = () => {
    setList("");
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const onEdit = (listToUpdate: any) => {
    if (listToUpdate == list) {
      modalizeRef.current?.open();
    }
    setList(listToUpdate);
  };

  const goBack = () => {
    props.navigation.goBack();
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
        <FlatList
          data={formatData(taskData.catagory, 2)}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      <Portal>
        <Modalize
          modalStyle={{ backgroundColor: colors.opactiyBackground }}
          adjustToContentHeight={true}
          ref={modalizeRef}
          overlayStyle={{ backgroundColor: colors.opactiyBackground }}
          withHandle={false}
        >
          {list == "" ? (
            <AddLists onClose={onClose} theme={props.theme} />
          ) : (
            <EditList onClose={onClose} list={list} theme={props.theme} />
          )}
        </Modalize>
      </Portal>
    </View>
  );
}

export default withTheme(Lists);
