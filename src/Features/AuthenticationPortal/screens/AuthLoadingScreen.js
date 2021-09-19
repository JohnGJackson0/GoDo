import React from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import "firebase/firestore";
import Background from "../components/Background";
import { theme } from "../core/theme";
import { useSelector } from "react-redux";
import { setUserId } from "../AuthenticationSlice";
import { useDispatch } from "react-redux";
import { replaceAllTasks } from "../../Tasks/TasksSlice";

const AuthLoadingScreen = ({ navigation }) => {
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

      async function loadTasks(userId) {
        const userStoreRef = firebase
          .firestore()
          .collection("user")
          .doc(userId);
        const currentUserDoc = await userStoreRef.get();

        if (currentUserDoc.exists) {
          //pass this to redux
          const data = currentUserDoc.data();
          dispatch(replaceAllTasks(data.tasks));
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

export default AuthLoadingScreen;
