import React, { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
import { Appbar, Menu, Divider } from "react-native-paper";
import { Theme } from "../../Theme";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import EditList from "../Lists/EditList";
import { removeChecked } from "./TasksSlice";
import { useDispatch } from "react-redux";

const Header = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const navTitle = useSelector((state: RootState) => state.app.navTitle);
  const listData = useSelector((state: RootState) => state.lists);
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState(navTitle);

  useEffect(() => {
    setTitle(navTitle);
  }, [navTitle]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  //todo: on delete remove all tasks or move to all?  and handle the navigation

  const closeMenu = () => setIsVisible(false);
  const dispatch = useDispatch();

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: Theme.primaryBackgroundColor,
        }}
      >
        {props.previous ? (
          <Appbar.BackAction
            onPress={() => {
              props.navigation.goBack();
            }}
            color={Theme.primaryAccentColor}
          />
        ) : (
          <>
            <Appbar.Action
              icon={"apps"}
              color={Theme.primaryAccentColor}
              onPress={() => {
                props.navigation.navigate("Lists");
              }}
            />
            <Appbar.Content title={title} />
            <Menu
              visible={isVisible}
              anchor={
                <Appbar.Action
                  icon={MORE_ICON}
                  color={Theme.primaryAccentColor}
                  onPress={() => {
                    setIsVisible(true);
                  }}
                />
              }
              onDismiss={closeMenu}
            >
              {listData.selectedList.id == 0 ? (
                <>
                  <Menu.Item
                    onPress={() => {
                      dispatch(removeChecked({ id: listData.selectedList.id }));
                    }}
                    title="Remove Checked"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => {
                      props.navigation.navigate("Settings");
                    }}
                    title="Settings"
                  />
                </>
              ) : (
                <>
                  <Menu.Item
                    onPress={() => {
                      onOpen();
                    }}
                    title="Edit List"
                  />
                  <Menu.Item
                    onPress={() => {
                      dispatch(removeChecked({ id: listData.selectedList.id }));
                    }}
                    title="Remove Checked"
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => {
                      props.navigation.navigate("Settings");
                    }}
                    title="Settings"
                  />
                </>
              )}
            </Menu>
          </>
        )}
      </Appbar.Header>

      <Portal>
        <Modalize
          modalStyle={Theme.themedModalStyle}
          adjustToContentHeight={true}
          ref={modalizeRef}
          overlayStyle={Theme.themedModalBackgroundStyle}
          withHandle={false}
        >
          <EditList onClose={onClose} list={listData.selectedList} />
        </Modalize>
      </Portal>
    </>
  );
};

export default Header;
