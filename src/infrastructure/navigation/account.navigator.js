import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { RegisterCameraScreen } from "../../features/account/screens/register-camera.screen";
import { LoginCameraScreen } from "../../features/account/screens/login-camera.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        header: () => null,
      }}
      name="Main"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{
        header: () => null,
      }}
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      options={{
        header: () => null,
      }}
      name="Register"
      component={RegisterScreen}
    />
    <Stack.Screen
      options={{
        title: "Register Face",
      }}
      name="RegisterCameraScreen"
      component={RegisterCameraScreen}
    />
    <Stack.Screen
      options={{
        title: "Verify Face",
      }}
      name="LoginCameraScreen"
      component={LoginCameraScreen}
    />
  </Stack.Navigator>
);
