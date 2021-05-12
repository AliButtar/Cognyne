import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { DashboardScreen } from "../../features/dashboard/screens/dashboard.screen";

const DashboardStack = createStackNavigator();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator
      headerMode="none"
      screenOptions={
        Platform.OS === "ios"
          ? { ...TransitionPresets.ModalPresentationIOS }
          : { ...TransitionPresets.RevealFromBottomAndroid }
      }
      mode="modal"
    >
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />
    </DashboardStack.Navigator>
  );
};
