import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase";

import { AuthenticationContext } from "../authentication/authentication.context";

export const BusContext = createContext();

export const BusContextProvider = ({ children }) => {
  const { user, data } = useContext(AuthenticationContext);

  const [busMembersDetails, setBusMembersDetails] = useState([]);

  const [busMemberVerifiedStatus, setBusMemberVerifiedStatus] = useState(false);
  const [noOfBusMembers, setNoOfBusMembers] = useState(0);
  const [busData, setBusData] = useState({});
  const [busMemberData, setBusMemberData] = useState({});
  const [error, setError] = useState(null);

  const onBusCreate = (busName, busCode, busDate, busTime, photoURI) => {
    // Write logic to not let the same user create two buss
    const busRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Bus")
      .doc(busCode);

    const busDataLocal = {
      busName: busName,
      busCode: busCode,
      busDate: busDate,
      busTime: busTime,
      busMaker: data.fullName,
      busMakerUID: user.uid,
      totalBusMembers: 0,
    };

    setBusData(busDataLocal);

    busRef.set(busDataLocal).catch((er) => {
      setError(er.toString());
    });

    const busRef2 = firebase.firestore().collection("Busses").doc(busCode);

    busRef2.set(busDataLocal).catch((er) => {
      setError(er.toString());
      console.log(er);
    });
  };

  const getActiveTasksBussesCreated = () => {
    setBusData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Bus");
    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => setBusData(doc.data()));
    });
  };

  const getActiveTasksBussesJoined = () => {
    setBusMemberData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Bus");

    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => {
        if (doc.exists) {
          setBusMemberData(doc.data());
        } else {
          setBusMemberData({});
        }
      });
    });
  };

  const joinBus = async (busCode) => {
    const busRef = await firebase.firestore().collection("Busses").doc(busCode);

    await busRef.get().then(async (document) => {
      const joinedBus = await document.data();

      await busRef.update({
        totalBusMembers: joinedBus.totalBusMembers + 1,
      });
      const busMemberDataLocal = {
        bmId: user.uid,
        bmName: data.fullName,
        bmRegNo: data.regNo,
        bmBusName: joinedBus.busName,
        bmBusCode: joinedBus.busCode,
        bmBusDate: joinedBus.busDate,
        bmBusTime: joinedBus.busTime,
        bmVerified: false,
        bmBusMaker: joinedBus.busMaker,
      };

      setBusMemberData(busMemberDataLocal);
      // write logic for if bus maker and joiner is same, throw error
      await busRef
        .collection("BusMembers")
        .doc(user.uid)
        .set(busMemberDataLocal);

      const busRef2 = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(user.uid)
        .collection("Bus")
        .doc(busCode);

      await busRef2.set(busMemberDataLocal);
    });
  };

  const endBus = async (busCode) => {
    setNoOfBusMembers(0);
    const makerBusRef = await firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Bus");

    await makerBusRef.doc(busCode).delete();

    busMembersDetails.forEach(async (bm) => {
      console.log(bm.bmId);
      const busMemberBusRef = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(bm.bmId)
        .collection("Bus");

      const busMemberBusRef2 = await firebase
        .firestore()
        .collection("Busses")
        .doc(busCode)
        .collection("BusMembers");

      await busMemberBusRef2.doc(bm.bmId).delete();
      await busMemberBusRef.doc(busCode).delete();
    });

    const busRef = await firebase.firestore().collection("Busses");

    await busRef.doc(busCode).delete();

    setBusData({});
    setBusMembersDetails([]);
  };

  const leaveBus = (busCode) => {
    const busRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Bus");

    busRef.doc(busCode).delete();

    const busRef2 = firebase.firestore().collection("Busses").doc(busCode);

    busRef2.get().then((document) => {
      if (document.exists) {
        const joinedBus = document.data();
        busRef2.update({
          totalBusMembers: joinedBus.totalBusMembers - 1,
        });
      }

      busRef2
        .collection("BusMembers")
        .doc(user.uid)
        .delete()
        .then(() => console.log("deleted"));
    });
    setBusMemberData({});
  };

  const getBusMembersInBus = (busCode) => {
    firebase
      .firestore()
      .collection("Busses")
      .doc(busCode)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setNoOfBusMembers(doc.data().totalBusMembers.toString());
        } else {
          setNoOfBusMembers(0);
        }
      });
  };

  const updateBusMemberVerifiedStatus = async (busCode, uid) => {
    const busRef = await firebase
      .firestore()
      .collection("Busses")
      .doc(busCode)
      .collection("BusMembers")
      .doc(uid);

    await busRef.get().then((doc) => {
      if (doc.exists) {
        busRef.update({
          bmVerified: true,
        });
        setBusMemberVerifiedStatus(doc.data().bmVerified);
      }
    });
  };

  const updateVerifiedStatusMakerBusMember = (busCode, uid, currentVerify) => {
    const busRef = firebase
      .firestore()
      .collection("Busses")
      .doc(busCode)
      .collection("BusMembers")
      .doc(uid);

    busRef.get().then(() => {
      if (currentVerify) {
        busRef.update({
          bmVerified: false,
        });
      } else {
        busRef.update({
          bmVerified: true,
        });
      }
    });
  };

  const getBusMemberVerifiedStatus = (busCode, uid) => {
    firebase
      .firestore()
      .collection("Busses")
      .doc(busCode)
      .collection("BusMembers")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setBusMemberVerifiedStatus(doc.data().bmVerified);
        }
      });
  };

  const getBusMembersDetails = async (busCode) => {
    const firestoreDocs = [];
    const busRef = await firebase
      .firestore()
      .collection("Busses")
      .doc(busCode)
      .collection("BusMembers");

    await busRef.get().then(async (coll) => {
      await coll.forEach((doc) => {
        firestoreDocs.push(doc.data());
      });
      setBusMembersDetails(firestoreDocs);
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

    // // setBusMembersDetails([]);
  };

  return (
    <BusContext.Provider
      value={{
        onBusCreate,
        joinBus,
        getActiveTasksBussesCreated,
        getActiveTasksBussesJoined,
        getBusMembersInBus,
        leaveBus,
        updateBusMemberVerifiedStatus,
        getBusMemberVerifiedStatus,
        getBusMembersDetails,
        updateVerifiedStatusMakerBusMember,
        endBus,
        busMemberVerifiedStatus,
        noOfBusMembers,
        busData,
        busMemberData,
        busMembersDetails,
        error,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};
