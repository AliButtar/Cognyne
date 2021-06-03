import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import cosSimilarity from "cos-similarity";

import * as tf from "@tensorflow/tfjs";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";

import * as firebase from "firebase";

export const FaceVerificationContext = createContext();

export const FaceVerificationContextProvider = ({ children }) => {
  const [recognizer, setRecognizer] = useState("");
  const [isTfReady, setIsTfReady] = useState(false);

  useEffect(() => {
    async function loadModel() {
      console.log("in model");
      await tf.ready();

      const modelJson =
        "http://192.168.10.14:8080/exported-modelstfjs/model.json";

      await tf.loadGraphModel(modelJson).then((model) => {
        console.log("tf ready");
        setIsTfReady(true);
        setRecognizer(model);

        console.log("model Loaded");
      });
    }
    if (recognizer === "") {
      loadModel();
    }
  }, [recognizer]);

  const getFaceEncoding = async (faces, photo) => {
    try {
      if (photo && faces.faces.length) {
        const fileUri = photo.uri;
        const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
        const raw = new Uint8Array(imgBuffer);
        const imageTensor = decodeJpeg(raw);

        //   const response = await fetch(
        //     `data:image/jpg;base64,${photo.base64}`,
        //     {},
        //     { isBinary: true }
        //   );
        //   const rawImageData = await response.arrayBuffer();
        //   const imageTensor = await imageToTensor(rawImageData);
        //   console.log(rawImageData);

        const y1 = parseInt(faces.faces[0].bounds.origin.y, 10);
        const x1 = parseInt(faces.faces[0].bounds.origin.x, 10);
        //   const y2 = parseInt(
        //     faces.faces[0].bounds.origin.y + faces.faces[0].bounds.size.height,
        //     10
        //   );
        //   const x2 = parseInt(
        //     faces.faces[0].bounds.origin.x + faces.faces[0].bounds.size.width,
        //     10
        //   );
        const h = parseInt(faces.faces[0].bounds.size.height, 10);
        const w = parseInt(faces.faces[0].bounds.size.width, 10);
        // console.log("original", imageTensor.shape);
        const faceTensor = await imageTensor.slice([y1, x1, 0], [w, h, 3]);
        // console.log("cropped", faceTensor.shape);
        const faceTensor1 = await faceTensor
          .resizeBilinear([224, 224])
          .reshape([1, 224, 224, 3]);
        // console.log("cropped + resize", faceTensor1.shape);

        //   const faceTensor1 = await imageTensor
        //     .resizeBilinear([224, 224])
        //     .reshape([1, 224, 224, 3]);

        //   const croppedFace = tf.image.cropAndResize(
        //     faceTensor1,
        //     [[y1, x1, y2, x2]],
        //     [0],
        //     [224, 224]
        //   );

        //   const result = await recognizer.predict(croppedFace).data();
        console.log("read");
        // faceTensor1.print();
        const result = await recognizer.predict(faceTensor1).data();
        console.log("pred complete");
        const finalResult = Array.from(result);

        console.log(finalResult.length);
        return finalResult;
      }
    } catch (err) {
      console.log("cant load image", err.message);
    }
  };

  const compareFaceEncodingWithUser = async (usr, encoding) => {
    const userRef = await firebase.firestore().collection("users");
    // function distanceSquared(a, b) {
    //   var sum = 0;
    //   var n;
    //   for (n = 0; n < a.length; n++) {
    //     sum += Math.pow(a[n] - b[n], 2);
    //   }
    //   return sum;
    // }

    // function distance(a, b) {
    //   return Math.sqrt(distanceSquared(a, b));
    // }
    var flag = false;
    console.log(usr.uid);
    await userRef
      .doc(usr.uid)
      .get()
      .then(async (doc) => {
        const cloudEncoding = await doc.data().faceEncoding;

        console.log(cosSimilarity(cloudEncoding, encoding));
        if (cosSimilarity(cloudEncoding, encoding) < 0.9) {
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

  return (
    <FaceVerificationContext.Provider
      value={{
        recognizer,
        isTfReady,
        getFaceEncoding,
        compareFaceEncodingWithUser,
        compareFaceEncodingWithAll,
      }}
    >
      {children}
    </FaceVerificationContext.Provider>
  );
};
