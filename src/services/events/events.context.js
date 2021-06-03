import React, { useState, createContext, useContext } from "react";
import * as firebase from "firebase";

import { AuthenticationContext } from "../authentication/authentication.context";

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  const { user, data } = useContext(AuthenticationContext);

  const [participantsDetails, setParticipantsDetails] = useState([]);

  const [participantVerifiedStatus, setParticipantVerifiedStatus] =
    useState(false);
  const [noOfParticipants, setNoOfParticipants] = useState(0);
  const [eventData, setEventData] = useState({});
  const [participantData, setParticipantData] = useState({});
  const [error, setError] = useState(null);

  const onEventCreate = (eventName, eventCode, photoURI) => {
    // Write logic to not let the same user create two events
    const eventRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Event")
      .doc(eventCode);

    const eventDataLocal = {
      eventName: eventName,
      eventCode: eventCode,
      eventMaker: data.fullName,
      eventMakerUID: user.uid,
      totalParticipants: 0,
    };

    setEventData(eventDataLocal);

    eventRef.set(eventDataLocal).catch((er) => {
      setError(er.toString());
    });

    const eventRef2 = firebase.firestore().collection("Events").doc(eventCode);

    eventRef2.set(eventDataLocal).catch((er) => {
      setError(er.toString());
      console.log(er);
    });
  };

  const getActiveTasksEventsCreated = () => {
    setEventData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Event");
    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => setEventData(doc.data()));
    });
  };

  const getActiveTasksEventsJoined = () => {
    setParticipantData({});
    const activeTasksRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Event");

    activeTasksRef.get().then((coll) => {
      coll.forEach((doc) => {
        if (doc.exists) {
          setParticipantData(doc.data());
        } else {
          setParticipantData({});
        }
      });
    });
  };

  const joinEvent = async (eventCode) => {
    const eventRef = await firebase
      .firestore()
      .collection("Events")
      .doc(eventCode);

    await eventRef.get().then(async (document) => {
      const joinedEvent = await document.data();

      await eventRef.update({
        totalParticipants: joinedEvent.totalParticipants + 1,
      });
      const participantDataLocal = {
        ptcId: user.uid,
        ptcName: data.fullName,
        ptcRegNo: data.regNo,
        ptcEventName: joinedEvent.eventName,
        ptcEventCode: joinedEvent.eventCode,
        ptcVerified: false,
        ptcEventMaker: joinedEvent.eventMaker,
      };

      setParticipantData(participantDataLocal);
      // write logic for if event maker and joiner is same, throw error
      await eventRef
        .collection("Participants")
        .doc(user.uid)
        .set(participantDataLocal);

      const eventRef2 = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(user.uid)
        .collection("Event")
        .doc(eventCode);

      await eventRef2.set(participantDataLocal);
    });
  };

  const endEvent = async (eventCode) => {
    setNoOfParticipants(0);
    const makerEventRef = await firebase
      .firestore()
      .collection("ActiveTasks-Created")
      .doc(user.uid)
      .collection("Event");

    await makerEventRef.doc(eventCode).delete();

    participantsDetails.forEach(async (ptc) => {
      console.log(ptc.id);
      const participantEventRef = await firebase
        .firestore()
        .collection("ActiveTasks-Joined")
        .doc(ptc.id)
        .collection("Event");

      const participantEventRef2 = await firebase
        .firestore()
        .collection("Events")
        .doc(eventCode)
        .collection("Participants");

      await participantEventRef2.doc(ptc.id).delete();
      await participantEventRef.doc(eventCode).delete();
    });

    const eventRef = await firebase.firestore().collection("Events");

    await eventRef.doc(eventCode).delete();

    setEventData({});
    setParticipantsDetails([]);
  };

  const leaveEvent = (eventCode) => {
    const eventRef = firebase
      .firestore()
      .collection("ActiveTasks-Joined")
      .doc(user.uid)
      .collection("Event");

    eventRef.doc(eventCode).delete();

    const eventRef2 = firebase.firestore().collection("Events").doc(eventCode);

    eventRef2.get().then((document) => {
      if (document.exists) {
        const joinedEvent = document.data();
        eventRef2.update({
          totalParticipants: joinedEvent.totalParticipants - 1,
        });
      }

      eventRef2
        .collection("Participants")
        .doc(user.uid)
        .delete()
        .then(() => console.log("deleted"));
    });
    setParticipantData({});
  };

  const getParticipantsInEvent = (eventCode) => {
    firebase
      .firestore()
      .collection("Events")
      .doc(eventCode)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setNoOfParticipants(doc.data().totalParticipants.toString());
        } else {
          setNoOfParticipants(0);
        }
      });
  };

  const updateParticipantVerifiedStatus = async (eventCode, uid) => {
    const eventRef = await firebase
      .firestore()
      .collection("Events")
      .doc(eventCode)
      .collection("Participants")
      .doc(uid);

    await eventRef.get().then((doc) => {
      if (doc.exists) {
        eventRef.update({
          ptcVerified: true,
        });
        setParticipantVerifiedStatus(doc.data().ptcVerified);
      }
    });
  };

  const updateVerifiedStatusMakerParticipant = (
    eventCode,
    uid,
    currentVerify
  ) => {
    const eventRef = firebase
      .firestore()
      .collection("Events")
      .doc(eventCode)
      .collection("Participants")
      .doc(uid);

    eventRef.get().then(() => {
      if (currentVerify) {
        eventRef.update({
          ptcVerified: false,
        });
      } else {
        eventRef.update({
          ptcVerified: true,
        });
      }
    });
  };

  const getParticipantVerifiedStatus = (eventCode, uid) => {
    firebase
      .firestore()
      .collection("Events")
      .doc(eventCode)
      .collection("Participants")
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setParticipantVerifiedStatus(doc.data().ptcVerified);
        }
      });
  };

  const getParticipantsDetails = async (eventCode) => {
    const firestoreDocs = [];
    const eventRef = await firebase
      .firestore()
      .collection("Events")
      .doc(eventCode)
      .collection("Participants");

    await eventRef.get().then(async (coll) => {
      await coll.forEach((doc) => {
        firestoreDocs.push(doc.data());
      });
      setParticipantsDetails(firestoreDocs);
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

    // // setParticipantsDetails([]);
  };

  return (
    <EventContext.Provider
      value={{
        onEventCreate,
        joinEvent,
        getActiveTasksEventsCreated,
        getActiveTasksEventsJoined,
        getParticipantsInEvent,
        leaveEvent,
        updateParticipantVerifiedStatus,
        getParticipantVerifiedStatus,
        getParticipantsDetails,
        updateVerifiedStatusMakerParticipant,
        endEvent,
        participantVerifiedStatus,
        noOfParticipants,
        eventData,
        participantData,
        participantsDetails,
        error,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
