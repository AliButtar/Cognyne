import React, { useContext, useEffect, useMemo } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { ActiveTasksInfoCard } from "../components/card.componenet";
import { Spacer } from "../../../components/spacer/spacer.component";

import { ClassContext } from "../../../services/classes/classes.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

//import theme for margin
const CurrentTasksSection = styled.View`
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
  height: 40%;
  border-radius: 15px;

  box-shadow: 10px 5px 5px black;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: red;
  shadow-offset: 0px 0px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  elevation: 5;
`;

const ActiveTasksList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  flex: 1;
`;

export const CurrentTasks = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const {
    classData,
    studentData,
    getActiveTasksClassesCreated,
    getActiveTasksClassesJoined,
    getStudentsInClass,
    leaveClass,
    getVerifiedStatus,
  } = useContext(ClassContext);

  useEffect(() => {
    getActiveTasksClassesCreated();
    getActiveTasksClassesJoined();
  }, []);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  // const { stdClassName } = studentData;
  // const { className } = classData;
  const totalData = [classData, studentData];
  // console.log(totalData);
  return (
    <CurrentTasksSection>
      {isEmpty(classData) && isEmpty(studentData) ? (
        <Text variant="label">You Currently Don't Have Any Tasks</Text>
      ) : (
        <ActiveTasksList
          data={totalData}
          renderItem={({ item }) => {
            if (!isEmpty(item)) {
              return (
                <Spacer position="bottom" size="large">
                  <ActiveTasksInfoCard
                    data={item}
                    getStudentsInClass={getStudentsInClass}
                    leaveClass={leaveClass}
                    navigation={navigation}
                    getVerifiedStatus={getVerifiedStatus}
                  />
                </Spacer>
              );
            } else {
              return;
            }
          }}
          keyExtractor={(item) => item.className}
        />
      )}
    </CurrentTasksSection>
  );
};
