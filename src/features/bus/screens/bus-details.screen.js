import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { BusMemberCard } from "../components/bus-member-card.component";
import { ExportDataButton } from "../components/export-bus-data-button.component";

import { BusContext } from "../../../services/busses/busses.context";
import { Info } from "../../dashboard/components/card.component.styles";

const BusMembersList = styled(FlatList).attrs({
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

const EndBusButton = styled(Button)`
  width: 50%;
  margin-left: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

const VerifyBusButton = styled(Button)`
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

const BusDetailsCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin: ${(props) => props.theme.space[1]};
`;

export const BusDetailsScreen = ({ navigation, route }) => {
  const { busCode, busDate, busTime, busName, busMaker } = route.params;

  const {
    getBusMembersDetails,
    busMembersDetails,
    noOfBusMembers,
    busMemberVerifiedStatus,
    getVerifiedStatus,
    updateVerifiedStatusMakerBusMember,
    endBus,
  } = useContext(BusContext);
  // verified status in route and navigation on previsous file. To fix verification, Take it to bus context and put uid parameter on updatingverificaiton and getverifiedstats so it can verify regardless
  useEffect(() => {
    getBusMembersDetails(busCode);
  }, [noOfBusMembers, busMembersDetails]);

  return (
    <>
      <View>
        <BusDetailsCard elevation={5}>
          <Info>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Bus Name: {busName}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Bus Code: {busCode}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Organizer: {busMaker}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">{"Bus Date: " + busDate}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">{"Bus Time: " + busTime}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Total BusMembers: {noOfBusMembers}</Text>
            </Spacer>
          </Info>
          <VerifyBusButton
            mode="contained"
            onPress={() => {
              navigation.navigate("BusCameraScreen", { busMembersDetails });
            }}
          >
            Verify
          </VerifyBusButton>
        </BusDetailsCard>
        <ListView>
          <Title variant="label">Bus Atendees</Title>
        </ListView>
        <BusMembersList
          data={busMembersDetails}
          renderItem={({ item }) => {
            return (
              <Spacer position="bottom" size="large">
                <BusMemberCard
                  data={item}
                  updateVerifiedStatusMakerBusMember={
                    updateVerifiedStatusMakerBusMember
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
        <EndBusButton
          icon="account-arrow-left-outline"
          mode="contained"
          onPress={() => {
            endBus(busCode);
            navigation.navigate("DashboardScreen");
          }}
        >
          End Bus
        </EndBusButton>
        <ExportDataButton busMembersDetails={busMembersDetails} />
      </ButtonView>
    </>
  );
};
