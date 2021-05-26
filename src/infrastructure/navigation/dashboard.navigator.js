import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { DashboardScreen } from "../../features/dashboard/screens/dashboard.screen";
import { ClassInfoScreen } from "../../features/class/screens/class-info.screen";
import { ClassCameraScreen } from "../../features/class/screens/camera-class.screen";
import { ClassJoinedCameraScreen } from "../../features/dashboard/screens/camera-class-join.screen";
import { ClassDetailsScreen } from "../../features/class/screens/class-details.screen";

const DashboardStack = createStackNavigator();

export const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={
        Platform.OS === "ios"
          ? { ...TransitionPresets.ModalPresentationIOS }
          : { ...TransitionPresets.RevealFromBottomAndroid }
      }
      mode="modal"
    >
      <DashboardStack.Screen
        options={{
          header: () => null,
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Enter Class Info",
        }}
        name="ClassInfoScreen"
        component={ClassInfoScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Verify Face",
        }}
        name="ClassCameraScreen"
        component={ClassCameraScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Verify Face",
        }}
        name="ClassJoinedCameraScreen"
        component={ClassJoinedCameraScreen}
      />
      <DashboardStack.Screen
        options={{
          header: () => null,
        }}
        name="ClassDetailsScreen"
        component={ClassDetailsScreen}
      />
    </DashboardStack.Navigator>
  );
};
