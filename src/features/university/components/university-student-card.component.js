import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { Info } from "../../dashboard/components/card.component.styles";

const UniversityStudentCardInfo = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const UniversityStudentCard = ({
  data = {},
  updateVerifiedStatusMakerStudent,
}) => {
  const {
    stdId,
    stdName,
    stdRegNo,
    stdUniversityCode,
    stdUniversityMaker,
    stdUniversityName,
    stdUniversityVerified,
  } = data;

  return (
    <View>
      {!!stdId && (
        <TouchableOpacity
          onPress={() => {
            updateVerifiedStatusMakerStudent(
              stdUniversityCode,
              stdId,
              stdUniversityVerified
            );
          }}
        >
          <UniversityStudentCardInfo>
            <Info>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Student Name: {stdName}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Registaion Number: {stdRegNo}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">
                  Fee Submitted: {stdUniversityVerified ? "Yes" : "No"}
                </Text>
              </Spacer>
            </Info>
          </UniversityStudentCardInfo>
        </TouchableOpacity>
      )}
    </View>
  );
};
