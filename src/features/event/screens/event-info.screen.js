import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  GenerateButton,
  CreateEventButton,
  EventNameInput,
  CodeInput,
  EventView,
  TwoElementsRow,
  TimeDateInput,
  Icon,
} from "../components/event-info.styles";

export const EventInfoScreen = ({ navigation }) => {
  const today = new Date();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(today);
  const [eventTime, setEventTime] = useState(today);

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [code, setCode] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDate(Platform.OS === "ios");
    setEventDate(currentDate);
  };
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTime(Platform.OS === "ios");
    setEventTime(currentTime);
  };

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
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={eventDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TimeDateInput
          label="Enter Event Date"
          value={eventDate.toDateString()}
          onChangeText={(text) => setEventDate(text)}
        />
        <Icon
          icon="calendar-multiselect"
          mode="contained"
          onPress={() => {
            setShowDate(true);
          }}
        />
      </TwoElementsRow>
      <TwoElementsRow>
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={eventTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <TimeDateInput
          label="Enter Event Time"
          value={eventTime.toTimeString().slice(0, -18)}
          onChangeText={(text) => setEventTime(text)}
        />
        <Icon
          icon="clock-outline"
          mode="contained"
          onPress={() => {
            setShowTime(true);
          }}
        />
      </TwoElementsRow>

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
        onPress={() => {
          const eDate = eventDate.toDateString();
          const eTime = eventTime.toTimeString().slice(0, -18);
          navigation.navigate("EventCameraScreen", {
            eventName,
            code,
            eDate,
            eTime,
          });
        }}
      >
        Create Event
      </CreateEventButton>
    </EventView>
  );
};
