import React, { useState, useRef, useEffect } from "react";
import { Platform } from "react-native";
import { Appbar, Menu, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import EditList from "../Lists/EditList";
import { removeChecked } from "./TasksSlice";
import { useDispatch } from "react-redux";
import { withTheme } from "react-native-paper";
import { updateAppTitle } from "../AppSlice";

const Header = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const navTitle = useSelector((state: RootState) => state.app.navTitle);
  const listData = useSelector((state: RootState) => state.lists);
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState(navTitle);
  const dispatch = useDispatch();
  const { colors } = props.theme;

  useEffect(() => {
    setTitle(navTitle);
  }, [navTitle]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const closeMenu = () => setIsVisible(false);

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: colors.background,
        }}
      >
        {props.previous ? (
          <>
            <Appbar.BackAction
              onPress={() => {
                dispatch(updateAppTitle(listData.selectedList.name));
                props.navigation.goBack();
              }}
              color={colors.accent}
            />
            <Appbar.Content title={title} color={colors.text} />
          </>
        ) : (
          <>
            <Appbar.Action
              icon={"apps"}
              color={colors.accent}
              onPress={() => {
                props.navigation.navigate("Lists");
                dispatch(updateAppTitle("Select List"));
              }}
            />
            <Appbar.Content title={title} color={colors.text} />
            <Menu
              visible={isVisible}
              anchor={
                <Appbar.Action
                  icon={MORE_ICON}
                  color={colors.accent}
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
                      dispatch(updateAppTitle("Settings"));
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
                      dispatch(updateAppTitle("Settings"));
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
          modalStyle={{ backgroundColor: colors.opactiyBackground }}
          adjustToContentHeight={true}
          ref={modalizeRef}
          overlayStyle={{ backgroundColor: colors.opactiyBackground }}
          withHandle={false}
        >
          <EditList
            onClose={onClose}
            list={listData.selectedList}
            theme={props.theme}
          />
        </Modalize>
      </Portal>
    </>
  );
};

export default withTheme(Header);
