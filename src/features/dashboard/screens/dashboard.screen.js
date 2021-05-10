import React from "react";
import styled from "styled-components/native";

const DashBoardText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
`;

export const DashboardScreen = () => {
  return <DashBoardText>Hellow There</DashBoardText>;
};
