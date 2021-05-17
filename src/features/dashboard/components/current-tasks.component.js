import React from "react";
import styled from "styled-components/native";

import { Text } from "../../../components/typography/text.component";

//import theme for margin
const CurrentTasksSection = styled.View`
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
  height: 40%;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  box-shadow: 10px 5px 5px black;
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: red;
  shadow-offset: 0px 0px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  elevation: 5;
`;

export const CurrentTasks = () => {
  return (
    <CurrentTasksSection>
      <Text variant="label">Active Tasks Go Here</Text>
    </CurrentTasksSection>
  );
};
