import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator";

import { FaceVerificationContextProvider } from "../../services/face-recognition/face-recognition.context";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <FaceVerificationContextProvider>
        {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
      </FaceVerificationContextProvider>
    </NavigationContainer>
  );
};
