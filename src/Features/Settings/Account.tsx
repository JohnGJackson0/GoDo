import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Text, withTheme, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { optIn } from "../AuthenticationPortal/AuthenticationSlice";
import { logoutUser } from "../AuthenticationPortal/api/auth-api";

const Account = (props: any) => {
  const { colors } = props.theme;
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      margin: 5,
    },
  });

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  return (
    <View style={styles.container}>
      {authentication.hasOptedOut ? (
        <View>
          <Text style={styles.text}>
            Opt into an account for backup and sync across platforms.
          </Text>
          <Button
            onPress={() => {
              dispatch(optIn());
            }}
          >
            Opt In
          </Button>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>You are logged in. TODO</Text>
          <Button onPress={logoutUser}>Logout</Button>
        </View>
      )}
    </View>
  );
};

export default withTheme(Account);
