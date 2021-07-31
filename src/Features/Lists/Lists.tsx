import React, { useRef, useState, useEffect } from "react";
import ListItem from "./ListItem";
import { Theme } from "../../Theme";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Modalize } from "react-native-modalize";
import { AddLists } from "./AddLists";
import EditList from "./EditList";
import { Portal } from "react-native-portalize";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { updateAppTitle } from "../AppSlice";

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

export function Lists(props: any) {
  const [list, setList] = useState("");
  const listData = useSelector((state: RootState) => state.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    modalizeRef.current?.open();
  }, [list]);

  const renderItem = ({ item, index }: any) => {
    return (
      <ListItem
        key={item.id}
        list={item}
        onAdd={onAdd}
        onEdit={onEdit}
        goBack={goBack}
      ></ListItem>
    );
  };
  const modalizeRef = useRef<Modalize>(null);

  const onAdd = () => {
    setList("");
    modalizeRef.current?.open();
  };

  const onEdit = (listToUpdate: any) => {
    if (listToUpdate == list) {
      modalizeRef.current?.open();
    }
    setList(listToUpdate);
  };

  const goBack = (name: string) => {
    dispatch(updateAppTitle(name));
    props.navigation.goBack();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  return (
    <Theme.themedFullScreenContainer>
      <View
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <Theme.themedFlatList
          data={formatData(listData.lists, 2)}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
      <Portal>
        <Modalize
          modalStyle={Theme.themedModalStyle}
          adjustToContentHeight={true}
          ref={modalizeRef}
          overlayStyle={Theme.themedModalBackgroundStyle}
          withHandle={false}
        >
          {list == "" ? (
            <AddLists onClose={onClose} />
          ) : (
            <EditList onClose={onClose} list={list} />
          )}
        </Modalize>
      </Portal>
    </Theme.themedFullScreenContainer>
  );
}

export default Lists;
