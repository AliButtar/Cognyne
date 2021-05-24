import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase";

import { AuthenticationContext } from "../authentication/authentication.context";

export const ClassContext = createContext();

export const ClassContextProvider = ({ children }) => {
  const { user, data } = useContext(AuthenticationContext);

  const [classData, setClassData] = useState({});
  const [studentData, setStudentData] = useState({});
  const [error, setError] = useState(null);

  const onClassCreate = (className, classCode, photoURI) => {
    // Write logic to not let the same user create two classes
    const classRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Class")
      .doc(classCode);

    const classDataLocal = {
      className: className,
      classCode: classCode,
      classMaker: data.fullName,
      classMakerUID: user.uid,
    };

    setClassData(classDataLocal);

    classRef.set(classDataLocal).catch((er) => {
      setError(er.toString());
    });

    const classRef2 = firebase.firestore().collection("Classes").doc(classCode);

    classRef2.set(classDataLocal).catch((er) => {
      setError(er.toString());
      console.log(er);
    });
  };

  const getActiveTasksClassesCreated = () => {
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Class");
    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => setClassData(doc.data()));
    });
  };

  const getActiveTasksClassesJoined = () => {
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Class");

    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => setStudentData(doc.data()));
    });
  };

  const joinClass = (classCode) => {
    const classRef = firebase.firestore().collection("Classes").doc(classCode);

    classRef.get().then((document) => {
      const joinedClass = document.data();

      const studentDataLocal = {
        id: user.uid,
        name: data.fullName,
        regNo: data.regNo,
        stdClassName: joinedClass.className,
        stdClassCode: joinedClass.classCode,
        verified: false,
      };

      setStudentData(studentDataLocal);
      // write logic for if class maker and joiner is same, throw error
      classRef.collection("Students").doc(user.uid).set(studentDataLocal);

      const classRef2 = firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(user.uid)
        .collection("Class")
        .doc(classCode);

      classRef2.set(studentDataLocal);
    });
  };

  return (
    <ClassContext.Provider
      value={{
        onClassCreate,
        joinClass,
        getActiveTasksClassesCreated,
        getActiveTasksClassesJoined,
        classData,
        studentData,
        error,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
