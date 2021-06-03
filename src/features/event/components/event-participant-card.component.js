import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Info } from "../../dashboard/components/card.component.styles";

const ParticipantCardInfo = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ParticipantCard = ({
  data = {},
  updateVerifiedStatusMakerParticipant,
}) => {
  const {
    ptcId,
    ptcName,
    ptcRegNo,
    ptcEventCode,
    ptcEventMaker,
    ptcEventName,
    ptcVerified,
  } = data;

  return (
    <View>
      {!!ptcId && (
        <TouchableOpacity
          onPress={() => {
            updateVerifiedStatusMakerParticipant(
              ptcEventCode,
              ptcId,
              ptcVerified
            );
          }}
        >
          <ParticipantCardInfo>
            <Info>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Participant Name: {ptcName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Event Name: {ptcEventName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  Verified: {ptcVerified ? "Yes" : "No"}
                </Text>
              </Spacer>
            </Info>
          </ParticipantCardInfo>
        </TouchableOpacity>
      )}
    </View>
  );
};
