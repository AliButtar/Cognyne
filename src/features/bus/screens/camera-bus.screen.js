import React, { useRef, useState, useEffect, useContext } from "react";
import * as FaceDetector from "expo-face-detector";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, IconButton } from "react-native-paper";
import Svg, { Rect } from "react-native-svg";
import { View, Alert } from "react-native";

import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructure/theme/colors";

import { FaceVerification } from "../../../components/verification/face-verification.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { BusContext } from "../../../services/busses/busses.context";
import { FaceVerificationContext } from "../../../services/face-recognition/face-recognition.context";

const CameraView = styled.View`
  flex: 1;
`;

const ProfileCamera = styled(Camera)`
  height: 100%;
  width: 100%;
`;

const FlipButton = styled(IconButton).attrs({
  color: "white",
  size: 30,
})``;

const VerifyButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const BusCameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef();

  const { user } = useContext(AuthenticationContext);
  const { onBusCreate, error } = useContext(BusContext);

  const { busName, code, eTime, startPoint, endPoint, busMembersDetails } =
    route.params;

  const [faces, setFaces] = useState({ faces: [] });

  const {
    compareFaceEncodingWithUser,
    getFaceEncoding,
    compareFaceEncodingWithJoinedPeople,
  } = useContext(FaceVerificationContext);

  const snap = async () => {
    if (cameraRef) {
      const picture = await cameraRef.current.takePictureAsync({
        base64: true,
      });
      setPhoto(picture);
      const faceEncoding = await getFaceEncoding(faces, picture);

      if (!busMembersDetails) {
        const flag = await compareFaceEncodingWithUser(user, faceEncoding);

        if (flag) {
          onBusCreate(busName, code, eTime, startPoint, endPoint);
          navigation.navigate("DashboardScreen");
        } else {
          navigation.goBack();
        }
      } else {
        const flag2 = await compareFaceEncodingWithJoinedPeople(
          faceEncoding,
          busMembersDetails
        );
        if (flag2) {
          Alert.alert("Face Recognition", "Verified");
        } else {
          Alert.alert("Face Recognition", "Not Verified");
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // useEffect(() => {
  //   if (faces.faces.length) {
  //     snap();
  //   }
  // }, [faces]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <View>
        <ProfileCamera
          ref={(camera) => (cameraRef.current = camera)}
          type={type}
          ratio={"16:9"}
          onFacesDetected={(face) => setFaces(face)}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        >
          <CameraView>
            <FlipButton
              icon="camera-retake"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <FaceVerification faces={faces} photo={photo} />
          </CameraView>
          <VerifyButton
            onPress={() => {
              snap();

              // navigation.navigate("DashboardScreen");
            }}
          >
            Verify
          </VerifyButton>
        </ProfileCamera>
      </View>
    </>
  );
};
