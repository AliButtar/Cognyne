import React, { useContext, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
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
    eventMaker,
    eventMakerUID,
    totalParticipants,

    ptcId,
    ptcName,
    ptcRegNo,
    ptcEventName,
    ptcEventCode,
    ptcVerified,
    ptcEventMaker,
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
      </ActiveTaskCard>
    </>
  );
};
