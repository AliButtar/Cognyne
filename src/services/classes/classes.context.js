import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase";

import { AuthenticationContext } from "../authentication/authentication.context";

export const ClassContext = createContext();

export const ClassContextProvider = ({ children }) => {
  const { user, data } = useContext(AuthenticationContext);

  const [studentsDetails, setStudentsDetails] = useState([]);

  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [noOfStudents, setNoOfStudents] = useState(0);
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
      totalStudents: 0,
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
    setClassData({});
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
    setStudentData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Class");

    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => {
        if (doc.exists) {
          setStudentData(doc.data());
        } else {
          setStudentData({});
        }
      });
    });
  };

  const joinClass = async (classCode) => {
    const classRef = await firebase
      .firestore()
      .collection("Classes")
      .doc(classCode);

    await classRef.get().then(async (document) => {
      const joinedClass = await document.data();

      await classRef.update({
        totalStudents: joinedClass.totalStudents + 1,
      });
      const studentDataLocal = {
        id: user.uid,
        name: data.fullName,
        regNo: data.regNo,
        stdClassName: joinedClass.className,
        stdClassCode: joinedClass.classCode,
        verified: false,
        stdClassMaker: joinedClass.classMaker,
      };

      setStudentData(studentDataLocal);
      // write logic for if class maker and joiner is same, throw error
      await classRef.collection("Students").doc(user.uid).set(studentDataLocal);

      const classRef2 = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(user.uid)
        .collection("Class")
        .doc(classCode);

      await classRef2.set(studentDataLocal);
    });
  };

  const endClass = async (classCode) => {
    setNoOfStudents(0);
    const teacherClassRef = await firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Class");

    await teacherClassRef.doc(classCode).delete();

    studentsDetails.forEach(async (std) => {
      console.log(std.id);
      const studentClassRef = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(std.id)
        .collection("Class");

      const studentClassRef2 = await firebase
        .firestore()
        .collection("Classes")
        .doc(classCode)
        .collection("Students");

      await studentClassRef2.doc(std.id).delete();
      await studentClassRef.doc(classCode).delete();
    });

    const classRef = await firebase.firestore().collection("Classes");

    await classRef.doc(classCode).delete();

    setClassData({});
    setStudentsDetails([]);
  };

  const leaveClass = (classCode) => {
    const classRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Class");

    classRef.doc(classCode).delete();

    const classRef2 = firebase.firestore().collection("Classes").doc(classCode);

    classRef2.get().then((document) => {
      if (document.exists) {
        const joinedClass = document.data();
        classRef2.update({
          totalStudents: joinedClass.totalStudents - 1,
        });
      }

      classRef2
        .collection("Students")
        .doc(user.uid)
        .delete()
        .then(() => console.log("deleted"));
    });
    setStudentData({});
  };

  const getStudentsInClass = (classCode) => {
    firebase
      .firestore()
      .collection("Classes")
      .doc(classCode)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setNoOfStudents(doc.data().totalStudents.toString());
        } else {
          setNoOfStudents(0);
        }
      });
  };

  const updateVerifiedStatus = async (classCode, uid) => {
    const classRef = await firebase
      .firestore()
      .collection("Classes")
      .doc(classCode)
      .collection("Students")
      .doc(uid);

    await classRef.get().then((doc) => {
      if (doc.exists) {
        classRef.update({
          verified: true,
        });
        setVerifiedStatus(doc.data().verified);
      }
    });
  };

  const updateVerifiedStatusTeacherStudent = (
    classCode,
    uid,
    currentVerify
  ) => {
    const classRef = firebase
      .firestore()
      .collection("Classes")
      .doc(classCode)
      .collection("Students")
      .doc(uid);

    classRef.get().then(() => {
      if (currentVerify) {
        classRef.update({
          verified: false,
        });
      } else {
        classRef.update({
          verified: true,
        });
      }
    });
  };

  const getVerifiedStatus = (classCode, uid) => {
    firebase
      .firestore()
      .collection("Classes")
      .doc(classCode)
      .collection("Students")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setVerifiedStatus(doc.data().verified);
        }
      });
  };

  const getStudentsDetails = async (classCode) => {
    const firestoreDocs = [];
    const classRef = await firebase
      .firestore()
      .collection("Classes")
      .doc(classCode)
      .collection("Students");

    await classRef.get().then(async (coll) => {
      await coll.forEach((doc) => {
        firestoreDocs.push(doc.data());
      });
      setStudentsDetails(firestoreDocs);
    });
    // const operation = (list1, list2, isUnion = false) =>
    //   list1.filter(
    //     (
    //       (set) => (a) =>
    //         isUnion === set.has(a.id)
    //     )(new Set(list2.map((b) => b.id)))
    //   );

    // // Following functions are to be used:
    // const inBoth = (list1, list2) => operation(list1, list2, true);

    // // setStudentsDetails([]);
  };

  return (
    <ClassContext.Provider
      value={{
        onClassCreate,
        joinClass,
        getActiveTasksClassesCreated,
        getActiveTasksClassesJoined,
        getStudentsInClass,
        leaveClass,
        updateVerifiedStatus,
        getVerifiedStatus,
        getStudentsDetails,
        updateVerifiedStatusTeacherStudent,
        endClass,
        verifiedStatus,
        noOfStudents,
        classData,
        studentData,
        studentsDetails,
        error,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};
