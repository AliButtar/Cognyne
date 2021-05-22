import React, { useState, createContext } from "react";
import * as firebase from "firebase";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(u.user.uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              setError("User does not exist anymore.");
              return;
            }
            setData(firestoreDocument.data());
            console.log(firestoreDocument.data());
          })
          .catch((eerr) => {
            setIsLoading(false);
            setError(eerr.toString());
          });
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword, userData) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setData({ id: u.user.uid, ...userData });
        console.log(data);
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(u.user.uid)
          .set({ id: u.user.uid, ...userData })
          .catch((ee) => {
            setIsLoading(false);
            setError(ee.toString());
          });
        setIsLoading(false);
        setUser(u);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setError(null);
        setData(null);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        data,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
