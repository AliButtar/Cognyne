import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button } from "react-native-paper";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import {
  CardInfo,
  ActiveTaskCard,
  Info,
  Section,
  Container,
  Icon,
  LeaveButton,
  VerifyButton,
  DetailsButton,
} from "./card.component.styles";

export const ActiveTasksInfoCard = ({
  data = {},
  navigation,

  getStudentsInClass,
  leaveClass,
  getVerifiedStatus,
  noOfStudents,
  verifiedStatus,

  getParticipantsInEvent,
  leaveEvent,
  getParticipantVerifiedStatus,
  noOfParticipants,
  participantVerifiedStatus,

  getBusMembersInBus,
  leaveBus,
  getBusMemberVerifiedStatus,
  noOfBusMembers,
  busMemberVerifiedStatus,

  getStudentsInUniversity,
  leaveUniversity,
  getUniversityStdVerifiedStatus,
  noOfUniversityStudents,
  universityStdVerifiedStatus,
}) => {
  const {
    className,
    classCode,
    classMaker,
    classMakerUID,

    id,
    name,
    regNo,
    stdClassName,
    stdClassCode,
    stdClassMaker,
    verified,

    eventName,
    eventCode,
    eventDate,
    eventTime,
    eventMaker,
    eventMakerUID,
    totalParticipants,

    ptcId,
    ptcName,
    ptcRegNo,
    ptcEventName,
    ptcEventDate,
    ptcEventTime,
    ptcEventCode,
    ptcVerified,
    ptcEventMaker,

    busName,
    busCode,
    startPoint,
    endPoint,
    busTime,
    busMaker,
    busMakerUID,
    totalBusMembers,

    bmId,
    bmName,
    bmRegNo,
    bmBusName,
    bmStartPoint,
    bmEndPoint,
    bmBusCode,
    bmBusDate,
    bmBusTime,
    bmVerified,
    bmBusMaker,

    universityName,
    universityCode,
    universityMaker,
    universityMakerUID,
    totalUniversityStudents,

    stdId,
    stdName,
    stdRegNo,
    stdUniversityName,
    stdUniversityCode,
    stdUniversityVerified,
    stdUniversityMaker,
  } = data;

  // console.log(data);

  useEffect(() => {
    if (className) {
      getStudentsInClass(classCode);
    }
  }, [noOfStudents]);

  useEffect(() => {
    if (stdClassName) {
      getVerifiedStatus(stdClassCode, id);
    }
  }, [verifiedStatus]);

  useEffect(() => {
    if (eventName) {
      getParticipantsInEvent(eventCode);
    }
  }, [noOfParticipants]);

  useEffect(() => {
    if (ptcEventName) {
      getParticipantVerifiedStatus(ptcEventCode, ptcId);
    }
  }, [participantVerifiedStatus]);

  useEffect(() => {
    if (busName) {
      getBusMembersInBus(busCode);
    }
  }, [noOfBusMembers]);

  useEffect(() => {
    if (bmBusName) {
      getBusMemberVerifiedStatus(bmBusCode, bmId);
    }
  }, [busMemberVerifiedStatus]);

  useEffect(() => {
    if (universityName) {
      getStudentsInUniversity(universityCode);
    }
  }, [noOfUniversityStudents]);

  useEffect(() => {
    if (stdUniversityName) {
      getUniversityStdVerifiedStatus(stdUniversityCode, stdId);
    }
  }, [universityStdVerifiedStatus]);

  return (
    <>
      <ActiveTaskCard>
        {className && (
          <>
            <Info>
              <Text variant="body">{"Created Class:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Class Name: " + className}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Class Code: " + classCode}</Text>
              </Spacer>
              <Text variant="label">
                {"Number of Students: " + noOfStudents}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <Button
              icon="account-details"
              mode="contained"
              onPress={() => {
                navigation.navigate("ClassDetailsScreen", {
                  classCode,
                  className,
                  classMaker,
                });
              }}
            >
              Details
            </Button>
          </>
        )}
        {stdClassName && (
          <>
            <Info>
              <Text variant="body">{"Joined Class:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Class Name: " + stdClassName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Class Code: " + stdClassCode}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Class Maker: " + stdClassMaker}</Text>
              </Spacer>
              <Text variant="label">
                Verified: {verifiedStatus ? "Yes" : "No"}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <LeaveButton
              icon="account-arrow-left-outline"
              mode="contained"
              onPress={() => {
                leaveClass(stdClassCode);
              }}
            >
              Leave
            </LeaveButton>

            <Button
              icon="face-recognition"
              mode="contained"
              onPress={() =>
                navigation.navigate("ClassJoinedCameraScreen", {
                  stdClassCode,
                  id,
                })
              }
            >
              Verify
            </Button>
          </>
        )}

        {eventName && (
          <>
            <Info>
              <Text variant="body">{"Created Event:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Name: " + eventName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Code: " + eventCode}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Date: " + eventDate}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Time: " + eventTime}</Text>
              </Spacer>
              <Text variant="label">
                {"Number of Particpicants: " + noOfParticipants}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <Button
              icon="account-details"
              mode="contained"
              onPress={() => {
                navigation.navigate("EventDetailsScreen", {
                  eventCode,
                  eventName,
                  eventMaker,
                  eventDate,
                  eventTime,
                });
              }}
            >
              Details
            </Button>
          </>
        )}

        {ptcEventName && (
          <>
            <Info>
              <Text variant="body">{"Joined Event:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Name: " + ptcEventName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Code: " + ptcEventCode}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Maker: " + ptcEventMaker}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Date: " + ptcEventDate}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Event Time: " + ptcEventTime}</Text>
              </Spacer>
              <Text variant="label">
                Verified: {participantVerifiedStatus ? "Yes" : "No"}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <LeaveButton
              icon="account-arrow-left-outline"
              mode="contained"
              onPress={() => {
                leaveEvent(ptcEventCode);
              }}
            >
              Leave
            </LeaveButton>

            <Button
              icon="face-recognition"
              mode="contained"
              onPress={() =>
                navigation.navigate("EventJoinedCameraScreen", {
                  ptcEventCode,
                  ptcId,
                })
              }
            >
              Verify
            </Button>
          </>
        )}

        {busName && (
          <>
            <Info>
              <Text variant="body">{"Created Bus:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Name: " + busName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Code: " + busCode}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Bus Start Point: {startPoint}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Bus End Point: {endPoint}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Time: " + busTime}</Text>
              </Spacer>
              <Text variant="label">
                {"Number of Particpicants: " + noOfBusMembers}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <Button
              icon="account-details"
              mode="contained"
              onPress={() => {
                navigation.navigate("BusDetailsScreen", {
                  busCode,
                  busName,
                  busMaker,
                  startPoint,
                  endPoint,
                  busTime,
                });
              }}
            >
              Details
            </Button>
          </>
        )}

        {bmBusName && (
          <>
            <Info>
              <Text variant="body">{"Joined Bus:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Name: " + bmBusName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Code: " + bmBusCode}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Maker: " + bmBusMaker}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Bus Start Point: {bmStartPoint}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Bus End Point: {bmEndPoint}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">{"Bus Time: " + bmBusTime}</Text>
              </Spacer>
              <Text variant="label">
                Verified: {busMemberVerifiedStatus ? "Yes" : "No"}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <LeaveButton
              icon="account-arrow-left-outline"
              mode="contained"
              onPress={() => {
                leaveBus(bmBusCode);
              }}
            >
              Leave
            </LeaveButton>

            <Button
              icon="face-recognition"
              mode="contained"
              onPress={() =>
                navigation.navigate("BusJoinedCameraScreen", {
                  bmBusCode,
                  bmId,
                })
              }
            >
              Verify
            </Button>
          </>
        )}

        {universityName && (
          <>
            <Info>
              <Text variant="body">{"Created University:"}</Text>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  {"University Name: " + universityName}
                </Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  {"University Code: " + universityCode}
                </Text>
              </Spacer>
              <Text variant="label">
                {"Number of Students: " + noOfUniversityStudents}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <Button
              icon="account-details"
              mode="contained"
              onPress={() => {
                navigation.navigate("UniversityDetailsScreen", {
                  universityCode,
                  universityName,
                  universityMaker,
                });
              }}
            >
              Details
            </Button>
          </>
        )}

        {stdUniversityName && (
          <>
            <Info>
              <Spacer position="bottom" size="medium">
                <Text variant="body">{"Joined University:"}</Text>
              </Spacer>
            </Info>
            <Section>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  {"University Name: " + stdUniversityName}
                </Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  {"University Code: " + stdUniversityCode}
                </Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  {"University Maker: " + stdUniversityMaker}
                </Text>
              </Spacer>
              <Text variant="label">
                Fee Submitted: {universityStdVerifiedStatus ? "Yes" : "No"}
              </Text>
              <Spacer position="bottom" size="medium" />
            </Section>

            <LeaveButton
              icon="account-arrow-left-outline"
              mode="contained"
              onPress={() => {
                leaveUniversity(stdUniversityCode);
              }}
            >
              Leave
            </LeaveButton>
          </>
        )}
      </ActiveTaskCard>
    </>
  );
};
