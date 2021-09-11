import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthGateway from "../AuthenticationPortal/gateway/authGateway";
import ThemedApp from "../Themes/ThemedApp";

const NavigationGateway = () => {
  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  return (
    <View style={{ flex: 1 }}>
      {authentication.hasOptedOut === true ? <ThemedApp /> : <AuthGateway />}
    </View>
  );
};

export default NavigationGateway;
