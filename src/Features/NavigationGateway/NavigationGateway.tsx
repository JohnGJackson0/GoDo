import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthGateway from "../AuthenticationPortal/gateway/authGateway";
import MainApp from "../Themes/MainApp";
import { Provider as PaperProvider } from "react-native-paper";

const NavigationGateway = () => {
  const theme = useSelector((state: RootState) => state.app.theme);

  const authentication = useSelector(
    (state: RootState) => state.authentication
  );

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1 }}>
        {authentication.hasOptedOut === true ? <MainApp /> : <AuthGateway />}
      </View>
    </PaperProvider>
  );
};

export default NavigationGateway;
