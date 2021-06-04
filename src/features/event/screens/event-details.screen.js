import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { ParticipantCard } from "../components/event-participant-card.component";
import { ExportDataButton } from "../components/export-event-data-button.component";

import { EventContext } from "../../../services/events/events.context";
import { Info } from "../../dashboard/components/card.component.styles";

const ParticipantsList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
    flexGrow: 1,
  },
})``;

const View = styled.View`
  flex: 1;
`;

const ButtonView = styled.View`
  flex-direction: row;
`;

const EndEventButton = styled(Button)`
  width: 50%;
  margin-left: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

const VerifyEventButton = styled(Button)`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30%;
`;

const ListView = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  align-items: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

const Title = styled(Text)`
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const EventDetailsCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin: ${(props) => props.theme.space[1]};
`;

export const EventDetailsScreen = ({ navigation, route }) => {
  const { eventCode, eventDate, eventTime, eventName, eventMaker } =
    route.params;

  const {
    getParticipantsDetails,
    participantsDetails,
    noOfParticipants,
    participantVerifiedStatus,
    getVerifiedStatus,
    updateVerifiedStatusMakerParticipant,
    endEvent,
  } = useContext(EventContext);
  // verified status in route and navigation on previsous file. To fix verification, Take it to event context and put uid parameter on updatingverificaiton and getverifiedstats so it can verify regardless
  useEffect(() => {
    getParticipantsDetails(eventCode);
  }, [noOfParticipants, participantsDetails]);

  return (
    <>
      <View>
        <EventDetailsCard elevation={5}>
          <Info>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Event Name: {eventName}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Event Code: {eventCode}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Organizer: {eventMaker}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">{"Event Date: " + eventDate}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">{"Event Time: " + eventTime}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">
                Total Participants: {noOfParticipants}
              </Text>
            </Spacer>
          </Info>
          <VerifyEventButton
            mode="contained"
            onPress={() => {
              navigation.navigate("EventCameraScreen", { participantsDetails });
            }}
          >
            Verify
          </VerifyEventButton>
        </EventDetailsCard>
        <ListView>
          <Title variant="label">Event Atendees</Title>
        </ListView>
        <ParticipantsList
          data={participantsDetails}
          renderItem={({ item }) => {
            return (
              <Spacer position="bottom" size="large">
                <ParticipantCard
                  data={item}
                  updateVerifiedStatusMakerParticipant={
                    updateVerifiedStatusMakerParticipant
                  }
                />
              </Spacer>
            );
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
      </View>
      <ButtonView>
        <EndEventButton
          icon="account-arrow-left-outline"
          mode="contained"
          onPress={() => {
            endEvent(eventCode);
            navigation.navigate("DashboardScreen");
          }}
        >
          End Event
        </EndEventButton>
        <ExportDataButton participantsDetails={participantsDetails} />
      </ButtonView>
    </>
  );
};
