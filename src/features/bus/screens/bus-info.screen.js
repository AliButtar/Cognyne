import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  GenerateButton,
  CreateBusButton,
  BusNameInput,
  CodeInput,
  BusView,
  TwoElementsRow,
  TimeDateInput,
  Icon,
} from "../components/bus-info.styles";

export const BusInfoScreen = ({ navigation }) => {
  const today = new Date();
  const [busName, setBusName] = useState("");
  const [busDate, setBusDate] = useState(today);
  const [busTime, setBusTime] = useState(today);

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [code, setCode] = useState("");

  const onChangeDate = (bus, selectedDate) => {
    const currentDate = selectedDate || busDate;
    setShowDate(Platform.OS === "ios");
    setBusDate(currentDate);
  };
  const onChangeTime = (bus, selectedTime) => {
    const currentTime = selectedTime || busTime;
    setShowTime(Platform.OS === "ios");
    setBusTime(currentTime);
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
    <BusView>
      <BusNameInput
        label="Enter Bus Name"
        value={busName}
        onChangeText={(text) => setBusName(text)}
      />
      <TwoElementsRow>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={busDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <TimeDateInput
          label="Enter Bus Date"
          value={busDate.toDateString()}
          onChangeText={(text) => setBusDate(text)}
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
            value={busTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )}
        <TimeDateInput
          label="Enter Bus Time"
          value={busTime.toTimeString().slice(0, -18)}
          onChangeText={(text) => setBusTime(text)}
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
          label="Enter Bus Code"
          value={code}
          autoCapitalize="none"
          onChangeText={(text) => setCode(text)}
        />

        <GenerateButton mode="contained" onPress={() => setCode(makeid(5))}>
          Generate
        </GenerateButton>
      </TwoElementsRow>
      <CreateBusButton
        mode="contained"
        onPress={() => {
          const eDate = busDate.toDateString();
          const eTime = busTime.toTimeString().slice(0, -18);
          navigation.navigate("BusCameraScreen", {
            busName,
            code,
            eDate,
            eTime,
          });
        }}
      >
        Create Bus
      </CreateBusButton>
    </BusView>
  );
};
