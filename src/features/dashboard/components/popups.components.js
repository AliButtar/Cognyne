import React, { useState, useContext } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import { TextInput, Button } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";

import { ClassContext } from "../../../services/classes/classes.context";
import { EventContext } from "../../../services/events/events.context";
import { BusContext } from "../../../services/busses/busses.context";
import { UniversityContext } from "../../../services/universities/universities.context";

const Popup = styled(Modal).attrs({
  backdropOpacity: Platform.OS === "android" ? 0.5 : 0.7,
})`
  align-items: center;
  justify-content: center;
`;

const ModalView = styled.View`
  flex: 1;
`;

const CodeInput = styled(TextInput)`
  width: 300px;
`;

const SubmitButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const Popups = ({ modalVisible, setModalVisible, type }) => {
  const [code, setCode] = useState("");

  const { joinClass } = useContext(ClassContext);
  const { joinEvent } = useContext(EventContext);
  const { joinBus } = useContext(BusContext);
  const { joinUniversity } = useContext(UniversityContext);

  return (
    <ModalView>
      <Popup
        isVisible={modalVisible}
        onBackButtonPress={() => setModalVisible(!modalVisible)}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        useNativeDriverForBackdrop={Platform.OS === "android" ? true : false}
      >
        <CodeInput
          label={`Enter ${type} Code (Case Sensitive)`}
          value={code}
          autoCapitalize="none"
          onChangeText={(text) => setCode(text)}
        />
        <Spacer size="large">
          <SubmitButton
            mode="contained"
            onPress={() => {
              if (type === "Class") {
                joinClass(code);
              } else if (type === "Event") {
                joinEvent(code);
              } else if (type === "Bus") {
                joinBus(code);
              } else if (type === "University") {
                joinUniversity(code);
              }
              setModalVisible(!modalVisible);
              setCode("");
            }}
          >
            Submit
          </SubmitButton>
        </Spacer>
      </Popup>
    </ModalView>
  );
};
