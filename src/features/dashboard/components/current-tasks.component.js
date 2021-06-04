import React, { useContext, useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { ActiveTasksInfoCard } from "../components/card.componenet";
import { Spacer } from "../../../components/spacer/spacer.component";

import { ClassContext } from "../../../services/classes/classes.context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { EventContext } from "../../../services/events/events.context";
import { BusContext } from "../../../services/busses/busses.context";
import { UniversityContext } from "../../../services/universities/universities.context";

//import theme for margin
const CurrentTasksSection = styled.View`
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
  height: 50%;
  border-radius: 15px;

  box-shadow: 10px 5px 5px black;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: red;
  shadow-offset: 0px 0px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  elevation: 5;
`;

const EmptyTasksText = styled(Text)`
  position: absolute;
  top: 47%;
  left: 14%;
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
    noOfStudents,
    verifiedStatus,
    endClass,
  } = useContext(ClassContext);

  const {
    eventData,
    participantData,
    getActiveTasksEventsCreated,
    getActiveTasksEventsJoined,
    getParticipantsInEvent,
    leaveEvent,
    getParticipantVerifiedStatus,
    noOfParticipants,
    participantVerifiedStatus,
    endEvent,
  } = useContext(EventContext);

  const {
    busData,
    busMemberData,
    getActiveTasksBussesCreated,
    getActiveTasksBussesJoined,
    getBusMembersInBus,
    leaveBus,
    getBusMemberVerifiedStatus,
    noOfBusMembers,
    busMemberVerifiedStatus,
    endBus,
  } = useContext(BusContext);

  const {
    universityData,
    universityStudentData,
    getActiveTasksUniversitiesCreated,
    getActiveTasksUniversitiesJoined,
    getStudentsInUniversity,
    leaveUniversity,
    getUniversityStdVerifiedStatus,
    noOfUniversityStudents,
    universityStdVerifiedStatus,
    endUniversity,
  } = useContext(UniversityContext);

  const [refresh, setRefresh] = useState(false);

  // console.log("--");
  // console.log(verifiedStatus);
  // After Loing Active Tasks are not Get
  useEffect(() => {
    getActiveTasksClassesCreated();
    getActiveTasksEventsCreated();
    getActiveTasksBussesCreated();
    getActiveTasksUniversitiesCreated();

    getActiveTasksClassesJoined();
    getActiveTasksEventsJoined();
    getActiveTasksBussesJoined();
    getActiveTasksUniversitiesJoined();

    setRefresh(false);
  }, [refresh]);

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
  const totalData = [
    classData,
    studentData,
    eventData,
    participantData,
    busData,
    busMemberData,
    universityData,
    universityStudentData,
  ];
  // console.log(totalData);
  return (
    <CurrentTasksSection>
      {isEmpty(classData) &&
      isEmpty(studentData) &&
      isEmpty(eventData) &&
      isEmpty(participantData) &&
      isEmpty(busData) &&
      isEmpty(busMemberData) &&
      isEmpty(universityData) &&
      isEmpty(universityStudentData) ? (
        <EmptyTasksText variant="label">
          You Currently Don't Have Any Tasks
        </EmptyTasksText>
      ) : (
        <ActiveTasksList
          data={totalData}
          onRefresh={() => {
            setRefresh(true);
          }}
          refreshing={refresh}
          renderItem={({ item }) => {
            if (!isEmpty(item)) {
              return (
                <Spacer position="bottom" size="large">
                  <ActiveTasksInfoCard
                    data={item}
                    navigation={navigation}
                    getStudentsInClass={getStudentsInClass}
                    leaveClass={leaveClass}
                    getVerifiedStatus={getVerifiedStatus}
                    noOfStudents={noOfStudents}
                    verifiedStatus={verifiedStatus}
                    endClass={endClass}
                    getParticipantsInEvent={getParticipantsInEvent}
                    leaveEvent={leaveEvent}
                    getParticipantVerifiedStatus={getParticipantVerifiedStatus}
                    noOfParticipants={noOfParticipants}
                    participantVerifiedStatus={participantVerifiedStatus}
                    endEvent={endEvent}
                    getBusMembersInBus={getBusMembersInBus}
                    leaveBus={leaveBus}
                    getBusMemberVerifiedStatus={getBusMemberVerifiedStatus}
                    noOfBusMembers={noOfBusMembers}
                    busMemberVerifiedStatus={busMemberVerifiedStatus}
                    endBus={endBus}
                    getStudentsInUniversity={getStudentsInUniversity}
                    leaveUniversity={leaveUniversity}
                    getUniversityStdVerifiedStatus={
                      getUniversityStdVerifiedStatus
                    }
                    noOfUniversityStudents={noOfUniversityStudents}
                    universityStdVerifiedStatus={universityStdVerifiedStatus}
                    endUniversity={endUniversity}
                  />
                </Spacer>
              );
            } else {
              return;
            }
          }}
          keyExtractor={(item, index) => {
            return "item" + index;
            // if (!isEmpty(classData)) {
            //   return item.classCode;
            // } else if (!isEmpty(studentData)) {
            //   return item.id;
            // }
          }}
        />
      )}
    </CurrentTasksSection>
  );
};
