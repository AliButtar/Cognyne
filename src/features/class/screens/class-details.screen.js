import React, { useContext, useState, useEffect } from "react";

import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { IconButton } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ClassContext } from "../../../services/classes/classes.context";

export const ClassDetailsScreen = ({ navigation, route }) => {
  const { classCode, verifiedStatus } = route.params;

  const { getStudentsDetails, studentsDetails, noOfStudents } =
    useContext(ClassContext);
  // verified status in route and navigation on previsous file. To fix verification, Take it to class context and put uid parameter on updatingverificaiton and getverifiedstats so it can verify regardless
  useEffect(() => {
    getStudentsDetails(classCode);
  }, [noOfStudents]);

  return (
    <SafeArea>
      <Text>{noOfStudents}</Text>
      {!!studentsDetails[0] && (
        <>
          <Text>{studentsDetails[0].name}</Text>
          <Text>{studentsDetails[0].regNo}</Text>
          <Text>{studentsDetails[0].stdClassCode}</Text>
          <Text>{verifiedStatus ? "Yes" : "No"}</Text>
        </>
      )}
      {!!studentsDetails[1] && (
        <>
          <Text>{studentsDetails[1].name}</Text>
          <Text>{studentsDetails[1].regNo}</Text>
          <Text>{studentsDetails[1].stdClassCode}</Text>
        </>
      )}
    </SafeArea>
  );
};
