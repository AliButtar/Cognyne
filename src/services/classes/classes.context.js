import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase";

import { AuthenticationContext } from "../authentication/authentication.context";

export const ClassContext = createContext();

export const ClassContextProvider = ({ children }) => {
  const { user, data } = useContext(AuthenticationContext);

  const [error, setError] = useState(null);

  const onClassCreate = (className, classCode, photoURI) => {
    const classRef = firebase
      .firestore()
      .collection("ActiveTasks")
      .doc(user.uid)
      .collection("Class")
      .doc(classCode);

    classRef
      .set({
        className: className,
        classCode: classCode,
        classMaker: data.fullName,
        classMakerUID: user.uid,
      })
      .catch((er) => {
        setError(er.toString());
      });
  };

  return (
    <ClassContext.Provider value={{ onClassCreate, error }}>
      {children}
    </ClassContext.Provider>
  );
};
