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

import { EventInfoScreen } from "../../features/event/screens/event-info.screen";
import { EventCameraScreen } from "../../features/event/screens/camera-event.screen";
import { EventJoinedCameraScreen } from "../../features/dashboard/screens/camera-event-join.screen";
import { EventDetailsScreen } from "../../features/event/screens/event-details.screen";

import { BusInfoScreen } from "../../features/bus/screens/bus-info.screen";
import { BusCameraScreen } from "../../features/bus/screens/camera-bus.screen";
import { BusJoinedCameraScreen } from "../../features/dashboard/screens/camera-bus-join.screen";
import { BusDetailsScreen } from "../../features/bus/screens/bus-details.screen";

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
          title: "Enter Event Info",
        }}
        name="EventInfoScreen"
        component={EventInfoScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Enter Bus Info",
        }}
        name="BusInfoScreen"
        component={BusInfoScreen}
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
        name="EventCameraScreen"
        component={EventCameraScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Verify Face",
        }}
        name="BusCameraScreen"
        component={BusCameraScreen}
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
          title: "Verify Face",
        }}
        name="EventJoinedCameraScreen"
        component={EventJoinedCameraScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Verify Face",
        }}
        name="BusJoinedCameraScreen"
        component={BusJoinedCameraScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Event Details",
        }}
        name="EventDetailsScreen"
        component={EventDetailsScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Bus Details",
        }}
        name="BusDetailsScreen"
        component={BusDetailsScreen}
      />
      <DashboardStack.Screen
        options={{
          title: "Class Details",
        }}
        name="ClassDetailsScreen"
        component={ClassDetailsScreen}
      />
    </DashboardStack.Navigator>
  );
};
