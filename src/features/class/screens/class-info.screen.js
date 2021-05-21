import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

const GenerateButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[2]};
  height: 77%;
  width: 40%;
`;

const CreateClassButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

const ClassNameInput = styled(TextInput)`
  width: 90%;
  margin: ${(props) => props.theme.space[3]};
`;

const CodeInput = styled(TextInput)`
  width: 50%;
  margin-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const ClassView = styled.View`
  flex: 1;
  justify-content: center;
`;

const TwoElementsRow = styled.View`
  flex-direction: row;
`;

export const ClassInfoScreen = () => {
  const [className, setClassName] = useState("");
  const [code, setCode] = useState("");

  return (
    <ClassView>
      <ClassNameInput
        label="Enter Class Name"
        value={className}
        onChangeText={(text) => setClassName(text)}
      />

      <TwoElementsRow>
        <CodeInput
          label="Enter Class Code"
          value={code}
          autoCapitalize="none"
          onChangeText={(text) => setCode(text)}
        />

        <GenerateButton mode="contained" onPress={() => console.log(className)}>
          Generate
        </GenerateButton>
      </TwoElementsRow>
      <CreateClassButton
        mode="contained"
        onPress={() => console.log(className)}
      >
        Create Class
      </CreateClassButton>
    </ClassView>
  );
};
