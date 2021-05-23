import React, { useState } from "react";

import {
  GenerateButton,
  CreateClassButton,
  ClassNameInput,
  CodeInput,
  ClassView,
  TwoElementsRow,
} from "../components/class-info.styles";

export const ClassInfoScreen = ({ navigation }) => {
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
        onPress={() =>
          navigation.navigate("ClassCameraScreen", { className, code })
        }
      >
        Create Class
      </CreateClassButton>
    </ClassView>
  );
};
