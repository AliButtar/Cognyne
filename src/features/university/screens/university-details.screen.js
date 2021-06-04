import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { UniversityStudentCard } from "../components/university-student-card.component";
import { ExportDataButton } from "../components/export-data-button.component";

import { UniversityContext } from "../../../services/universities/universities.context";
import { Info } from "../../dashboard/components/card.component.styles";

const UniversityStudentsList = styled(FlatList).attrs({
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

const VerifyUniversityButton = styled(Button)`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30%;
`;

const EndUniversityButton = styled(Button)`
  width: 50%;
  margin-left: ${(props) => props.theme.space[1]};
  margin-bottom: ${(props) => props.theme.space[1]};
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

const UniversityDetailsCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin: ${(props) => props.theme.space[1]};
`;

export const UniversityDetailsScreen = ({ navigation, route }) => {
  const { universityCode, universityName, universityMaker } = route.params;

  const {
    getUniversityStudentsDetails,
    universityStudentsDetails,
    noOfUniversityStudents,
    universityStdVerifiedStatus,
    getUniversityStdVerifiedStatus,
    updateVerifiedStatusMakerStudent,
    endUniversity,
  } = useContext(UniversityContext);
  // verified status in route and navigation on previsous file. To fix verification, Take it to class context and put uid parameter on updatingverificaiton and getverifiedstats so it can verify regardless
  useEffect(() => {
    getUniversityStudentsDetails(universityCode);
  }, [noOfUniversityStudents, universityStudentsDetails]);

  return (
    <>
      <View>
        <UniversityDetailsCard elevation={5}>
          <Info>
            <Spacer position="bottom" size="medium">
              <Text variant="label">University Name: {universityName}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">University Code: {universityCode}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Coordinator: {universityMaker}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">
                Total Students: {noOfUniversityStudents}
              </Text>
            </Spacer>
          </Info>

          <VerifyUniversityButton
            mode="contained"
            onPress={() => {
              navigation.navigate("UniversityCameraScreen", { universityStudentsDetails });
            }}
          >
            Verify
          </VerifyEventButton>
        </UniversityDetailsCard>
        <ListView>
          <Title variant="label">Students in University</Title>
        </ListView>
        <UniversityStudentsList
          data={universityStudentsDetails}
          renderItem={({ item }) => {
            return (
              <Spacer position="bottom" size="large">
                <UniversityStudentCard
                  data={item}
                  updateVerifiedStatusMakerStudent={
                    updateVerifiedStatusMakerStudent
                  }
                />
              </Spacer>
            );
          }}
        />
      </View>
      <ButtonView>
        <EndUniversityButton
          icon="account-arrow-left-outline"
          mode="contained"
          onPress={() => {
            endUniversity(universityCode);
            navigation.navigate("DashboardScreen");
          }}
        >
          End University
        </EndUniversityButton>
        <ExportDataButton studentsDetails={universityStudentsDetails} />
      </ButtonView>
    </>
  );
};
