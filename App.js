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
  apiKey: "AIzaSyC95F16t4ulRcR3MSJT5t6yjobisVOGXek",
  authDomain: "cognyne.firebaseapp.com",
  projectId: "cognyne",
  storageBucket: "cognyne.appspot.com",
  messagingSenderId: "271347541080",
  appId: "1:271347541080:web:b9ec215b680a42bf36d62d",
  measurementId: "G-B9FZSK0E7G",
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
