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
    id,
    name,
    regNo,
    stdUniversityCode,
    stdUniversityMaker,
    stdUniversityName,
    verified,
  } = data;

  return (
    <View>
      {!!id && (
        <TouchableOpacity
          onPress={() => {
            updateVerifiedStatusMakerStudent(stdUniversityCode, id, verified);
          }}
        >
          <UniversityStudentCardInfo>
            <Info>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Student Name: {name}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Registaion Number: {regNo}</Text>
              </Spacer>
              <Spacer position="bottom" size="medium">
                <Text variant="label">Verifed: {verified ? "Yes" : "No"}</Text>
              </Spacer>
            </Info>
          </UniversityStudentCardInfo>
        </TouchableOpacity>
      )}
    </View>
  );
};
