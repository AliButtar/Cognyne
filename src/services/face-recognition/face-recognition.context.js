import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import cosSimilarity from "cos-similarity";

import { fetch } from "@tensorflow/tfjs-react-native";

import * as firebase from "firebase";

export const FaceVerificationContext = createContext();

export const FaceVerificationContextProvider = ({ children }) => {
  const getFaceEncoding = async (faces, photo) => {
    try {
      let finalResult;
      if (photo && faces.faces.length) {
        await fetch("http://192.168.10.14:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photo),
        }).then((response) => {
          // console.log(JSON.parse(response._bodyInit));
          finalResult = JSON.parse(response._bodyInit).array;
        });
        // console.log(finalResult);
        return finalResult;
      }
    } catch (err) {
      console.log("cant load image", err.message);
    }
  };

  const compareFaceEncodingWithUser = async (usr, encoding) => {
    const userRef = await firebase.firestore().collection("users");

    var flag = false;
    console.log(usr.uid);
    await userRef
      .doc(usr.uid)
      .get()
      .then(async (doc) => {
        const cloudEncoding = await doc.data().faceEncoding;

        console.log(cosSimilarity(cloudEncoding, encoding));
        if (cosSimilarity(cloudEncoding, encoding) < 0.7) {
          flag = false;
        } else {
          flag = true;
        }
      });
    console.log(flag);
    return flag;
  };

  const compareFaceEncodingWithAll = async (encoding) => {
    const userRefColl = await firebase.firestore().collection("users");
    var flag = { flag: false };
    var BreakException = {};

    try {
      await userRefColl
        .get()
        .then(async (coll) => {
          await coll.forEach(async (doc) => {
            const cloudEncoding = await doc.data().faceEncoding;

            console.log(cosSimilarity(cloudEncoding, encoding));
            if (cosSimilarity(cloudEncoding, encoding) > 0.9) {
              flag = { flag: true, userData: doc.data() };
              throw BreakException;
            }
          });
        })
        .catch((err) => console.log(err));
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
    }
    return flag;
  };

  const compareFaceEncodingWithJoinedPeople = async (
    faceEncoding,
    participantsDetails
  ) => {
    const flag = await compareFaceEncodingWithAll(faceEncoding);
    var flag2 = false;
    var BreakException = {};

    try {
      if (flag.flag) {
        await participantsDetails.forEach((ptc) => {
          if (ptc.bmId === flag.userData.id) {
            flag2 = true;
            throw BreakException;
          }
          if (ptc.ptcId === flag.userData.id) {
            flag2 = true;
            throw BreakException;
          }
          if (ptc.stdId === flag.userData.id) {
            flag2 = true;
            throw BreakException;
          }
        });
      }
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
    }
    return flag2;
  };

  return (
    <FaceVerificationContext.Provider
      value={{
        getFaceEncoding,
        compareFaceEncodingWithUser,
        compareFaceEncodingWithAll,
        compareFaceEncodingWithJoinedPeople,
      }}
    >
      {children}
    </FaceVerificationContext.Provider>
  );
};
