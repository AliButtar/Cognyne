import React from "react";
import * as firebase from "firebase";
import "firebase/firestore";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";

import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Navigation } from "./src/infrastructure/navigation/index";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { theme } from "./src/infrastructure/theme";

const firebaseConfig = {
  apiKey: "AIzaSyCq1WV19NhmL1QOhkRGfSIodrOW8Xe-7bQ",
  authDomain: "cognyne2.firebaseapp.com",
  projectId: "cognyne2",
  storageBucket: "cognyne2.appspot.com",
  messagingSenderId: "427202957241",
  appId: "1:427202957241:web:91e2779d01e616da33f068",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <AuthenticationContextProvider>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </AuthenticationContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
