import React, { useContext, useEffect } from "react";
import { View, FlatList } from "react-native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import {
  CardInfo,
  ActiveTaskCard,
  Info,
  Section,
  Container,
  Icon,
} from "./card.component.styles";

export const ActiveTasksInfoCard = ({ data = {} }) => {
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
    verified,
  } = data;

  console.log(data);

  return (
    <>
      <ActiveTaskCard>
        {className && (
          <>
            <Text variant="label">{"Created Class:"}</Text>
            <Section>
              <Container>
                <Text variant="body">{"Class Name:     "}</Text>
                <Text variant="caption">{className}</Text>
              </Container>
              <Container>
                <Text variant="body">{"Class Code:     "}</Text>
                <Text variant="caption">{classCode}</Text>
              </Container>
              <Container>
                <Text variant="body">{"Class Maker:     "}</Text>
                <Text variant="caption">{classMaker}</Text>
              </Container>
            </Section>
          </>
        )}
        {stdClassName && (
          <>
            <Text variant="label">{"Joined Class:"}</Text>
            <Section>
              <Text variant="body">{"Class Name: " + stdClassName}</Text>
              <Text variant="body">{"Class Code: " + stdClassCode}</Text>
              <Text variant="body">{"Your Registration number: " + regNo}</Text>
            </Section>
          </>
        )}
      </ActiveTaskCard>
    </>
  );
};
