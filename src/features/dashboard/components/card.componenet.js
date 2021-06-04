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
    busDate,
    busTime,
    busMaker,
    busMakerUID,
    totalBusMembers,

    bmId,
    bmName,
    bmRegNo,
    bmBusName,
    bmBusCode,
    bmBusDate,
    bmBusTime,
    bmVerified,
    bmBusMaker,
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
                <Text variant="label">{"Bus Date: " + busDate}</Text>
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
                  busDate,
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
                <Text variant="label">{"Bus Date: " + bmBusDate}</Text>
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
      </ActiveTaskCard>
    </>
  );
};
