import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MapsScreen } from "../../features/maps/screens/maps.screen";
import { CounsellorScreen } from "../../features/counsellor/screens/counsellor.screen";
import { DashboardNavigator } from "./dashboard.navigator";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Dashboard: "home",
  Maps: "google-maps",
  Counsellor: "help-buoy",
  Settings: "settings",
};

const tabBarIcon =
  (iconName) =>
  ({ focused, size, color }) => {
    if (iconName === "google-maps") {
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    } else {
      return (
        <Ionicons
          name={focused ? iconName : `${iconName}-outline`}
          size={size}
          color={color}
        />
      );
    }
  };

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
  };
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="Counsellor" component={CounsellorScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};
