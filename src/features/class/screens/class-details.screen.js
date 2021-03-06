import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { StudentCard } from "../components/student-card.component";
import { ExportDataButton } from "../components/export-data-button.component";

import { ClassContext } from "../../../services/classes/classes.context";
import { Info } from "../../dashboard/components/card.component.styles";

const StudentsList = styled(FlatList).attrs({
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

const EndClassButton = styled(Button)`
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

const ClassDetailsCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin: ${(props) => props.theme.space[1]};
`;

export const ClassDetailsScreen = ({ navigation, route }) => {
  const { classCode, className, classMaker } = route.params;

  const {
    getStudentsDetails,
    studentsDetails,
    noOfStudents,
    verifiedStatus,
    getVerifiedStatus,
    updateVerifiedStatusTeacherStudent,
    endClass,
  } = useContext(ClassContext);
  // verified status in route and navigation on previsous file. To fix verification, Take it to class context and put uid parameter on updatingverificaiton and getverifiedstats so it can verify regardless
  useEffect(() => {
    getStudentsDetails(classCode);
  }, [noOfStudents, studentsDetails]);

  return (
    <>
      <View>
        <ClassDetailsCard elevation={5}>
          <Info>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Class Name: {className}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Class Code: {classCode}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Teacher: {classMaker}</Text>
            </Spacer>
            <Spacer position="bottom" size="medium">
              <Text variant="label">Total Students: {noOfStudents}</Text>
            </Spacer>
          </Info>
        </ClassDetailsCard>
        <ListView>
          <Title variant="label">Students in Class</Title>
        </ListView>
        <StudentsList
          data={studentsDetails}
          renderItem={({ item }) => {
            return (
              <Spacer position="bottom" size="large">
                <StudentCard
                  data={item}
                  updateVerifiedStatusTeacherStudent={
                    updateVerifiedStatusTeacherStudent
                  }
                />
              </Spacer>
            );
          }}
        />
      </View>
      <ButtonView>
        <EndClassButton
          icon="account-arrow-left-outline"
          mode="contained"
          onPress={() => {
            endClass(classCode);
            navigation.navigate("DashboardScreen");
          }}
        >
          End Class
        </EndClassButton>
        <ExportDataButton studentsDetails={studentsDetails} />
      </ButtonView>
    </>
  );
};
