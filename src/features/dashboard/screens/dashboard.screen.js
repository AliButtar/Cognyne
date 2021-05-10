import React from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/utility/safe-area.component";

const DashBoardText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
`;

export const DashboardScreen = () => {
  return (
    <SafeArea>
      <DashBoardText>Hellow There</DashBoardText>
    </SafeArea>
  );
};
