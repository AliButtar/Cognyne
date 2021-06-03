import React, { useState } from "react";

import {
  GenerateButton,
  CreateEventButton,
  EventNameInput,
  CodeInput,
  EventView,
  TwoElementsRow,
} from "../components/event-info.styles";

export const EventInfoScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState("");
  const [code, setCode] = useState("");

  function makeid(length) {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  return (
    <EventView>
      <EventNameInput
        label="Enter Event Name"
        value={eventName}
        onChangeText={(text) => setEventName(text)}
      />

      <TwoElementsRow>
        <CodeInput
          label="Enter Event Code"
          value={code}
          autoCapitalize="none"
          onChangeText={(text) => setCode(text)}
        />

        <GenerateButton mode="contained" onPress={() => setCode(makeid(5))}>
          Generate
        </GenerateButton>
      </TwoElementsRow>
      <CreateEventButton
        mode="contained"
        onPress={() =>
          navigation.navigate("EventCameraScreen", { eventName, code })
        }
      >
        Create Event
      </CreateEventButton>
    </EventView>
  );
};
