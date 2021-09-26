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
  merge,
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
        const userListsRef = firebase
          .firestore()
          .collection(userId)
          .doc("catagories");

        const tasksDoc = await userTasksRef.get();
        const catagoriesDoc = await userListsRef.get();

        if (tasksDoc.exists) {
          //pass this to redux
          const data = tasksDoc.data();
          dispatch(replaceAllTasks(data.tasks));
        }

        if (catagoriesDoc.exists || tasksDoc.exists) {
          const catagoriesData = catagoriesDoc.data();
          const tasksData = tasksDoc.data();

          dispatch(merge({ tasks: tasksData, catagories: catagoriesData }));
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
