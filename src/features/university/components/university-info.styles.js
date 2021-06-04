import styled from "styled-components/native";
import { TextInput, Button, IconButton } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

export const Icon = styled(IconButton).attrs({
  size: 35,
})``;

export const GenerateButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[2]};
  height: 77%;
  width: 40%;
`;

export const CreateUniversityButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

export const UniversityNameInput = styled(TextInput)`
  width: 90%;
  margin: ${(props) => props.theme.space[3]};
`;

export const CodeInput = styled(TextInput)`
  width: 50%;
  margin-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const TimeDateInput = styled(TextInput)`
  width: 80%;
  margin-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const UniversityView = styled.View`
  flex: 1;
  justify-content: center;
`;

export const TwoElementsRow = styled.View`
  flex-direction: row;
`;
