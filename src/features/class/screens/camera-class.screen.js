import React, { useRef, useState, useEffect, useContext } from "react";
import { Camera } from "expo-camera";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

//import { firebase } from '../../firebase/config'

import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { IconButton } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ClassContext } from "../../../services/classes/classes.context";

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
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const ClassCameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  const { user } = useContext(AuthenticationContext);
  const { onClassCreate, error } = useContext(ClassContext);

  const [type, setType] = useState(Camera.Constants.Type.back);

  const { className, code } = route.params;

  const snap = async () => {
    if (cameraRef) {
      //   const photo = await cameraRef.current.takePictureAsync();
      //AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);

      //     const data = {
      //                 id: user.uid,
      //                 email: user.email,
      //                 fullName: user.name,
      //             };
      // const usersRef = firebase.firestore().collection("users");
      // usersRef
      //     .doc(user.uid)
      //     .set(data)
      //     .then(() => {
      //     navigation.navigate("DashboardScreen", { user: data });
      //     })
      //     .catch((error) => {
      //     alert(error);
      //     });
      //   }
      navigation.navigate("DashboardScreen");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View>
      <ProfileCamera ref={(camera) => (cameraRef.current = camera)} type={type}>
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
        <VerifyButton
          onPress={() => {
            onClassCreate(className, code);
            // snap();
            navigation.navigate("DashboardScreen");
          }}
        >
          Verify
        </VerifyButton>
      </ProfileCamera>
    </View>
  );
};
