import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, withTheme, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { optIn } from "../AuthenticationPortal/AuthenticationSlice";
import firebase from "firebase/app";

const Account = (props: any) => {
  const { colors } = props.theme;
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    text: {
      margin: 5,
    },
    textImportant: {
      margin: 5,
      color: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      {firebase.auth().currentUser == null ? (
        <View>
          <Text style={styles.text}>
            Opt into an account for backup and sync across platforms.
          </Text>
          <Button
            testID="optIn"
            onPress={() => {
              dispatch(optIn());
              props.navigation.reset({
                index: 0,
                routes: [{ name: "AuthLoadingScreen" }],
              });
            }}
          >
            Opt In
          </Button>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Currently logged in</Text>
          <Text style={styles.textImportant}>
            {firebase.auth().currentUser?.displayName}
          </Text>
          <Text style={styles.textImportant}>
            {firebase.auth().currentUser?.email}
          </Text>
          <Button
            testID="logout"
            onPress={async () => {
              props.navigation.reset({
                index: 0,
                routes: [{ name: "AuthLoadingScreen" }],
              });
              await firebase.auth().signOut();
            }}
          >
            Logout
          </Button>
        </View>
      )}
    </View>
  );
};

export default withTheme(Account);
