import React from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Background from "../components/Background";
import { useSelector } from "react-redux";
import { setUserId } from "../AuthenticationSlice";
import { useDispatch } from "react-redux";
import {
  replaceAllTasks,
  updateActiveCatagory,
  replaceAllLists,
} from "../../Tasks/TasksSlice";
import { updateAppTitle } from "../../AppSlice";
import { withTheme } from "react-native-paper";

const AuthLoadingScreen = ({ navigation, theme }) => {
  const authentication = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUserId(user.uid));
      loadTasks(user.uid);
      loadLists(user.uid);
      navigation.reset({
        index: 0,
        routes: [{ name: "Tasks" }],
      });
      dispatch(updateAppTitle("All"));
      dispatch(
        updateActiveCatagory({
          name: "All",
          id: 0,
          editable: false,
        })
      );

      async function loadTasks(userId) {
        const userTasksRef = firebase
          .firestore()
          .collection(userId)
          .doc("tasks");

        const tasksDoc = await userTasksRef.get();

        if (tasksDoc.exists) {
          //pass this to redux
          const data = tasksDoc.data();
          dispatch(replaceAllTasks(data.tasks));
        }
      }

      async function loadLists(userId) {
        const userListsRef = firebase
          .firestore()
          .collection(userId)
          .doc("lists");

        const listsDoc = await userListsRef.get();

        if (userListsRef.exists) {
          //pass this to redux
          const data = listsDoc.data();
          dispatch(replaceAllLists(data.lists));
        }
      }
    } else if (authentication.hasOptedOut) {
      dispatch(setUserId(""));
      navigation.reset({
        index: 0,
        routes: [{ name: "Tasks" }],
      });
    } else {
      dispatch(setUserId(""));
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
};

export default withTheme(AuthLoadingScreen);
