import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase";

import { AuthenticationContext } from "../authentication/authentication.context";

export const UniversityContext = createContext();

export const UniversityContextProvider = ({ children }) => {
  const { user, data } = useContext(AuthenticationContext);

  const [universityStudentsDetails, setUniversityStudentsDetails] = useState(
    []
  );

  const [universityStdVerifiedStatus, setUniversityStdVerifiedStatus] =
    useState(false);
  const [noOfUniversityStudents, setNoOfUniversityStudents] = useState(0);
  const [universityData, setUniversityData] = useState({});
  const [universityStudentData, setUniversityStudentData] = useState({});
  const [universityError, setUniversityError] = useState(null);

  const onUniversityCreate = (uniName, uniCode) => {
    // Write logic to not let the same user create two classes
    const uniRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("University")
      .doc(uniCode);

    const uniDataLocal = {
      universityName: uniName,
      universityCode: uniCode,
      universityMaker: data.fullName,
      universityMakerUID: user.uid,
      totalUniversityStudents: 0,
    };

    setUniversityStudentData(uniDataLocal);

    uniRef.set(uniDataLocal).catch((er) => {
      setUniversityError(er.toString());
    });

    const uniRef2 = firebase
      .firestore()
      .collection("Universities")
      .doc(uniCode);

    uniRef2.set(uniDataLocal).catch((er) => {
      setUniversityError(er.toString());
      console.log(er);
    });
  };

  const getActiveTasksUniversitiesCreated = () => {
    setUniversityData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("University");
    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => setUniversityData(doc.data()));
    });
  };

  const getActiveTasksUniversitiesJoined = () => {
    setUniversityStudentData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("University");

    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => {
        if (doc.exists) {
          setUniversityStudentData(doc.data());
        } else {
          setUniversityStudentData({});
        }
      });
    });
  };

  const joinUniversity = async (universityCode) => {
    const uniRef = await firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode);

    await uniRef.get().then(async (document) => {
      const joinedUniversity = await document.data();

      await uniRef.update({
        totalUniversityStudents: joinedUniversity.totalUniversityStudents + 1,
      });
      const universityStudentDataLocal = {
        stdId: user.uid,
        stdName: data.fullName,
        stdRegNo: data.regNo,
        stdUniversityName: joinedUniversity.universityName,
        stdUniversityCode: joinedUniversity.universityCode,
        stdUniversityVerified: false,
        stdUniversityMaker: joinedUniversity.universityMaker,
      };

      setUniversityStudentData(universityStudentDataLocal);
      // write logic for if class maker and joiner is same, throw error

      await uniRef
        .collection("University-Students")
        .doc(user.uid)
        .set(universityStudentDataLocal);

      const uniRef2 = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(user.uid)
        .collection("University")
        .doc(universityCode);

      await uniRef2.set(universityStudentDataLocal);
    });
  };

  const endUniversity = async (universityCode) => {
    setNoOfUniversityStudents(0);
    const makerUniversityRef = await firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("University");

    await makerUniversityRef.doc(universityCode).delete();

    universityStudentsDetails.forEach(async (std) => {
      const studentUniRef = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(std.id)
        .collection("University");

      const studentUniRef2 = await firebase
        .firestore()
        .collection("Universities")
        .doc(universityCode)
        .collection("University-Students");

      await studentUniRef2.doc(std.id).delete();
      await studentUniRef.doc(universityCode).delete();
    });

    const uniRef = await firebase.firestore().collection("Universities");

    await uniRef.doc(universityCode).delete();

    setUniversityData({});
    setUniversityStudentsDetails([]);
  };

  const leaveUniversity = (universityCode) => {
    const uniRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("University");

    uniRef.doc(universityCode).delete();

    const uniRef2 = firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode);

    uniRef2.get().then((document) => {
      if (document.exists) {
        const joinedUniversity = document.data();
        uniRef2.update({
          totalUniversityStudents: joinedUniversity.totalUniversityStudents - 1,
        });
      }

      uniRef2
        .collection("University-Students")
        .doc(user.uid)
        .delete()
        .then(() => console.log("deleted"));
    });
    setUniversityStudentData({});
  };

  const getStudentsInUniversity = (universityCode) => {
    firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setNoOfUniversityStudents(
            doc.data().totalUniversityStudents.toString()
          );
        } else {
          setNoOfUniversityStudents(0);
        }
      });
  };

  const updateUniversityVerifiedStatus = async (universityCode, uid) => {
    const uniRef = await firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode)
      .collection("University-Students")
      .doc(uid);

    await uniRef.get().then((doc) => {
      if (doc.exists) {
        uniRef.update({
          verified: true,
        });
        setUniversityStdVerifiedStatus(doc.data().verified);
      }
    });
  };

  const updateVerifiedStatusMakerStudent = (
    universityCode,
    uid,
    currentVerify
  ) => {
    const uniRef = firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode)
      .collection("University-Students")
      .doc(uid);

    uniRef.get().then(() => {
      if (currentVerify) {
        uniRef.update({
          verified: false,
        });
      } else {
        uniRef.update({
          verified: true,
        });
      }
    });
  };

  const getUniversityStdVerifiedStatus = (universityCode, uid) => {
    firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode)
      .collection("University-Students")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setUniversityStdVerifiedStatus(doc.data().verified);
        }
      });
  };

  const getUniversityStudentsDetails = async (universityCode) => {
    const firestoreDocs = [];
    const uniRef = await firebase
      .firestore()
      .collection("Universities")
      .doc(universityCode)
      .collection("University-Students");

    await uniRef.get().then(async (coll) => {
      await coll.forEach((doc) => {
        firestoreDocs.push(doc.data());
      });
      setUniversityStudentsDetails(firestoreDocs);
    });
  };

  return (
    <UniversityContext.Provider
      value={{
        onUniversityCreate,
        joinUniversity,
        getActiveTasksUniversitiesCreated,
        getActiveTasksUniversitiesJoined,
        getStudentsInUniversity,
        leaveUniversity,
        updateUniversityVerifiedStatus,
        getUniversityStdVerifiedStatus,
        getUniversityStudentsDetails,
        updateVerifiedStatusMakerStudent,
        endUniversity,
        universityData,
        universityStudentData,
        universityStudentsDetails,
        noOfUniversityStudents,
        universityStdVerifiedStatus,
        universityError,
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};
