import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const ActiveTaskCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin: ${(props) => props.theme.space[1]};
`;

// export const RestaurantCardCover = styled(Card.Cover)`
//   padding: ${(props) => props.theme.space[3]};
//   background-color: ${(props) => props.theme.colors.bg.primary};
// `;

export const CardInfo = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
  padding-left: ${(props) => props.theme.space[1]};
  padding-top: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const Section = styled.View`
  padding-left: 35px
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const Container = styled.View`
  flex-direction: row;
`;

export const LeaveButton = styled(Button)`
  position: absolute;
  top: 25px;
  right: 5px;
  padding-right: 6px;
`;

export const VerifyButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  right: 5px;
`;
