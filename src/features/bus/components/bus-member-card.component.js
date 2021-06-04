import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Info } from "../../dashboard/components/card.component.styles";

const BusMemberCardInfo = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const BusMemberCard = ({
  data = {},
  updateVerifiedStatusMakerBusMember,
}) => {
  const {
    bmId,
    bmName,
    bmBusCode,
    bmStartPoint,
    bmEndPoint,
    bmBusName,
    bmVerified,
  } = data;

  return (
    <View>
      {!!bmId && (
        <TouchableOpacity
          onPress={() => {
            updateVerifiedStatusMakerBusMember(bmBusCode, bmId, bmVerified);
          }}
        >
          <BusMemberCardInfo>
            <Info>
              <Spacer position="bottom" size="medium">
                <Text variant="label">BusMember Name: {bmName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Bus Name: {bmBusName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  Verified: {bmVerified ? "Yes" : "No"}
                </Text>
              </Spacer>
            </Info>
          </BusMemberCardInfo>
        </TouchableOpacity>
      )}
    </View>
  );
};
