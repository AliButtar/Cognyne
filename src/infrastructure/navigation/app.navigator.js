import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { MapsScreen } from "../../features/maps/screens/maps.screen";
import { CounsellorScreen } from "../../features/counsellor/screens/counsellor.screen";
import { DashboardNavigator } from "./dashboard.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { ClassContextProvider } from "../../services/classes/classes.context";
import { EventContextProvider } from "../../services/events/events.context";

import { LocationContextProvider } from "../../features/maps/services/location/location.context";
import { BuildingsContextProvider } from "../../features/maps/services/buildings/buildings.context";

import { CounsellorContextProvider } from "../../features/counsellor/services/counsellor.context";

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
    <EventContextProvider>
      <ClassContextProvider>
        <LocationContextProvider>
          <BuildingsContextProvider>
            <CounsellorContextProvider>
              <Tab.Navigator
                screenOptions={createScreenOptions}
                tabBarOptions={{
                  activeTintColor: "blue",
                  inactiveTintColor: "gray",
                  keyboardHidesTabBar: true,
                }}
              >
                <Tab.Screen name="Dashboard" component={DashboardNavigator} />
                <Tab.Screen name="Maps" component={MapsScreen} />
                <Tab.Screen name="Counsellor" component={CounsellorScreen} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
              </Tab.Navigator>
            </CounsellorContextProvider>
          </BuildingsContextProvider>
        </LocationContextProvider>
      </ClassContextProvider>
    </EventContextProvider>
  );
};
